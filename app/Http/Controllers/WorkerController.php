<?php

namespace App\Http\Controllers;

use App\Models\worker;
use App\Services\WorkerService;
use Illuminate\Http\Request;

class WorkerController extends Controller
{
    protected $workerService;

    public function __construct(WorkerService $workerService)
    {
        $this->workerService = $workerService;
    }

    public function getAll()
    {
        $workers = $this->workerService->getAll();
        return response()->json($workers, 200);
    }

    public function index()
    {
        $workers = $this->workerService->index();
        return response()->json($workers, 200);
    }

    public function show($id)
    {
        $worker = $this->workerService->show($id);
        return response()->json($worker, 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'full_name' => 'required|string|max:255',
            'image' => 'required | image | mimes:jpeg,png,jpg,gif|max:2048',
            'post' => 'required|string|max:255',
            'password' => 'required'
        ]);
        $worker = $this->workerService->create($request, $data);

        return response()->json($worker, 201);

    }

    public function update(Request $request, Worker $worker)
    {
        $data = $request->validate([
            'full_name' => 'required|string|max:255',
            'image' => 'nullable | image | mimes:jpeg,png,jpg,gif|max:2048',
            'post' => 'required|string|max:255',
            'password'=>'required'
        ]);
        $worker = $this->workerService->update($request, $worker, $data);
        return response()->json($worker, 200);
    }

    public function destroy(Worker $worker)
    {
        $worker = $this->workerService->delete($worker);
        return response()->json($worker, 200);
    }
}
