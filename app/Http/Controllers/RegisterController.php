<?php

namespace App\Http\Controllers;

use App\Http\Modulus\Authentication;
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

        $modul = new Authentication;
        $modul->email = $request->email;
        $modul->password = $request->password;
        $result = $modul->register();
        return to_route('login')->with('message', $result);
    }
}
