<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    if (Auth::check())
        return redirect()->route('posts.index');
    else
        return redirect()->route('login');
});

Route::middleware('auth')->group(function () {
    // Posts
    Route::resource('posts', PostController::class);
});

require __DIR__ . '/auth.php';
