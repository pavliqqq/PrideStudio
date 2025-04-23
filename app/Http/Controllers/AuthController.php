<?php

namespace App\Http\Controllers;

use App\Models\worker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request){
        $login = $request->login;
        $password = $request->password;

        $worker = worker::where('fullname', $login)->first();
        if(!$worker){
            return response()->json(['message' => 'Worker not found'], 404);
        }
        if(!Hash::check($password, $worker->password)){
            return response()->json(['message' => 'Incorrect password'], 401);
        }

        $token = $worker->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }
}
