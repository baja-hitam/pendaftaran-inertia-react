<?php

namespace App\Http\Controllers;

use App\Http\Modulus\Mperiode;
use Illuminate\Http\Request;
use App\Http\Modulus\Tpembayaran;

class TransaksiPembayaran extends Controller
{
    public function index()
    {
        $startYear = date( 'Y');
        $endYear = $startYear + 1;
        $modul = new Tpembayaran;
        $modul1 = new Mperiode;
        $modul->periode = $startYear.$endYear;
        $data = $modul->getAllUser();
        $data1 = $modul->getAllPembayaran();
        $data2 = $modul->getAllTransaksi();
        $data3 = $modul1->getAllPeriode();
        // dd($data2);
        return inertia('admin/transaksi_pembayaran/TransaksiPembayaran',[
            'datasUserOption' => $data,
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
        $modul->periode = $request->periode ?? ''; 
        $modul->search = $request->user ?? '';
        $data3 = $modul1->getAllPeriode();
        $data = $modul->search();
        return inertia('admin/transaksi_pembayaran/TransaksiPembayaran',[
            'datas' => $data,
            'search' => $request->user,
            'tahun' => $request->periode,
            'datasPeriodeOption' => $data3,
            'datasUserOption' => $modul->getAllUser(),
            'datasJenPembayaranOption' => $modul->getAllPembayaran(),
        ]);
    }
    public function store(Request $request)
    {
        $startYear = date( 'Y');
        $endYear = $startYear + 1;
        $modul = new Tpembayaran;
        $modul->id_user = $request->selectedUser['value'];
        $modul->id_pembayaran = $request->selectedPembayaran['value'];
        $modul->periode = $startYear.$endYear;
        $total_pembayaran = $modul->getTotalPembayaran();
        $jumlah_hrsbayar = (int)$total_pembayaran / (int)$request->cicilan;
        $modul->jumlah_hrsbayar = (int)$jumlah_hrsbayar;
        for ($i = 1; $i <= $request->cicilan; $i++) {
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
        $modul->id_user = session('id_user');
        $modul->periode = session('periode');
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
        $modul->id_user = session('id_user');
        $modul->id_pembayaran = $request->id;
        $modul->periode = session('periode');
        $data = $modul->riwayatPembayaran();
        if(empty($data)){
            session()->flash('error', 'Tidak ada cicilan yang harus dibayar');
            return to_route('riwayat.pembayaran');
        }
        // dd($data);
        return inertia('calon_siswa/pembayaran/DetailRiwayatPembayaran',[
            'datas' => $data,
        ]);
    }
}
