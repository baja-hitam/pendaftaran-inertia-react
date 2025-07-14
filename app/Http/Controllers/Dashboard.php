<?php

namespace App\Http\Controllers;

use App\Http\Modulus\DetailUjian;
use App\Http\Modulus\Nilai;
use App\Http\Modulus\Pendaftaran;
use Inertia\Inertia;
use Illuminate\Http\Request;

class Dashboard extends Controller
{
    public function index()
    {
        $modul = new DetailUjian;
        $data = $modul->getAllUjianAktif();
        // dd($data);
        return Inertia::render('Dashboard',[
            'datasDetailUjian'=>$data
        ]);
    }
    public function admin_index()
    {
        $startYear = date('Y');
        $endYear = $startYear + 1;

        $modul = new Nilai;
        $modul1 = new Pendaftaran;
        $modul1->periode = $startYear. $endYear;
        $modul->periode = $startYear. $endYear;
        $data = $modul->getNilaiTertinggi();
        $data1 = $modul1->getJumlahPendaftaran();
        $label = [];
        $jumlah = [];
        foreach($data1 as $item){
            $label[] = $item->periode;
            $jumlah[] = (int)$item->jumlah_pendaftar;
        };
        // dd($data);
        return Inertia::render('admin/Dashboard',[
            'datasRangking' => $data,
            'datasLabel' => $label,
            'datasJumlah' => $jumlah
        ]);
    }
}
