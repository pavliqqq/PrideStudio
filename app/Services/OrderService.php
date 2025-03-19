<?php

namespace App\Services;

use App\Models\Order;

class OrderService
{
    public function index($status = null)
    {
        $query = Order::query();

        if ($status && $status !== 'all') {
            $query->where('status', $status);
        }

        return $query->with('workers')->get();
    }
    public function show($order)
    {
        return order::with('workers')->find($order);
    }
    public function create($data)
    {
        return order::create($data);
    }
    public function update($order, $data)
    {
        $order->update($data);

        return $order->fresh();
    }
    public function delete($order)
    {
        return $order->delete();
    }
}
