<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
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
        $accountId = $request->account_id;
        try {
            // 以下だと結合されたデータを取得できない
            // $account = Account::find($accountId);
            // $todo = $account->todos();
            $todo = Todo::select('todos.*', 'accounts.name as account_name')
                ->join('accounts', 'accounts.id', '=', 'todos.account_id')
                ->where('account_id', $accountId)
                ->get();
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
        $accountId = $request->account_id;
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
        $rulus = [
            'todo.todo' => 'required',
            'todo.account_id' => 'required',
        ];

        $message = [
            'todo.todo.required' => 'Todoを入力してください',
            'todo.account_id.required' => 'ユーザーIDを入力してください',
        ];

        $validator = Validator::make($request->all(), $rulus, $message);
        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $todo = new Todo($request->input('todo'));
        $accoutsController = app()->make('App\Http\Controllers\AccoutsController');
        $accountId = $todo['account_id'];
        $result = $accoutsController->search($accountId);
        if ($result->status() !== Response::HTTP_OK) {
            return $result;
        };
        try {
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
        $rulus = [
            'todo.todo' => 'required',
            'todo.account_id' => 'required',
        ];

        $message = [
            'todo.todo.required' => 'Todoを入力してください',
            'todo.account_id.required' => 'ユーザーIDを入力してください',
        ];

        $validator = Validator::make($request->all(), $rulus, $message);
        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $request_todo = new Todo($request->input('todo'));
        $accountId = $request_todo['account_id'];

        try {
            $account = Account::find($accountId);
            $todo = $account->todos()->where('id', $id)->first();
            $todo->todo = $request_todo->todo;
            $todo->detail = $request_todo->detail;
            $todo->completed = $request_todo->completed;
            $todo->save();
            return response()->json($todo, Response::HTTP_OK);
        } catch (\Throwable $e) {
            return response()->json($e, Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * todo削除処理
     */
    public function destroy($id, Request $request)
    {
        $accountId = $request->input('account_id');
        try {
            $account = Account::find($accountId);
            $todo = $account->todos()->where('id', $id)->first();
            $result = $todo->delete();
            return response()->json($result, Response::HTTP_NO_CONTENT);
        } catch (\Throwable $e) {
            return response()->json([], Response::HTTP_BAD_REQUEST);
        }
    }
}
