<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Kalnoy\Nestedset\NodeTrait;

class Category extends Model
{
    use HasFactory;
    use NodeTrait;
    
    protected $fillable = [
        'name'
    ];

    public static function getTree()
    {
        $rows = self::get()->toTree();

        function getTree($items)
        {
            $array = [];

            foreach($items as $item) {
                $row = [
                    'title' => $item->name,
                    'value' => $item->id,
                ];

                if($item->children) {
                    if(count($item->children) > 0) {
                        $row['selectable'] = false;
                    }
                    $row['children'] = getTree($item->children);
                }

                $array[] = $row;
            }

            return $array;
        }

        return getTree($rows);
    }
}
