<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Ichtrojan\Otp\Otp;
use Illuminate\Http\Request;
use App\Http\Modulus\Mperiode;
use App\Http\Modulus\Registration;

class RegisterController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('Daftar');
    }
    public function otp(Request $request)
    {
        $startYear = date('Y');
        $endYear = $startYear + 1;
        $modul = new Registration;
        $modul1 = new Mperiode;
        $modul1->periode = $startYear.$endYear;
        $checkPeriode = $modul1->checkPeriode();
        $modul->email = $request['email'];
        $modul->password = $request['password'];
        $modul->nama_lengkap = $request['namalnkp'];
        $modul->no_telp = $request['notelp'];
        $checkEmail = $modul->checkEmail();
        if(empty($checkPeriode)){
            $request->session()->flash('status', 'error');
            $request->session()->flash('message', 'Periode pendaftaran belum dibuka, silahkan hubungi sekolah untuk informasi lebih lanjut');
            return to_route('register');
        }
        if(!empty($checkEmail)){
            $request->session()->flash('status', 'error');
            $request->session()->flash('message', 'Email sudah terdaftar');
            return back();
        }
        session()->put('user', $request->all());
        // dd(session('user'));
        $otp = (new Otp)->generate($request->email, 'numeric', 4,10);
        return Inertia::render('calon_siswa/otp/daftar/Otp',[
            'otp' => $otp,
        ]);
    }
    public function store(Request $request)
    {
        $user = session('user');
        $otp = (new Otp)->validate($user['email'], $request->otp);
        if (!$otp) {
            $request->session()->flash('status', 'error');
            $request->session()->flash('message', 'Kode OTP tidak valid');
            return back();
        }
        $modul = new Registration;
        $modul->email = $user['email'];
        $modul->password = $user['password'];
        $modul->nama_lengkap = $user['namalnkp'];
        $modul->no_telp = $user['notelp'];
        $result = $modul->register();
        if(!$result){
            $request->session()->flash('status', 'error');
            $request->session()->flash('message', 'Anda Gagal Mendaftar');
            return to_route('register');
        }
        session()->forget('user');
        $request->session()->flash('status', 'success');
        $request->session()->flash('message', 'Anda Berhasil Mendaftar');
        return to_route('login');
    }
}
