<?php

namespace App\Services;

use App\Models\Order;
use App\Models\worker;

class WorkerService
{
    public function index()
    {
        return worker::all();
    }
    public function show($worker)
    {
        return worker::with('orders')->find($worker);
    }
    public function create($data)
    {
        return worker::create($data);
    }
    public function update($worker, $data)
    {
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
