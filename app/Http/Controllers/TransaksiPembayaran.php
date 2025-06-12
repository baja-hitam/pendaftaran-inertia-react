<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Modulus\Tpembayaran;

class TransaksiPembayaran extends Controller
{
    public function index()
    {
        $modul = new Tpembayaran;
        $data = $modul->getAllUser();
        $data1 = $modul->getAllPembayaran();
        $data2 = $modul->getAllTransaksi();
        // dd($data2);
        return inertia('admin/transaksi_pembayaran/TransaksiPembayaran',[
            'datasUserOption' => $data,
            'datasJenPembayaranOption' =>$data1,
            'datas'=>$data2
        ]);
    }
    public function store(Request $request)
    {
        $startYear = date( 'Y');
        $endYear = $startYear + 1;
        $modul = new Tpembayaran;
        $modul->id_user = $request->selectedUser['value'];
        $modul->id_pembayaran = $request->selectedPembayaran['value'];
        $modul->cperiode = $startYear.$endYear;
        $modul->tanggal_pembayaran = date('y-m-d');
        $modul->njumlah = preg_replace('/\./', '', $request->dibayarkan);
        $data = $modul->store();
        if ($data) {
            session()->flash('success', 'Transaksi pembayaran berhasil ditambahkan');
        } else {
            session()->flash('error', 'Transaksi pembayaran gagal ditambahkan');
        }
        return to_route('admin.transaksi-pembayaran');
    }
    public function update(Request $request){
        $startYear = date('Y');
        $endYear = $startYear + 1;
        $modul = new Tpembayaran;
        $modul->id_user = $request->selectedUser['value'];
        $modul->id_pembayaran = $request->selectedPembayaran['value'];
        $modul->cperiode = $startYear.$endYear;
        $modul->njumlah = preg_replace('/\./', '', $request->dibayarkan);
        $data = $modul->update($request->id);
        if ($data) {
            session()->flash('success', 'Transaksi pembayaran berhasil diupdate');
        } else {
            session()->flash('error', 'Transaksi pembayaran gagal diupdate');
        }
        return to_route('admin.transaksi-pembayaran');
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
    public function riwayat_pembayaran()
    {
        $startYear = date('Y');
        $endYear = $startYear + 1;
        $modul = new Tpembayaran;
        $modul->id_user = session('id_user');
        $modul->cperiode = $startYear.$endYear;
        $data = $modul->riwayatPembayaran();
        // dd($data);
        return inertia('calon_siswa/pembayaran/RiwayatPembayaran',[
            'datas' => $data,
        ]);
    }
}
