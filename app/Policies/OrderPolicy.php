<?php

namespace App\Policies;

use App\Models\Order;
use App\Models\worker;
use Illuminate\Auth\Access\Response;

class OrderPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(worker $worker)
    {
        return true;
    }

    public function view(Worker $worker)
    {
        return true;
    }


   public function create(worker $worker){
       return $worker->role === 'admin';
   }

    public function update(worker $worker, order $order){
        return $worker->role === 'admin';
    }

    public function delete(worker $worker, order $order){
        return $worker->role === 'admin';
    }
}
