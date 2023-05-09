<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function listAction()
    {
        $items = Product::with('category')->get();

        return response()->json($items);
    }
    public function getProducts(Request $request)
    {
        $items = Product::with('category')->whereIn('id', $request->input('products'))->get();

        return response()->json($items);
    }
    public function get(Product $product, Request $request)
    {
        return response()->json($product);
    }
    public function delete(Product $product)
    {
        $product->delete();

        return response()->json([
            'message' => 'Товар удален успешно!'
        ]);
    }
    public function edit(Product $product = null, Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'parent_id' => "required",
            'name' => "required|unique:products",
            'price' => "required",
        ]);
        $response = [];

        if($validator->fails()) {
            foreach($validator->errors()->messages() as $key => $value) {
                $response['errors'][] = $value;
            }
        }
        else {
            $response['message'] = 'Товар создан успешно';

            if(isset($product->id)) {
                $response['message'] = 'Товар редактирован успешно';
                $product->update($request->all());
            }
            else {
                Product::create($request->all());
            }
        }

        return response()->json($response);
    }
}
