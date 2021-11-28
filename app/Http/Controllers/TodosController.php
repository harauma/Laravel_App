<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Todo;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

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
                return response()->json($todo, Response::HTTP_OK);
            } else {
                return response()->json([], Response::HTTP_NO_CONTENT);
            }
        } catch (\Throwable $e) {
            return response()->json([], Response::HTTP_NOT_FOUND);
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
                return response()->json($todo, Response::HTTP_OK);
            } else {
                return response()->json([], Response::HTTP_NOT_FOUND);
            }
        } catch (\Throwable $e) {
            return response()->json([], Response::HTTP_NOT_FOUND);
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
        try {
            $todo->account_id = $accountId;
            $todo->todo = $request->input('todo');
            $todo->save();
            return response()->json($todo, Response::HTTP_CREATED);
        } catch (\Throwable $e) {
            return response()->json($todo, Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * todo更新処理
     */
    public function update($id, Request $request)
    {
        $accountId = $request->input('accountId');
        try {
            $account = Account::find($accountId);
            $todo = $account->todos()->where('id', $id)->first();
            $todo->todo = $request->input('todo');
            $todo->save();
            return response()->json($todo, Response::HTTP_OK);
        } catch (\Throwable $e) {
            return response()->json([], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * todo削除処理
     */
    public function destroy($id, Request $request)
    {
        $accountId = $request->input('accountId');
        try {
            $account = Account::find($accountId);
            $todo = $account->todos()->where('id', $id)->first();
            $result = Todo::destroy($id);
            return response()->json($result, Response::HTTP_NO_CONTENT);
        } catch (\Throwable $e) {
            return response()->json([], Response::HTTP_BAD_REQUEST);
        }
    }
}
