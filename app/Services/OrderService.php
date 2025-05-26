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

        return $query->orderBy('id','desc')->with('workers')->paginate(3);
    }
    public function show($order)
    {
        return order::with('workers')->find($order);
    }
    public function create($request, $data)
    {
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('orders', 'public');
            $data['image'] = 'storage/' . $path;
        }

        $workers = $data['workers'];
        $dates = $data['dates'];

        unset($data['workers']);
        unset($data['dates']);

        $order = order::create($data);

        $syncData = [];
        foreach($workers as $index => $workerId){
            $syncData[$workerId] = ['date' => $dates[$index]];
        }
        $order->workers()->sync($syncData);

        return $order;
    }
    public function update($request, $order, $data)
    {
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('orders', 'public');
            $data['image'] = 'storage/' . $path;
        }

        $workers = $data['workers'];
        $dates = $data['dates'];

        unset($data['workers']);
        unset($data['dates']);

        $order->update($data);

        $syncData = [];
        foreach ($workers as $index => $workerId) {
            $syncData[$workerId] = ['date' => $dates[$index]];
        }

        $order->workers()->sync($syncData);


        return $order->fresh();
    }
    public function delete($order)
    {
        return $order->delete();
    }
}
