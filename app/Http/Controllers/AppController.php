<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AppController extends Controller
{
    public function session()
    {
        session_start();

        return response()->json([
            'message' => session()->getId(),
            'token' => csrf_token()
        ]);
    }
}
