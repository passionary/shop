<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function get(Product $product, Request $request)
    {
        return response()->json($product);
    }
    public function edit(Product $product = null, Request $request)
    {
        $message = 'Товар создан успешно';

        if(isset($product->id)) {
            $message = 'Товар редактирован успешно';
            $product->update($request->all());
        }
        else {
            Product::create($request->all());
        }

        return response()->json([
            'message' => $message
        ]);
    }
}