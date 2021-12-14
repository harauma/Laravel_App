<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SignupController extends Controller
{
    public function index(Request $request)
    {
        // $name = $request->input('name');
        $accounts = Account::all();
        return view('signup', ['accounts' => $accounts]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'login_id' => 'required|min:4|max:255',
            'password' => 'required|min:4|max:24',
            'name' => 'required',
            'age' => 'required|numeric',
        ]);

        $account = new Account();

        $account->login_id = $request->input('login_id');
        $account->password = $request->input('password');
        $account->name = $request->input('name');
        $account->age = $request->input('age');

        $account->save();

        // return view('signup', ['accounts' => Account::all()]);
        return redirect()->route('signup');
    }

    /**
     * ログイン処理
     */
    public function login(Request $request)
    {
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
// curl -X POST -H "Content-Type: application/json" -d '{"login_id":"abcdef","pasword":"aaa","name":"hoge","age":12345}' http://homestead.test/api/accounts
// curl -X POST -H "Content-Type: application/json" -d '{"login_id":"hoge01", "password":"12345", "name":"あいうえお", "age":21}' http://homestead.test/api/accounts