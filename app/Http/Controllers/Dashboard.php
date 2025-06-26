<?php

namespace App\Http\Controllers;

use App\Http\Modulus\DetailUjian;
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
}
