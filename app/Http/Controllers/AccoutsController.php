<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

/**
 * ユーザー情報に関する処理
 */
class AccoutsController extends Controller
{

    /**
     * ユーザー情報全件取得処理
     */
    public function list()
    {
        try {
            $accounts = Account::all();
            if ($accounts->isNotEmpty()) {
                return response()->json($accounts, Response::HTTP_OK);
            } else {
                return response()->json([], Response::HTTP_NO_CONTENT);
            }
        } catch (\Throwable $e) {
            return response()->json([], Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * ユーザー情報検索処理
     */
    public function search($id)
    {
        try {
            $account = Account::find($id);
            if ($account) {
                return response()->json($account, Response::HTTP_OK);
            } else {
                return response()->json([], Response::HTTP_NOT_FOUND);
            }
        } catch (\Throwable $e) {
            return response()->json([], Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * ユーザー情報作成処理
     */
    public function create(Request $request)
    {
        $rulus = [
            'login_id' => 'required|max:32|unique:accounts',
            'password' => 'required',
            'name' => 'required',
        ];

        $message = [
            'login_id.required' => 'ユーザーIDを入力してください',
            'login_id.unique' => 'このユーザーIDは使用できません',
            'login_id.max' => 'ユーザーIDは最大:max文字です',
            'password.required' => 'パスワードを入力してください',
            'name.required' => 'ユーザー名を入力してください',
        ];

        $validator = Validator::make($request->all(), $rulus, $message);
        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        try {
            $account = new Account();
            $account->login_id = $request->input('login_id');
            $account->password = $request->input('password');
            $account->name = $request->input('name');
            $account->save();
            return response()->json($account, Response::HTTP_CREATED);
        } catch (\Throwable $e) {
            return response()->json($e, Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * ユーザー情報更新処理
     */
    public function update($id, Request $request)
    {
        $rulus = [
            'login_id' => 'required|max:32',
            'password' => 'required',
            'name' => 'required',
        ];

        $message = [
            'login_id.required' => 'ユーザーIDを入力してください',
            'login_id.max' => 'ユーザーIDは最大:max文字です',
            'password.required' => 'パスワードを入力してください',
            'name.required' => 'ユーザー名を入力してください',
        ];

        $validator = Validator::make($request->all(), $rulus, $message);
        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        try {
            $account = Account::find($id);
            $account->login_id = $request->input('login_id');
            $account->password = $request->input('password');
            $account->name = $request->input('name');
            $account->save();
            return response()->json($account, Response::HTTP_OK);
        } catch (\Throwable $e) {
            return response()->json([], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * ユーザー情報削除処理
     */
    public function destroy($id)
    {
        // $result = Account::where('id', $id)->delete();
        try {
            $result = Account::destroy($id);
            return response()->json($result, Response::HTTP_NO_CONTENT);
        } catch (\Throwable $e) {
            return response()->json([], Response::HTTP_BAD_REQUEST);
        }
    }
}
