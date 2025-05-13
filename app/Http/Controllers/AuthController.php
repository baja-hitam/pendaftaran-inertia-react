<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Modulus\Authentication;

class AuthController extends Controller
{
    //

    public function index(){
        return Inertia::render('Login');
    }
    public function login(Request $request){
        $modul = new Authentication;
        $modul->email = $request->email;
        $modul->password = $request->password;
        $data = $modul->login();
        if(empty($data)){
            $request->session()->flash('status', 'error');
            $request->session()->flash('message', 'Email atau Password Salah');
            return back();
        }
        session(['user' => $data[0]->email]);
        return to_route('dashboard');
    }
}
