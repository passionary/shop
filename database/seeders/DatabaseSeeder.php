<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Product;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        Category::create([
            'name' => 'Devices',
            'children' => [
                ['name' => 'Phones'],
                ['name' => 'Tablets'],
                ['name' => 'Laptops'],
            ]
        ]);
        Category::create([
            'name' => 'Food',
            'children' => [
                ['name' => 'Hot'],
                ['name' => 'Cold'],
            ]
        ]);
        Category::create([
            'name' => 'Other'
        ]);
        $phones = Category::where('name', 'Phones')->first()->id;
        Product::create([
            'name' => 'Samsung',
            'price' => '100000',
            'parent_id' => $phones
        ]);
        Product::create([
            'name' => 'Apple',
            'price' => '1000000',
            'parent_id' => $phones
        ]);
        $tablets = Category::where('name', 'Tablets')->first()->id;

        Product::create([
            'name' => 'Samsung Galaxy Tab',
            'price' => '50000',
            'parent_id' => $tablets
        ]);
        $laptops = Category::where('name', 'Laptops')->first()->id;


        Product::create([
            'name' => 'ASUS',
            'price' => '1210000',
            'parent_id' => $laptops
        ]);

        Product::create([
            'name' => 'Lenovo',
            'price' => '300000',
            'parent_id' => $laptops
        ]);
        $hot_food = Category::where('name', 'Hot')->first()->id;
        $cold_food = Category::where('name', 'Cold')->first()->id;

        Product::create([
            'name' => 'Лагман',
            'price' => '1000',
            'parent_id' => $hot_food
        ]);
        Product::create([
            'name' => 'Суп',
            'price' => '500',
            'parent_id' => $hot_food
        ]);

        Product::create([
            'name' => 'Окрошка',
            'price' => '2000',
            'parent_id' => $cold_food
        ]);

        Product::create([
            'name' => 'Холодец',
            'price' => '3000',
            'parent_id' => $cold_food
        ]);
        $other = Category::where('name', 'Other')->first()->id;
        
        Product::create([
            'name' => 'Посуда',
            'price' => '20000',
            'parent_id' => $other
        ]);
    }
}
