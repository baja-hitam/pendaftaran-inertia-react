<?php

use App\Http\Controllers\ProfileController;
use App\Http\Middleware\AuthSession;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


require __DIR__.'/guest.php';
require __DIR__.'/auth.php';
