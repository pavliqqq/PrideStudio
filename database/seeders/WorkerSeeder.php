<?php

namespace Database\Seeders;

use App\Models\worker;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class WorkerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        worker::create([
            'full_name' => 'Admin',
            'image' => 'admin.jpg',
            'post' => 'admin',
            'password' => Hash::make('password'), // не забудь установить хеш
            'role' => 'admin',
        ]);
    }
}
