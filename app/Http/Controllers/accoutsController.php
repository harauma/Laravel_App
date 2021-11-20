<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;

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
        $accounts = Account::all();
        return $accounts;
    }

    /**
     * ユーザー情報検索処理
     */
    public function search($id)
    {
        $account = Account::find($id);

        if ($account) {
            return $account;
        }
        return '存在しないです！！';
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

        $account = new Account();

        $account->login_id = $request->input('login_id');
        $account->password = $request->input('password');
        $account->name = $request->input('name');
        $account->age = $request->input('age');

        $account->save();

        // return view('signup', ['accounts' => Account::all()]);
        return $account;
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
