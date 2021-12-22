<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;
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
            if ($account->password !== $password) {
                $responseData = [
                    'login_id' => $loginId,
                    'password' => $password,
                ];
                return response()->json($responseData, Response::HTTP_BAD_REQUEST);
            }
            return response()->json($account, Response::HTTP_OK);
        } catch (\Throwable $e) {
            return response()->json($e, Response::HTTP_BAD_REQUEST);
        }
    }
}