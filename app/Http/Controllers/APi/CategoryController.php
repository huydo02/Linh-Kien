<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Nette\Utils\Arrays;

class CategoryController extends Controller
{
    public function store(Request $request)
    {
        if ($request) {
            $category = new Category();
            $category->namecatory = $request->nameCategory;
            $category->company = $request->company;
            if ($request->hasFile('brand')) {
                $file = $request->file('brand');
                $extension = $file->getClientOriginalExtension();
                $filename = time() . '.' . $extension;
                $file->move('uploads/imageBrand', $filename);
                $category->brand = 'uploads/imageBrand/' . $filename;
            }
            $category->description   = $request->description;
            $category->save();
            return response()->json([
                'status' => 200,
                'message' => 'Add Category Successfully!',
            ]);
        }
        return response()->json([

            'message' => 'Error, try again!',
        ]);
    }
    public function list_category()
    {
        $category = Category::all();
        $arrCategory = array($category);
        return Response()->json([
            'status' => 200,
            'category' => $arrCategory,
        ]);
    }
    public function list_category_home()
    {
        $category = Category::all();
        $arrCategory = array($category);
        return Response()->json([
            'status' => 200,
            'category' => $arrCategory,
        ]);
    }
    public function update_category($id)
    {
        if ($id) {
            $edit = Category::find($id);
            $arreditCategory = array($edit);

            return response()->json([
                'status' => 200,
                'value' => $arreditCategory,
            ]);
        }
    }
    public function edit($id, Request $request)
    {
        if ($request) {
            $category = Category::find($id);
            $category->namecatory = $request->input('nameCategory');
            $category->company = $request->input('company');
            //check old file on column brand
            // $destination = $category->brand;

            if ($request->hasFile('brand')) {
                File::delete($category->brand);
                // return response()->json([
                //     'status' => 200,
                //     'message' => $category->brand,
                // ]);
                // $string = "uploads/imageBrand/1702021023.jpg";

                $file = $request->file('brand');
                $extension = $file->getClientOriginalExtension();
                $filename = time() . '.' . $extension;
                $file->move('uploads/imageBrand', $filename);
                $category->brand = 'uploads/imageBrand/' . $filename;
            }
            // $category->brand = $request->input('brand');
            $category->description = $request->input('description');
            $category->save();
            return response()->json([
                'status' => 200,
                'value' => 'Edit category successfully!',
            ]);
        }
        return response()->json([
            'status' => 404,
            'value' => 'No ID category found',
        ]);
    }
    public function delete($id)
    {

        $category = Category::find($id);
        if ($category) {
            $category->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Delete successfully!',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No ID category found!',
            ]);
        }
    }
}
