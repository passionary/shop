<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class BasketController extends Controller
{
    public function listAction()
    {
        $items = session('basket');

        return response()->json($items);
    }

    public function add(Product $product)
    {
        $basket = session('basket') ?? [];
        $basket[] = $product;
        session(['basket' => $basket]);

        return response()->json([
            'message' => "SUCCESS",
            'basket' => session('basket'),
            'basket var' => $basket,
            "SESSION_ID" => session()->getId()
        ]);
    }
}
