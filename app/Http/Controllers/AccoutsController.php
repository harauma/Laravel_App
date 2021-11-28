<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;
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
            if ($account->isNotEmpty()) {
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
        // $validated = $request->validate([
        // 	'login_id' => 'required|min:4|max:255',
        // 	'password' => 'required|min:4|max:24',
        // 	'name' => 'required',
        // 	'age' => 'required|numeric',
        // ]);
        // return view('signup', ['accounts' => Account::all()]);
        try {
            $account = new Account();
            $account->login_id = $request->input('login_id');
            $account->password = $request->input('password');
            $account->name = $request->input('name');
            $account->save();
            return response()->json($account, Response::HTTP_CREATED);
        } catch (\Throwable $e) {
            return response()->json($account, Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * ユーザー情報更新処理
     */
    public function update($id, Request $request)
    {
        $account = Account::find($id);

        $account->name = 'updated name';
        $account->save();

        return $account;
    }

    /**
     * ユーザー情報削除処理
     */
    public function destroy($id)
    {
        // $result = Account::where('id', $id)->delete();
        $result = Account::destroy($id);

        if ($result > 0) {
            return 'success!!';
        }
        return 'not found!!';
    }
}
