<?php

namespace App\Http\Controllers;

use App\Models\order;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class OrderController extends Controller
{
    use AuthorizesRequests;
    protected $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    public function index(Request $request)
    {
        $orders = $this->orderService->index($request);
        return response()->json($orders, 200);
    }

    public function show($id)
    {
        $order = $this->orderService->show($id);

        $this->authorize('view', $order);

        return response()->json($order, 200);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Order::class);

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'number' => 'required', 'regex:/^0\d{9}$/',
            'image' => 'required | image | mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'required',
            'price' => 'required|numeric|min:0',
            'workers' => 'nullable|array'
        ]);
        $order = $this->orderService->create($request, $data);
        return response()->json($order, 201);
    }

    public function update(Request $request, Order $order)
    {
        $this->authorize('update', $order);

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'number' => 'required', 'regex:/^0\d{9}$/',
            'image' => 'nullable | image | mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'required',
            'price' => 'required|numeric|min:0',
            'workers' => 'nullable|array'
        ]);

        $order = $this->orderService->update($request, $order, $data);
        return response()->json($order, 200);
    }

    public function destroy(Order $order)
    {
        $this->authorize('delete', $order);

        $order = $this->orderService->delete($order);
        return response()->json($order, 200);
    }
}
