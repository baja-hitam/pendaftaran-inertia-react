<?php

namespace App\Http\Controllers;

use App\Http\Modulus\Registration;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegisterController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('Daftar');
    }
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8',
        ]);

        $modul = new Registration;
        $modul->email = $request->email;
        $modul->password = $request->password;
        $checkEmail = $modul->checkEmail();
        if(!empty($checkEmail)){
            $request->session()->flash('status', 'error');
            $request->session()->flash('message', 'Email sudah terdaftar');
            return back();
        }
        $result = $modul->register();
        if(!$result){
            $request->session()->flash('status', 'error');
            $request->session()->flash('message', 'Anda Gagal Mendaftar');
            return back();
        }
        $request->session()->flash('status', 'success');
        $request->session()->flash('message', 'Anda Berhasil Mendaftar');
        return to_route('login');
    }
}
