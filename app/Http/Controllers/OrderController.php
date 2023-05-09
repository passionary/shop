<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    public function listAction()
    {
        $items = Order::with('orderItems.product')->get();

        return response()->json($items);
    }
    public function create(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'name' => "required",
            'phone' => "required",
            'email' => "required",
            'address' => "required",
            'products' => "required",
        ]);
        $response = [];
        
        if($validator->fails()) {
            foreach($validator->errors()->messages() as $key => $value) {
                $response['errors'][] = $value;
            }
        }
        else {
            $response['message'] = 'Заказ создан успешно';
            $array = [];
            $order = Order::create($request->all());
            $products = $request->input('products');

            foreach($products as $item) {
                $item = json_decode($item);

                $array[] = [
                    'order_id' => $order->id,
                    'product_id' => $item->id,
                    'quantity' => $item->quantity
                ];
            }

            \DB::table('order_items')->insert($array);
        }

        return response()->json($response);
    }
}
