<?php

namespace App\Http\Controllers;

use App\Http\Modulus\Mkelas;
use App\Http\Modulus\Mperiode;
use App\Http\Modulus\Pendaftaran;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KelasController extends Controller
{
    public function index(Request $request)
    {
        // dd(session('periode'));
        $modul = new Mkelas;
        $data = $modul->getAllKelas();
        $modul1 = new Pendaftaran;
        $modul2 = new Mperiode;
        $modul1->periode = $request->input('periode') ?? session('periode');
        $dataSiswa = $modul1->getDaftarFormulir();
        // dd($dataSiswa);
        $dataPeriode = $modul2->getAllPeriode();
        return Inertia::render('admin/kelas/Kelas', [
            'datas' => $data,
            'dataSiswa' => $dataSiswa,
            'dataPeriode' => $dataPeriode,
            'periodeSession' => $request->input('periode') ?? session('periode'),
        ]);
    }
    public function store(Request $request)
    {
        $modul = new Mkelas;
        $modul->kelas = $request->input('kelas');
        $modul->max = $request->input('max');

        // Save the new class to the database
        $data = $modul->store();

        if($data){
            session()->flash('success', 'Kelas berhasil ditambahkan');
        } else {
            session()->flash('error', 'Kelas gagal ditambahkan');
        }

        return to_route('admin.kelas');
    }
    public function update(Request $request)
    {
        $modul = new Mkelas;
        $modul->id_kelas = $request->input('idKelas');
        $modul->kelas = $request->input('kelas');
        $modul->max = $request->input('max');

        // Update the class in the database
        $data = $modul->update();

        if($data){
            session()->flash('success', 'Kelas berhasil diupdate');
        } else {
            session()->flash('error', 'Kelas gagal diupdate');
        }

        return to_route('admin.kelas');
    }
    public function destroy(Request $request){
        $modul = new Mkelas;
        $modul->id_kelas = $request->input('idKelas');

        // Delete the class from the database
        $data = $modul->destroy();

        if($data){
            session()->flash('success', 'Kelas berhasil dihapus');
        } else {
            session()->flash('error', 'Kelas gagal dihapus');
        }

        return to_route('admin.kelas');
    }
}
