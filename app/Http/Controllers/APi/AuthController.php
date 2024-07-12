<?php

namespace App\Http\Controllers\APi;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'max:20'],
            'email' => ['required ', 'email', 'unique:users,email'],
            'password' => ['required', ' min:8 ', ' confirmed'],

        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->errors(),
            ]);
        } else {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'role' => 'user',
                'password' => Hash::make($request->password),

            ]);
            $token =  $user->createToken($user->email . '_Token')->plainTextToken;
            // $token = md5($user->email . '_Token'); // + them chuoi gi gi do tuy thich, co the config prefix trong file config
            return response()->json([
                'status' => 200,
                'username' => $user->name,
                'role' => 'user',
                'token' => $token,
                'message' => 'Registered successfully',
            ]);
        }
    }

    public function login(Request $request)
    {
        if ($request) {

            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 401,
                    'message' => 'Invalid Credentials',
                ]);
            } else {
                if ($user->role == 'admin') {
                    $token = $user->createToken($user->email . 'AdminToken', ['server:admin'])->plainTextToken;
                } else {
                    $token = $user->createToken($user->email . '_Token', [''])->plainTextToken;
                }
                return response()->json([
                    'status' => 200,
                    'username' => $user->name,
                    'token' => $token,
                    'role' => $user->role,
                    'message' => 'login successfully',
                ]);
            }
        } else {
            return response()->json([
                'validation_errors' => 'Errors',
            ]);
        }
    }
    public function logout()
    {
        $user = new User();
        $user->tokens()->delete();
        // User::tokens()->delete();
        // auth()->user()->tokens()->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Logged Out Successfully',
        ]);
    }
}
