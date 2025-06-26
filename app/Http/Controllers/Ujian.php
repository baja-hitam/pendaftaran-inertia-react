<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Modulus\MUjian;
use Illuminate\Http\Request;
use App\Http\Modulus\DetailUjian;

class Ujian extends Controller
{
    public function index(){
        $modul = new MUjian;
        $modul1 = new DetailUjian;
        $data = $modul->getUjian();
        $data1 = $modul1->index();
        // dd($data1);
        return Inertia::render('admin/ujian/Ujian',[
            'datas' => $data,
            'datasDetail' => $data1
        ]);
    }
    public function store(Request $request){
        $modul = new MUjian;
        $modul->nama_ujian = $request->namaUjian;
        $result = $modul->store();
        if($result){
            session()->flash('success', 'Ujian berhasil ditambahkan');
        } else {
            session()->flash('error', 'Ujian gagal ditambahkan');
        }
        return to_route('admin.ujian');
    }
    public function update(Request $request){
        $modul = new MUjian;
        $modul->id_ujian = $request->idUjian;
        $modul->nama_ujian = $request->namaUjian;
        $result = $modul->update();
        if($result){
            session()->flash('success', 'Ujian berhasil diupdate');
        } else {
            session()->flash('error', 'Ujian gagal diupdate');
        }
        return to_route('admin.ujian');
    }
    public function destroy(Request $request){
        $modul = new MUjian;
        $modul->id_ujian = $request->idUjian;
        $result = $modul->destroy();
        if($result){
            session()->flash('success', 'Ujian berhasil dihapus');
        } else {
            session()->flash('error', 'Ujian gagal dihapus');
        }
        return to_route('admin.ujian');
    }
    public function store_detail_ujian(Request $request){
        $startYear = date('Y');
        $endYear = $startYear + 1;
        $modul = new DetailUjian;
        // dd($request->all());
        $modul->id_ujian = $request->selectedUjian['value'];
        $modul->tanggal_ujian = $request->tanggalUjian;
        $modul->periode = $startYear.$endYear;
        $modul->waktu_mulai = $request->waktuMulai;
        $modul->waktu_selesai = $request->waktuSelesai;
        $modul->ruang_ujian = $request->ruangUjian;
        $modul->status = $request->status;
        if($request->status == 'T'){
            $check = $modul->checkDetailUjianAktif();
            if(!empty($check)){
                session()->flash('error', 'Detail Ujian yang aktif sudah ada');
                return to_route('admin.ujian');
            }
        }
        $result = $modul->store();
        if($result){
            session()->flash('success', 'Detail Ujian berhasil ditambahkan');
        } else {
            session()->flash('error', 'Detail Ujian gagal ditambahkan');
        }
        return to_route('admin.ujian');
    }
    public function update_detail_ujian(Request $request){
        $modul = new DetailUjian;
        // dd($request->all());
        $modul->id_detail_ujian = $request->idDetailUjian;
        $modul->id_ujian = $request->selectedUjian['value'];
        $modul->tanggal_ujian = $request->tanggalUjian;
        $modul->waktu_mulai = $request->waktuMulai;
        $modul->waktu_selesai = $request->waktuSelesai;
        $modul->ruang_ujian = $request->ruangUjian;
        $modul->status = $request->status;
        if($request->status == 'T'){
            $check = $modul->checkDetailUjianAktif();
            if(!empty($check)){
                session()->flash('error', 'Detail Ujian yang aktif sudah ada');
                return to_route('admin.ujian');
            }
        }
        $result = $modul->update();
        if($result){
            session()->flash('success', 'Detail Ujian berhasil diupdate');
        } else {
            session()->flash('error', 'Detail Ujian gagal diupdate');
        }
        return to_route('admin.ujian');
    }
    public function destroy_detail_ujian(Request $request){
        $modul = new DetailUjian;
        // dd($request->all());
        $modul->id_detail_ujian = $request->idDetailUjian;
        $result = $modul->destroy();
        if($result){
            session()->flash('success', 'Detail Ujian berhasil dihapus');
        } else {
            session()->flash('error', 'Detail Ujian gagal dihapus');
        }
        return to_route('admin.ujian');
    }
}
