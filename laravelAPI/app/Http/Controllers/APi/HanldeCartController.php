<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\card;
use App\Models\waiting;
use Illuminate\Http\Request;

class HanldeCartController extends Controller
{
    public function show_history_cart()
    {
        if (auth()->user()) {
            $listHistory = waiting::select('*')->where('username', auth()->user()->id)->get();
            return response()->json([
                'status' => 200,
                'value' => $listHistory,
            ]);
        }
        return response()->json([
            'status' => 200,
            'message' => '',
        ]);
    }
    public function addHistory_cart(Request $request)
    {
        if ($request) {
            if (auth()->user()) {
                $addhtrcart = new waiting();
                $addhtrcart->username = auth()->user()->id;
                $addhtrcart->quantity = $request->quantity_purchased;
                $addhtrcart->totalPrice = $request->total;
                $addhtrcart->status = 'Processing';
                $addhtrcart->save();
                $deleteCart = card::where('name_user', auth()->user()->id);
                $deleteCart->delete();
                return response()->json([
                    'status' => 200,
                    'value' => $request->total,
                    'message' => 'Checkout successfully, you can check your cart in your history',
                ]);
            }
            return response()->json([
                'status' => 200,
                'value' => '',
            ]);
        }
        return response()->json([
            'status' => 405,
            'message' => 'cannot find your history cart! please try again.',
        ]);
    }
    public function show_cart_bought()
    {
        $show = waiting::all();
        return response()->json([
            'status' => 200,
            'value' => $show,
        ]);
    }
    public function acceptCart($id)
    {
        if ($id) {
            $accept = waiting::find($id);
            $accept->status = 'Accepted';
            $accept->save();
            return response()->json([
                'status' => 200,
                'value' => $accept,
            ]);
        }
    }
    public function dis_acceptCart($id)
    {
        if ($id) {
            $disaccept = waiting::find($id);
            $disaccept->status = 'Disaccept';
            $disaccept->save();
            return response()->json([
                'status' => 200,
                'value' => $disaccept,
            ]);
        }
    }
}
