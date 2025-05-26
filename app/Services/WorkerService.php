<?php

namespace App\Services;

use App\Models\Order;
use App\Models\worker;
use Carbon\Carbon;
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

    public function showOrders($id)
    {
        $worker = Worker::with('orders')->find($id);

        if (!$worker) {
            return ['error' => 'Worker not found'];
        }

        $orders = $worker->orders()->orderBy('id','desc')->paginate(10);

        return [
            'worker' => $worker,
            'orders' => $orders,
        ];
    }

    public function weekTasks($worker){
        $worker = worker::with('orders')->find($worker);;

        $startDate = now()->startOfDay();
        $endDate = now()->addDays(6)->endOfDay();

        return $worker
            ->orders()
            ->withPivot('date')
            ->whereBetween('order_worker.date',[$startDate,$endDate])
            ->orderBy('order_worker.date')
            ->get()
            ->groupBy(function ($order) {
                return Carbon::parse($order->pivot->date)->format('Y-m-d');
            });
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
