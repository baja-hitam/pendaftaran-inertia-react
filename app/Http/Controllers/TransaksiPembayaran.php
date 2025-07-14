<?php

namespace App\Http\Controllers;

use App\Http\Modulus\Mperiode;
use App\Http\Modulus\Pendaftaran;
use Illuminate\Http\Request;
use App\Http\Modulus\Tpembayaran;

class TransaksiPembayaran extends Controller
{
    public function index()
    {
        $modul = new Tpembayaran;
        $modul1 = new Mperiode;
        $modul2 = new Pendaftaran;
        $data = $modul->getAllUser();
        $data1 = $modul->getAllPembayaran();
        $data2 = $modul->getAllTransaksi();
        $data3 = $modul1->getAllPeriode();
        $data4 = $modul2->getAllFormulir();
        // dd($data1);
        return inertia('admin/transaksi_pembayaran/TransaksiPembayaran',[
            'datasUserOption' => $data,
            'datasFormulirOption' => $data4,
            'datasJenPembayaranOption' =>$data1,
            'datasPeriodeOption' => $data3,
            'datas'=>$data2
        ]);
    }
    public function search(Request $request)
    {
        $modul = new Tpembayaran;
        // dd($request->all());
        $modul1 = new Mperiode;
        $modul2 = new Pendaftaran;
        $modul->periode = $request->periode ?? ''; 
        $modul->search = $request->user ?? '';
        $modul->id_pembayaran = $request->jenPembayaran ?? '';
        $data3 = $modul1->getAllPeriode();
        $data4 = $modul2->getAllFormulir();
        $data = $modul->search();
        return inertia('admin/transaksi_pembayaran/TransaksiPembayaran',[
            'datas' => $data,
            'search' => $request->user,
            'jenPembayaran' => $request->jenPembayaran,
            'tahun' => $request->periode,
            'datasPeriodeOption' => $data3,
            'datasUserOption' => $modul->getAllUser(),
            'datasFormulirOption' => $data4,
            'datasJenPembayaranOption' => $modul->getAllPembayaran(),
        ]);
    }
    public function store(Request $request)
    {
        // dd($request->all()); 
        $startYear = date( 'Y');
        $endYear = $startYear + 1;
        $modul = new Tpembayaran;
        $modul->id_pembayaran = $request->selectedPembayaran['value'];
        $modul->periode = $startYear.$endYear;
        $total_pembayaran = $modul->getTotalPembayaran();
        $modul->id_user = $request->selectedUser['value'] ?? null;
        $modul->no_form = $request->selectedFormulir['value'] ?? null;
        $data = $modul->checkCicilan();
        // dd($data);
        if(!empty($data)){
            session()->flash('error', 'Anda sudah membuat cicilan yang harus dibayar');
            return to_route('admin.transaksi-pembayaran');
        }
        $cicilan = $request->cicilan ?? 1;
        $jumlah_hrsbayar = (int)$total_pembayaran / (int)$cicilan;
        $modul->jumlah_hrsbayar = (int)$jumlah_hrsbayar;
        for ($i = 1; $i <= $cicilan; $i++) {
            $data = $modul->store();
        }
        if ($data) {
            session()->flash('success', 'Transaksi pembayaran berhasil ditambahkan');
        } else {
            session()->flash('error', 'Transaksi pembayaran gagal ditambahkan');
        }
        return to_route('admin.transaksi-pembayaran');
    }
    public function konfirmasi_pembayaran(Request $request)
    {
        $modul = new Tpembayaran;
        $modul->id_transaksi_pembayaran = $request->id;
        $modul->tanggal_dibayar = date('Y-m-d');
        $modul->nama_entry_admin = session('nama_lengkap');
        $data = $modul->konfirmasiPembayaran();
        if ($data) {
            session()->flash('success', 'Transaksi pembayaran berhasil dikonfirmasi');
        } else {
            session()->flash('error', 'Transaksi pembayaran gagal dikonfirmasi');
        }
        return  to_route('admin.transaksi-pembayaran');
    }
    public function konfirmasi_batal_pembayaran(Request $request)
    {
        $modul = new Tpembayaran;
        $modul->id_transaksi_pembayaran = $request->id;
        $data = $modul->konfirmasiBatalPembayaran();
        if ($data) {
            session()->flash('success', 'Transaksi pembayaran berhasil dibatalkan');
        } else {
            session()->flash('error', 'Transaksi pembayaran gagal dibatalkan');
        }
        return to_route('admin.transaksi-pembayaran');
    }
    // public function update(Request $request){
    //     $startYear = date('Y');
    //     $endYear = $startYear + 1;
    //     $modul = new Tpembayaran;
    //     $modul->id_user = $request->selectedUser['value'];
    //     $modul->id_pembayaran = $request->selectedPembayaran['value'];
    //     $modul->cperiode = $startYear.$endYear;
    //     $modul->njumlah = preg_replace('/\./', '', $request->dibayarkan);
    //     $data = $modul->update($request->id);
    //     if ($data) {
    //         session()->flash('success', 'Transaksi pembayaran berhasil diupdate');
    //     } else {
    //         session()->flash('error', 'Transaksi pembayaran gagal diupdate');
    //     }
    //     return to_route('admin.transaksi-pembayaran');
    // }
    
    public function destroy(Request $request){
        $modul = new Tpembayaran;
        $data = $modul->destroy($request->id);
        if ($data) {
            session()->flash('success', 'Transaksi pembayaran berhasil dihapus');
        } else {
            session()->flash('error', 'Transaksi pembayaran gagal dihapus');
        }
        return to_route('admin.transaksi-pembayaran');
    }
    // Calon Siswa
    public function riwayat_pembayaran()
    {
        $modul = new Tpembayaran;
        $data = $modul->getAllPembayaran();
        // dd($data);
        return inertia('calon_siswa/pembayaran/RiwayatPembayaran',[
            'datas' => $data,
        ]);
    }
    public function detail_riwayat_pembayaran(Request $request)
    {
        // dd($request->all());
        $modul = new Tpembayaran;
        $modul1 = new Pendaftaran;
        $modul->id_user = session('id_user');
        $modul->id_pembayaran = $request->id;
        $modul->periode = session('periode');
        $modul1->periode = session('periode');
        $no_form = $modul1->getNoFormulir();
        // dd($no_form);
        $modul->no_form = $no_form;
        $data = $modul->riwayatPembayaran();
        // dd($data);
        if(empty($data)){
            session()->flash('error', 'Anda belum membuat cicilan yang harus dibayar');
            return to_route('riwayat.pembayaran');
        }
        // dd($data);
        return inertia('calon_siswa/pembayaran/DetailRiwayatPembayaran',[
            'datas' => $data,
        ]);
    }
}
