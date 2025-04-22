<?php

namespace App\Services;

use App\Models\Order;
use App\Models\worker;

class WorkerService
{
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

        return worker::create($data);
    }
    public function update($request, $worker, $data)
    {
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('workers', 'public');
            $data['image'] = 'storage/' . $path;
        }

        $orders = $data['orders'];
        unset($data['orders']);

        $worker->update($data);
        $worker->orders()->sync($orders);

        return $worker->fresh();
    }
    public function delete($worker)
    {
        return $worker->delete();
    }
}
