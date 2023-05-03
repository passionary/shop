<?php

namespace App\Http\Controllers;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function listAction()
    {
        $items = Category::get()->toTree();

        return response()->json([
            'items' => $items
        ]);
    }
    public function tree()
    {
        $items = Category::getTree();

        return response()->json([
            'items' => $items
        ]);
    }
    public function addAction(Category $category = null, Request $request)
    {
        if(isset($category->id)) {
            return Category::create([
                'name' => $request->input('name')
            ], $category);
        }

        return Category::create([
            'name' => $request->input('name')
        ]);
    }
    public function deleteAction(Category $category)
    {
        $category->delete();

        return response()->json([
            'message' => 'Категория удалена успешно!'
        ]);
    }

    public function filter(Category $category)
    {
        $tree = $category->descendants()->get()->pluck('id')->toArray();
        $tree[] = $category->id;
        $products = Product::with('category')->whereIn('parent_id', $tree)->get();

        return response()->json($products);
    }
}
