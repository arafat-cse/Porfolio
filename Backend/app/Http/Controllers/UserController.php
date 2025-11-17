<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
        public function add_user(Request $request)
    {
        try {

            $validatedData = $request->validate([
                'userInfo.name' => 'required|string|max:255',
                'userInfo.email' => 'required|email|unique:users,email',
                'userInfo.password' => 'required|string|min:6',


            ]);

            $userInfo = $validatedData['userInfo'];

            $user = User::create([
                'name' => $userInfo['name'],
                'email' => $userInfo['email'],
                'password' => Hash::make($userInfo['password']),
            ]);

            return response()->json([
                'message' => 'User created successfully',
                'data' => $user
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error User create: ' . $e->getMessage());
            return response()->json([
                'error' => 'An error occurred while creating the user',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function edit_user(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'userInfo.name' => 'required|string|max:255',
                'userInfo.password' => 'string|nullable',
                'userInfo.email' => 'required|email|unique:users,email,' . $id,
            ]);

            
            $user = User::findOrFail($id);

            $user->name = $userInfo['name'];
            $user->is_active = $userInfo['is_active'];
            if ($user->email !== $userInfo['email']) {
                $user->email = $userInfo['email'];
            }
            if (!empty($userInfo['password'])) {
                $user->password = Hash::make($userInfo['password']);
            }


            $user->save();

            return response()->json([
                'message' => 'User updated successfully',
                'data' => $user
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating user: ' . $e->getMessage());
            return response()->json([
                'error' => 'An error occurred while updating the user',
                'message' => $e->getMessage()
            ], 500);
        }
    }
    public function change_password(Request $request)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            $validated = $request->validate([
                'current_password' => 'required|string',
                'password' => [
                    'required',
                    'string',
                    'min:6',
                    'confirmed',
                ],
            ]);

            $key = 'change-password:' . $user->id;
            if (RateLimiter::tooManyAttempts($key, 6)) {
                $seconds = RateLimiter::availableIn($key);
                return response()->json([
                    'error' => 'Too many attempts. Try again in ' . $seconds . ' seconds.'
                ], 429);
            }

            if (!Hash::check($validated['current_password'], $user->password)) {
                RateLimiter::hit($key, 60);
                throw ValidationException::withMessages([
                    'error' => 'Your current password is incorrect.'
                ]);
            }

            $user->password = Hash::make($validated['password']);
            $user->save();

            RateLimiter::clear($key);

            return response()->json([
                'message' => 'Password changed successfully.'
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'error' => implode(' ', array_values($e->errors())[0])
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error changing password: ' . $e->getMessage());
            return response()->json([
                'error' => 'An error occurred while changing the password: ' . $e->getMessage()
            ], 500);
        }
    }
}
