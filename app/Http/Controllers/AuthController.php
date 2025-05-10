<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    //

    public function index(){
        return Inertia::render('Login');
    }
    public function login(Request $request){
        
    }
}
