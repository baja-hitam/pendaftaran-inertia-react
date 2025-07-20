<?php

namespace App\Http\Controllers;

use App\Http\Modulus\Mperiode;
use App\Http\Modulus\Pendaftaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
        foreach ($data2 as $key => $row) {
            if($row->path_bukti != null){
                $data2[$key]->path_bukti = Storage::url($row->path_bukti);
            }
        }
        $data3 = $modul1->getAllPeriode();
        $data4 = $modul2->getAllFormulir();
        // dd($data2);
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
        foreach ($data as $key => $row) {
            if($row->path_bukti != null){
                $data[$key]->path_bukti = Storage::url($row->path_bukti);
            }
        }
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
    //calon siswa buat angsuran
    public function storeAngsuran(Request $request)
    {
        $startYear = date( 'Y');
        $endYear = $startYear + 1;
        $modul = new Tpembayaran;
        $modul1 = new Pendaftaran;
        $modul1->periode = session('periode');
        $no_form = empty($modul1->getNoFormulir()) ? null : $modul1->getNoFormulir();
        // dd($no_form);
        $modul->id_pembayaran = $request->selectedPembayaran['value'];
        $modul->periode = $request->periode ?? $startYear.$endYear;
        $total_pembayaran = $modul->getTotalPembayaran();
        $transaksiPembayaran = [];
        if($request->selectedPembayaran['value'] == '1'){
            $modul->id_user = session('id_user');
            $data = $modul->checkCicilan();
            if(!empty($data)){
                session()->flash('error', 'Anda sudah membuat kwitansi yang harus dibayar');
                return to_route('riwayat.pembayaran');
            }
        }else{
            if($no_form == null){
                session()->flash('error', 'Anda belum mengisi formulir pendaftaran');
                return to_route('riwayat.pembayaran');
            }
            $modul->no_form = $no_form;
            $data = $modul->checkCicilan();
            if(count($data) > 1){
                session()->flash('error', 'Anda sudah membuat cicilan yang harus dibayar');
                return to_route('riwayat.pembayaran');
            }
            $transaksiPembayaran = $modul->getTransaksiPembayaranById();
        }
        if(!empty($transaksiPembayaran)){
            if($transaksiPembayaran[0]->path_bukti != null){
                session()->flash('error', 'Tidak bisa membuat angsuran, karena sudah ada bukti pembayaran');
                return to_route('riwayat.pembayaran');
            }
            $modul->destroy($transaksiPembayaran[0]->id_transaksi_pembayaran);
        }
        $cicilan = $request->cicilan ?? 1;
        $jumlah_hrsbayar = (int)$total_pembayaran / (int)$cicilan;
        $modul->jumlah_hrsbayar = (int)$jumlah_hrsbayar;
        for ($i = 1; $i <= $cicilan; $i++) {
            $data = $modul->store();
        }
        if ($data) {
            session()->flash('success', 'Cicilan pembayaran berhasil dibuat');
        } else {
            session()->flash('error', 'Cicilan pembayaran gagal dibuat');
        }
        return to_route('riwayat.pembayaran');
    }
    public function konfirmasi_pembayaran(Request $request)
    {
        $modul = new Tpembayaran;
        $modul->id_transaksi_pembayaran = $request->id;
        $modul->verif_by = session('id_user');
        $data = $modul->konfirmasiPembayaran();
        // dd($modul);
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
    public function create_kwitansi(Request $request)
    {
        $modul = new Tpembayaran;
        $modul1 = new Pendaftaran;
        $modul1->periode = session('periode');
        $no_form = empty($modul1->getNoFormulir()) ? null : $modul1->getNoFormulir();
        $modul->id_pembayaran = $request->id_pembayaran;
        $total_pembayaran = $modul->getTotalPembayaran();
        if($request->id_pembayaran == '1'){
            $modul->id_user = session('id_user');
            $modul->periode = session('periode');
            $modul->jumlah_hrsbayar = $total_pembayaran;
            $modul->no_form = null;
        }else{
            if($no_form == null){
                session()->flash('error', 'Anda belum mengisi formulir pendaftaran');
                return to_route('riwayat.pembayaran');
            }
            $modul->no_form = $no_form;
            $modul->periode = session('periode');
            $modul->jumlah_hrsbayar = $total_pembayaran;
        }
        $data = $modul->store();

        if ($data) {
            session()->flash('success', 'Kwitansi berhasil dibuat');
        } else {
            session()->flash('error', 'Kwitansi gagal dibuat');
        }
        return to_route('riwayat.pembayaran');
    }
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
    public function riwayat_pembayaran(Request $request)
    {
        $modul = new Tpembayaran;
        $modul1 = new Pendaftaran;
        $data = $modul->getAllPembayaran();
        $periode = empty($modul1->getFormulirPeriode()) ? [['periode'=> session('periode')]] : $modul1->getFormulirPeriode();
        // dd($periode);
        $modul1->periode = $request->periode ?? session('periode');
        $no_form = empty($modul1->getNoFormulir()) ? null : $modul1->getNoFormulir();
        // dd($no_form);
        // dd(session('id_user'));
        foreach ($data as $key => $row) {
            // dd($row);
            $modul->periode = $request->periode ?? session('periode');
            if($row->id_pembayaran == '1'){
                // dd('tets');
                $modul->id_user = session('id_user');
                $modul->id_pembayaran = $row->id_pembayaran;
                $cicilan = $modul->checkCicilan();
                // dd($cicilan);
                if(empty($cicilan)){
                    $data[$key]->status = 0;
                }else{
                    $data[$key]->status = 1;
                }
            }else{
                // dd($no_form)
                if($no_form != null){
                    $modul->no_form = $no_form;
                    $modul->id_pembayaran = $row->id_pembayaran;
                    $cicilan = $modul->checkCicilan();
                    // dd($cicilan);
                    if(empty($cicilan)){
                        $data[$key]->status = 0;
                    }else{
                        $data[$key]->status = 1;
                    }
                }else{
                    $data[$key]->status = 0;
                }
            }
        }
        // dd($data);
        return inertia('calon_siswa/pembayaran/RiwayatPembayaran',[
            'datas' => $data,
            'periode' => $periode,
            'periodeSession' => session('periode')
        ]);
    }
    public function detail_riwayat_pembayaran(Request $request)
    {
        // dd($request->all());
        $modul = new Tpembayaran;
        $modul1 = new Pendaftaran;
        $modul->id_user = session('id_user');
        $modul->id_pembayaran = $request->id;
        $modul->periode = $request->periode;
        $modul1->periode = $request->periode;
        $no_form = $modul1->getNoFormulir();
        // dd($no_form);
        $modul->no_form = $no_form;
        $data = $modul->riwayatPembayaran();
        foreach ($data as $key => $row) {
            if($row->path_bukti != null){
                $data[$key]->path_bukti = Storage::url($row->path_bukti);
            }
        }
        // dd($data);
        if(empty($data)){
            session()->flash('error', 'Anda belum membuat kwitansi untuk pembayaran ini');
            return to_route('riwayat.pembayaran');
        }
        // dd($data);
        return inertia('calon_siswa/pembayaran/DetailRiwayatPembayaran',[
            'datas' => $data,
        ]);
    }
    public function upload_bukti(Request $request)
    {
        // dd($request->all());
        // dd($request->file('file'));
        $path = $request->file('file')->store('bukti_pembayaran', 'public');
        // dd($path,basename($path));
        $modul = new Tpembayaran;
        $modul->id_transaksi_pembayaran = $request['idTransaksiPembayaran'];
        $modul->path_bukti = $path;
        $modul->nama_bukti = $request->file('file')->getClientOriginalName();
        // dd($modul);
        $data = $modul->uploadBukti();
        // dd($data);
        if ($data) {
            session()->flash('success', 'Bukti pembayaran berhasil diupload');
        } else {
            session()->flash('error', 'Bukti pembayaran gagal diupload');
        }
        return to_route('riwayat.pembayaran');
    }
}
