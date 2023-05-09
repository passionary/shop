<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;

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

        User::firstOrCreate([
            'name' => 'admin',
            'email' => 'admin@mail.ru',
        ], [
            'password' => bcrypt('password')
        ]);
        if (!Category::where('name', 'Devices')->exists()) {
            Category::create([
                'name' => 'Devices',
                'children' => [
                    ['name' => 'Phones'],
                    ['name' => 'Tablets'],
                    ['name' => 'Laptops'],
                ]
            ]);
        }
        if (!Category::where('name', 'Food')->exists()) {
            Category::create([
                'name' => 'Food',
                'children' => [
                    ['name' => 'Hot'],
                    ['name' => 'Cold'],
                ]
            ]);
        }

        if (!Category::where('name', 'Other')->exists()) {
            Category::create([
                'name' => 'Other'
            ]);
        }

        $phones = Category::where('name', 'Phones')->first()->id;
        Product::firstOrCreate([
            'name' => 'Samsung',
            'price' => '100000',
            'parent_id' => $phones
        ]);
        Product::firstOrCreate([
            'name' => 'Apple',
            'price' => '1000000',
            'parent_id' => $phones
        ]);
        $tablets = Category::where('name', 'Tablets')->first()->id;

        Product::firstOrCreate([
            'name' => 'Samsung Galaxy Tab',
            'price' => '50000',
            'parent_id' => $tablets
        ]);
        $laptops = Category::where('name', 'Laptops')->first()->id;

        Product::firstOrCreate([
            'name' => 'ASUS',
            'price' => '1210000',
            'parent_id' => $laptops
        ]);

        Product::firstOrCreate([
            'name' => 'Lenovo',
            'price' => '300000',
            'parent_id' => $laptops
        ]);
        $hot_food = Category::where('name', 'Hot')->first()->id;
        $cold_food = Category::where('name', 'Cold')->first()->id;

        Product::firstOrCreate([
            'name' => 'Лагман',
            'price' => '1000',
            'parent_id' => $hot_food
        ]);
        Product::firstOrCreate([
            'name' => 'Суп',
            'price' => '500',
            'parent_id' => $hot_food
        ]);

        Product::firstOrCreate([
            'name' => 'Окрошка',
            'price' => '2000',
            'parent_id' => $cold_food
        ]);

        Product::firstOrCreate([
            'name' => 'Холодец',
            'price' => '3000',
            'parent_id' => $cold_food
        ]);
        $other = Category::where('name', 'Other')->first()->id;

        Product::firstOrCreate([
            'name' => 'Посуда',
            'price' => '20000',
            'parent_id' => $other
        ]);
    }
}
