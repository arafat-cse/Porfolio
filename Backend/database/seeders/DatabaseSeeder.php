<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;


class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $users = [
            [
                'name' => 'Admin User',
                'email' => 'admin@admin.com',
                'password' => Hash::make('admin@1234'),
            ],
            [
                'name' => 'Md Samaul islam',
                'email' => 'samaul@admin.com',
                'password' => Hash::make('admin@1234'),
            ],
            [
                'name' => 'Md Arafat Rahman',
                'email' => 'arafat@admin.com',
                'password' => Hash::make('admin@1234'),
            ],
        ];

        foreach ($users as $userData) {
            User::updateOrCreate(
                ['email' => $userData['email']],
                $userData
            );
        }
    }
}
