<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\Media;
use Exception;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        $user = User::where(function ($query) use ($request) {
                $query->where('email', $request->email);
            })->first();

        $userInfo = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $token = $user->createToken('token-name')->plainTextToken;

        $this->tokenUpdate($token, $user);

        return response()->json([
            'token' => $token,
            'user' => $userInfo,
        ], 200);
    }


    public function auth(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(null, 401);
        }

        if(!$user->is_active){
            $user->remember_token = null;
            $user->save();
            return response()->json(null, 401);
        }

        $rememberToken = $request->header('Authorization')
            ? str_replace('Bearer ', '', $request->header('Authorization'))
            : null;

        if ($user->remember_token !== $rememberToken) {
            return response()->json(null, 401);
        }


        return response()->json([
            'user' => $user,
        ], 200);
        return response()->json($request->user());
    }

    public function tokenUpdate($token, $user)
    {
        $user = User::find($user->id);
        $user->remember_token = $token;
        $user->save();
    }

    public function logout(Request $request)
    {
        try {
            $rememberToken = ($request->has('remember_token')) ? $request->input('remember_token') : null;

            if (!$rememberToken) {
                throw new Exception('You are NOT Authenticate to get this Information');
            }

            $user = User::where('remember_token', $rememberToken)->first();

            if (!$user) {
                throw new \Exception('Authentication Failed');
            } else {
                $user->remember_token = null;
                $user->save();
                $data['status_code']    = 200;
                $data['logout_status']  = true;
            }
        } catch (\Exception $exception) {
            $data['logout_status']  = false;
            $data['status_code']    = 400;
            $data['status']         = $exception->getMessage();
        } finally {
            return response()->json($data);
        }
    }
}
