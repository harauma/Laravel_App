<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class SignupController extends Controller
{

    /**
     * ログイン処理
     */
    public function login(Request $request)
    {
        $rulus = [
            'login_id' => 'required',
            'password' => 'required',
        ];

        $message = [
            'login_id.required' => 'ユーザーIDを入力してください',
            'password.required' => 'パスワードを入力してください',
        ];

        $validator = Validator::make($request->all(), $rulus, $message);
        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $loginId = $request->input('login_id');
        $password = $request->input('password');
        try {
            $account = Account::where('login_id', $loginId)->first();
            if (Hash::check($password, $account->password)) {
                $responseData = [
                    'id' => $account->id,
                    'name' => $account->name,
                ];
                return response()->json($responseData, Response::HTTP_OK);
            }
            $responseData = [
                'message' => 'ログインに失敗しました。',
            ];
            return response()->json($responseData, Response::HTTP_BAD_REQUEST);
        } catch (\Throwable $e) {
            return response()->json($e, Response::HTTP_BAD_REQUEST);
        }
    }
}
