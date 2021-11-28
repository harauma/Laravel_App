<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Todo;
use Illuminate\Http\Request;

/**
 * Todoに関する処理
 */
class TodosController extends Controller
{
    /**
     * todo全件取得処理
     */
    public function list(Request $request)
    {
        $accountId = $request->accountId;
        try {
            $account = Account::find($accountId);
            $todo = $account->todos();
            if ($todo->isNotEmpty()) {
                return response()->json($todo, 200);
            } else {
                return response()->json([], 204);
            }
        } catch (\Throwable $e) {
            return response()->json([], 404);
        }
    }

    /**
     * todo検索処理
     */
    public function search($id, Request $request)
    {
        $accountId = $request->accountId;
        try {
            $account = Account::find($accountId);
            $todo = $account->todos()->where('id', $id);
            if ($todo->isNotEmpty()) {
                return response()->json($todo, 200);
            } else {
                return response()->json([], 404);
            }
        } catch (\Throwable $e) {
            return response()->json([], 404);
        }
    }

    /**
     * todo作成処理
     */
    public function create(Request $request)
    {
        $todo = new Todo();
        $accoutsController = app()->make('App\Http\Controllers\AccoutsController');
        $accountId = $request->input('accountId');
        $result = $accoutsController->search($accountId);
        if ($result == '') {
            return $todo;
        }

        $todo->account_id = $accountId;
        $todo->todo = $request->input('todo');
        $todo->save();

        return $todo;
    }

    /**
     * todo更新処理
     */
    public function update($id, Request $request)
    {
        $accountId = $request->input('accountId');
        $account = Account::find($accountId);
        if (!$account) {
            return '';
        }

        $todo = $account->todos()->where('id', $id)->first();
        $todo->todo = $request->input('todo');
        $todo->save();

        return $todo;
    }

    /**
     * todo削除処理
     */
    public function destroy($id, Request $request)
    {
        $accountId = $request->input('accountId');
        $account = Account::find($accountId);
        if (!$account) {
            return '';
        }

        $todo = $account->todos()->where('id', $id)->first();
        $result = Todo::destroy($id);

        if ($result > 0) {
            return 'success!!';
        }
        return 'not found!!';
    }
}
