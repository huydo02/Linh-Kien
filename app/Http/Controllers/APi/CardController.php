<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\card;
use App\Models\Products;
use App\Models\User;
use Illuminate\Http\Request;

class CardController extends Controller
{
    public function list_cards(Request $request)
    {
        if (auth()->user()) {
            $product = Products::find($request->id);

            if ($product) {
                $card_table = new card();
                $card_table->name_user = auth()->user()->id;
                $card_table->name_auth = auth()->user()->name;
                $card_table->name_card = $product->name_product;
                $card_table->name_company_card = $product->id_company;
                $card_table->brand_card = $product->image;
                $card_table->quantity = $request->quantity;
                $card_table->price = $request->quantity * $product->price_discount;

                $card_table->save();

                return response()->json([
                    'status' => 200,
                    'message' => 'success',
                    'value' => $request->id,
                    'quatity' => $request->quantity,
                ]);
            }
        }
        return response()->json([

            'message' => 'You are not logged in',
        ]);
    }
    public function cart_quantity()
    {
        if (auth()->user()) {
            $quantity = card::where('name_user', auth()->user()->id)->count();
            //hàm find là tìm kiếm theo khoá chính
            if ($quantity) {
                return response()->json([
                    'status' => 200,
                    'quantity' => $quantity,
                ]);
            }
            return response()->json([
                // 'status' => 200,
                'message' => 'error',
                'quantity' => 0,
            ]);
        }
    }
    public function numcart()
    {
        // $numCart = card::where('name_auth', $name)->get();
        if (auth()->user()) {
            $numCart = card::where('name_user', auth()->user()->id)->get();
            if ($numCart) {
                return response()->json([
                    'status' => 200,
                    'value' => $numCart,
                ]);
            }
        }
        return response()->json([
            'status' => 401,
            'message' => 'You are not logged in',
        ]);
    }
    public function deleteCart($id)
    {
        if ($id) {
            $cartDelete = card::find($id);
            $cartDelete->delete();

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
}
