<?php

namespace App\Console\Commands;

use App\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class DoodleCreateAdmin extends Command
{

    protected $signature = 'doodle:create:admin';

    protected $description = 'Create admin user, based on .env settings';

    public function handle()
    {

        $data = [
            'name'     => config('admin.name'),
            'email'    => config('admin.email'),
            'password' => config('admin.password'),
        ];

        $validator = Validator::make($data, [
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return $this->info($validator->errors());
        }

        $user = User::create([
            'name'     => config('admin.name'),
            'email'    => config('admin.email'),
            'role'     => 'admin',
            'password' => Hash::make(config('admin.password')),
        ]);

        return $this->info($user);

    }

}
