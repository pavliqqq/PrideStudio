<?php

namespace App\Services;

use App\Models\Order;
use App\Models\worker;
use Illuminate\Support\Facades\Hash;

class WorkerService
{
    public function getAll()
    {
        return worker::all();
    }

    public function index()
    {
        $query = worker::query();

        return $query->paginate(3);
    }

    public function show($worker)
    {
        return worker::with('orders')->find($worker);
    }

    public function create($request, $data)
    {
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('workers', 'public');
            $data['image'] = 'storage/' . $path;
        }
        $password = $data['password'];
        $data['password'] = Hash::make($password);
        $data['role'] = 'worker';

        return worker::create($data);
    }

    public function update($request, $worker, $data)
    {
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('workers', 'public');
            $data['image'] = 'storage/' . $path;
        }

        $password = $data['password'];
        $data['password'] = Hash::make($password);
        $data['role'] = 'worker';

        return $worker->update($data);
    }

    public function delete($worker)
    {
        return $worker->delete();
    }
}
