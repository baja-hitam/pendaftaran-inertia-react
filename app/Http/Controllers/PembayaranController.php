<?php

namespace App\Http\Controllers;

use App\Http\Modulus\Mpembayaran;
use App\Http\Modulus\Tpembayaran;
use Illuminate\Http\Request;

class PembayaranController extends Controller
{

    public function index()
    {
        $modul = new Mpembayaran;
        $data = $modul->getAllPembayaran();
        return inertia('admin/pembayaran/Pembayaran', [
            'datas' => $data
        ]);
    }
    public function store(Request $request)
    {
        $modul = new Mpembayaran;
        $modul->nama_pembayaran = $request->namaPembayaran;
        $modul->total_pembayaran = preg_replace('/\./', '', $request->totalPembayaran);
        $data = $modul->store();
        if ($data) {
            session()->flash('success', 'Pembayaran berhasil ditambahkan');
        } else {
            session()->flash('error', 'Pembayaran gagal ditambahkan');
        }
        return to_route('admin.pembayaran');
    }
    public function destroy(Request $request)
    {
        $modul = new Mpembayaran;
        $modul->id = $request->id;
        $data = $modul->destroy();
        if ($data) {
            session()->flash('success', 'Pembayaran berhasil dihapus');
        } else {
            session()->flash('error', 'Pembayaran gagal dihapus');
        }
        return to_route('admin.pembayaran');
    }
    public function update(Request $request)
    {
        $modul = new Mpembayaran;
        $modul->id = $request->id;
        $modul->nama_pembayaran = $request->namaPembayaran;
        $modul->total_pembayaran = preg_replace('/\./', '', $request->totalPembayaran);
        $data = $modul->update();
        if ($data) {
            session()->flash('success', 'Pembayaran berhasil diupdate');
        } else {
            session()->flash('error', 'Pembayaran gagal diupdate');
        }
        return to_route('admin.pembayaran');
    }
}
