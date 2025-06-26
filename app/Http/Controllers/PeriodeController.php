<?php

namespace App\Http\Controllers;

use App\Http\Modulus\Mperiode;
use Illuminate\Http\Request;

class PeriodeController extends Controller
{
    public function index()
    {
        $modul = new Mperiode;
        $data = $modul->getAllPeriode();
        // dd($data);
        return inertia('admin/periode/Periode',[
            'datas'=> $data
        ]);
    }
    public function store(Request $request)
    {
        $startYear = date('Y', strtotime($request->startDate));
        $endYear = $startYear + 1;
        $modul = new Mperiode;
        $modul->periode = $startYear.$endYear;
        $modul->dstart_date = $request->startDate;
        $modul->dend_date = $request->endDate;
        $modul->caktif = $request->status;
        $check = $modul->checkPeriode();
        if(!empty($check)){
            session()->flash('error', 'Periode sudah ada');
            return to_route('admin.periode');
        }
        $data = $modul->store();
        if($data){
            session()->flash('success', 'Periode berhasil ditambahkan');
        } else {
            session()->flash('error', 'Periode gagal ditambahkan');
        }
        return to_route('admin.periode');
    }
    public function update(Request $request)
    {
        $startYear = date('Y', strtotime($request->startDate));
        $endYear = $startYear + 1;
        $modul = new Mperiode;
        $modul->periode = $startYear.$endYear;
        $modul->dstart_date = $request->startDate;
        $modul->dend_date = $request->endDate;
        $modul->caktif = $request->status;
        $data = $modul->update();
        if($data){
            session()->flash('success', 'Periode berhasil diubah');
        } else {
            session()->flash('error', 'Periode gagal diubah');
        }
        return to_route('admin.periode');
    }
    public function delete(Request $request)
    {
        // dd($request);
        $modul = new Mperiode;
        $modul->periode = $request->periode;
        $data = $modul->delete();
        if($data){
            session()->flash('success', 'Periode berhasil dihapus');
        } else {
            session()->flash('error', 'Periode gagal dihapus');
        }
        return to_route('admin.periode');
    }
}
