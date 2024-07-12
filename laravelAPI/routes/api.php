<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\APi\AuthController;
use App\Http\Controllers\API\CardController;
use App\Http\Controllers\APi\CategoryController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\HanldeCartController;


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum', 'isAdmin'])->group(function () {
    Route::get('/checkingAuthenticated', function () {
        return response()->json([
            'message' => 'you are authenticated',
            'status' => '200',
        ], 200);
    });
    // ----------------------------- API controller Category---------------------------------------------------
    Route::post('category', [CategoryController::class, 'store']);
    Route::get('list-category', [CategoryController::class, 'list_category']);
    Route::get('edit-category/{id}', [CategoryController::class, 'update_category']);
    Route::post('edit-category-store/{id}', [CategoryController::class, 'edit']);
    Route::get('delete-category/{id}', [CategoryController::class, 'delete']);

    // ----------------------------- API controller Product----------------------------------------------------
    Route::post('add-product', [ProductController::class, 'add_Product']);
    Route::get('list-product', [ProductController::class, 'list_Product']);
    Route::get('edit-product/{id}', [ProductController::class, 'edit_product']);
    Route::post('edit-product-store/{id}', [ProductController::class, 'edit_product_store']);
    Route::get('delete-product/{id}', [ProductController::class, 'delete_Product']);
    // ----------------------------- API controller Cart----------------------------------------------------
    Route::get('list-bought', [HanldeCartController::class, 'show_cart_bought']);
    Route::get('accept-cart/{id}', [HanldeCartController::class, 'acceptCart']);
    Route::get('disaccept-cart/{id}', [HanldeCartController::class, 'dis_acceptCart']);
});

Route::middleware(['auth:sanctum',])->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);

    Route::get('quantity-cart', [CardController::class, 'cart_quantity']);
    Route::get('num-cart', [CardController::class, 'numcart']);
    Route::get('delete-cart/{id}', [CardController::class, 'deleteCart']);
    // Route::get('list-category', [CategoryController::class, 'list_category']);
    //xử lý đơn hàng
    Route::post('add-history-cart', [HanldeCartController::class, 'addHistory_cart']);
    Route::get('show-historycart', [HanldeCartController::class, 'show_history_cart']);
    Route::post('list-card', [CardController::class, 'list_cards']);


    // Route::get('related-product', [ProductController::class, 'related_product']);
});

Route::get('product-detail/{id}', [ProductController::class, 'product_detail']);

Route::get('list-products/{company}', [ProductController::class, 'show_product_company']);

Route::get('list-category-home', [CategoryController::class, 'list_category_home']);

Route::middleware('auth:sanctum', 'isAdmin')->get('/user', function (Request $request) {
    return $request->user();
});
