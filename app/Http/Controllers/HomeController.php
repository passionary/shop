<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $items = Order::with('orderItems.product')->get();
        $array = [];

        foreach($items as $item) {
            $total = 0;
            $orderItems = [];

            foreach($item->orderItems as $orderItem) {
                $total += $orderItem->product->price * $orderItem->quantity;
                $orderItems[] = [
                    'product' => [
                        'name' => $orderItem->product->name
                    ],
                    'quantity' => $orderItem->quantity
                ];
            }

            $array[] = [
                'id' => $item->id,
                'name' => $item->name,
                'phone' => $item->phone,
                'email' => $item->email,
                'address' => $item->address,
                'orderItems' => $orderItems,
                'total' => $total,
                'date' => $item->created_at
            ];
        }

        return view('home', [
            'items' => $array
        ]);
    }
}
