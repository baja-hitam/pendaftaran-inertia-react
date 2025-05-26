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
            'data'=> $data
        ]);
    }
}
