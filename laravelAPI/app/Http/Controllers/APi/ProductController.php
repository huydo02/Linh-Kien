<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    public function add_Product(Request $request)
    {
        if ($request) {
            $product = new Products();
            $product->name_product = $request->name_product;
            $product->id_company = $request->id_company;
            $files = [];
            if ($request->hasFile('image')) {
                foreach ($request->file('image') as $file) {
                    $name = time() . '_' . $file->getClientOriginalName();
                    $file->move('uploads/imgProducts', $name);
                    $files[] = $name;
                }
                // Lưu trữ tên tất cả các tệp tin trong cột 'image' dưới dạng chuỗi, phân cách bằng dấu phẩy hoặc ký tự phù hợp khác.
                $image_product = implode(',', $files);
                $product->image = $image_product;
            }

            $product->price = $request->price;
            $product->price_discount = $request->price_discount;
            $product->content = $request->content;
            $product->description = $request->description;

            $product->save();

            return response()->json([
                'status' => 200,
                'message' => "successfully!",
                'values' => $files,
            ]);
        }
        return response()->json([
            'error' => "Ooop! try again.",
        ]);
    }

    public function list_Product()
    {
        $viewProducts = Products::all();
        if ($viewProducts) {
            return response()->json([
                'status' => 200,
                'value' => $viewProducts,
            ]);
        }
        return response()->json([
            'status' => 404,
            'error' => "No Data Found!",
        ]);
    }

    public function edit_product($id)
    {
        if ($id) {
            $product = Products::find($id);
            $arreditProduct = array($product);
            return response()->json([
                'status' => 200,
                'value' => $arreditProduct,
            ]);
        }
        return response()->json([
            'status' => 404,
            'value' => 'No Data Found',
        ]);
    }

    public function edit_product_store(Request $request, $id)
    {
        $product = Products::find($id);
        if ($product) {
            $product->name_product = $request->input('name_product');
            $product->id_company = $request->input('id_company');
            if ($request->hasFile('image')) {
                // $arrImage = array($product->image);
                $implodeImage = explode(',', $product->image);
                foreach ($implodeImage as $key) {
                    File::delete('uploads/imgProducts/' . $key);
                }
                foreach ($request->file('image') as $file) {
                    $name = time() . '_' . $file->getClientOriginalName();
                    $file->move('uploads/imgProducts', $name);
                    $files[] = $name;
                }
                // Lưu trữ tên tất cả các tệp tin trong cột 'image' dưới dạng chuỗi, phân cách bằng dấu phẩy hoặc ký tự phù hợp khác.
                $image_product = implode(',', $files);
                $product->image = $image_product;
            }
            $product->price = $request->input('price');
            $product->price_discount = $request->input('price_discount');
            $product->content = $request->input('content');
            $product->description = $request->input('description');
            $product->save();
            return response()->json([
                'status' => 200,
                'value' => '',
            ]);
        }
    }
    public function delete_Product($id)
    {
        if ($id) {
            $productDelete = Products::find($id);
            $productDelete->delete();

            return response()->json([
                'status' => 200,
                'message' => 'Delete Product Successfully!',
            ]);
        }
        return response()->json([
            'status' => 404,
            'message' => 'Can not find Product ID.',
        ]);
    }
    public function show_product_company($company)
    {
        $product = Products::select('*')->where('id_company', $company)->get();
        if ($company) {

            return response()->json([
                'status' => 200,
                'value' => $product,
                'message' => 'oke',
            ]);
        }
    }
    public function product_detail($id)
    {
        $detail = Products::find($id);
        if ($detail) {
            $related_product = Products::where('id_company', $detail->id_company)
                ->where('id', '!=', $id) // Bỏ qua sản phẩm chi tiết hiện tại
                ->get();
            return response()->json([
                'status' => 200,
                'value' => $detail,
                'related_product' => $related_product,
            ]);
        }
    }
    // public function related_product(){

    // }
}
