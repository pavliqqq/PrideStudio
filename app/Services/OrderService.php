<?php

namespace App\Services;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderService
{
    public function index(Request $request)
    {
        $query = Order::query();

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->has('number') && $request->number !== '') {
            $query->where('number', $request->number);
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
    public function update($request, $order, $data)
    {
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('orders', 'public');
            $data['image'] = 'storage/' . $path;
        }

        $workers = $data['workers'];
        unset($data['workers']);

        $order->update($data);
        $order->workers()->sync($workers);

        return $order->fresh();
    }
    public function delete($order)
    {
        return $order->delete();
    }
}
