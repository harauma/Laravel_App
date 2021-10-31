<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;
use Nette\Utils\Json;

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

	public function list()
	{
		$accounts = Account::all();
		return $accounts;
		// return Json::encode($accounts);
	}

	public function search($id)
	{
		$account = Account::find($id);

		if ($account) {
			return $account;
		}
		return '存在しないです！！';
		// return Json::encode($accounts);
	}

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

	public function update($id, Request $request)
	{
		$account = Account::find($id);

		$account->name = 'updated name';
		$account->save();

		return $account;
	}

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
// curl -X POST -H "Content-Type: application/json" -d '{"login_id":"abcdef","pasword":"aaa","name":"hoge","age":12345}' http://homestead.test/api/accounts
// curl -X POST -H "Content-Type: application/json" -d '{"login_id":"hoge01", "password":"12345", "name":"あいうえお", "age":21}' http://homestead.test/api/accounts