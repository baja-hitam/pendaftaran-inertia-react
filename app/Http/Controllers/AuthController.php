<?php

namespace App\Http\Controllers;

use App\Http\Modulus\Mperiode;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Modulus\Authentication;

class AuthController extends Controller
{
    //

    public function index(){
        return Inertia::render('Login');
    }
    public function indexAdmin(){
        return Inertia::render('admin/Login');
    }
    public function login(Request $request){
        $startYear = date('Y');
        $endYear = $startYear + 1;
        $modul = new Authentication;
        $modul1 = new Mperiode;
        $modul->email = $request->email;
        $modul->password = $request->password;
        $data = $modul->login();
        if(empty($data)){
            $request->session()->flash('status', 'error');
            $request->session()->flash('message', 'Email atau Password Salah');
            return back();
        }
            $modul1->cperiode = $startYear.$endYear;
            $checkPeriode = $modul1->checkPeriode();
            if(empty($checkPeriode)){
                $request->session()->flash('status', 'error');
                $request->session()->flash('message', 'Periode pendaftaran belum dibuka, silahkan hubungi sekolah untuk informasi lebih lanjut');
                return back();
            }
            session(['user' => $data[0]->email]);
            session(['id_user'=>$data[0]->id_user]);
            session(['level' => $data[0]->level]);
            return to_route('dashboard');
    }
    public function loginAdmin(Request $request){
        $modul = new Authentication;
        $modul->email = $request->email;
        $modul->password = $request->password;
        $data = $modul->login_admin();
        if(empty($data)){
            $request->session()->flash('status', 'error');
            $request->session()->flash('message', 'Email atau Password Salah');
            return back();
        }
        session(['user' => $data[0]->email]);
        session(['id_user'=>$data[0]->id_user]);
        session(['level' => $data[0]->level]);
        return to_route('admin.periode');
    }
}
