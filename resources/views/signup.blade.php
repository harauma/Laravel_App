<!DOCTYPE html>
<html lang="ja">

<head>
	<meta charset="utf-8">
	<title>
		サインアップaaaa
	</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/dark.css">
</head>

<body>
	<h1>サインアップ画面</h1>
	<h2>アカウント登録</h2>
	@if ($errors->any())
	<div class="alert alert-danger">
		@foreach ($errors->all() as $error)
		<li>{{ $error }}</li>
		@endforeach
	</div>
	@endif
	<form method="POST">
		@csrf
		<label for="">ログインID：</label>
		<input type="text" name="login_id" value="{{ old("login_id") }}" /><br />
		<label for="">パスワード：</label>
		<input type="password" name="password" value="{{ old("password") }}" /><br />
		<label for="">氏名：</label>
		<input type="text" name="name" value="{{ old("name") }}" /><br />
		<label for="">年齢：</label>
		<input type="number" name="age" value="{{ old("age") }}" /><br />
		<button type="submit">登録</button>
	</form>
	<hr />
	<h2>アカウント情報</h2>
	<table border="1">
		<tr>
			<th>ID</th>
			<th>ログインID</th>
			<th>パスワード</th>
			<th>名前</th>
			<th>年齢</th>
		</tr>
		@foreach ($accounts as $account)
		<tr>
			<td>{{ $account->id }}</td>
			<td>{{ $account->login_id }}</td>
			<td>{{ $account->password }}</td>
			<td>{{ $account->name }}</td>
			<td>{{ $account->age }}</td>
		</tr>
		@endforeach
		<!-- <tr>
            <td>1</td>
            <td>hoge01</td>
            <td>12345</td>
            <td>さんぷる太郎</td>
            <td>20</td>
        </tr>
        <tr>
            <td>2</td>
            <td>hoge02</td>
            <td>67890</td>
            <td>しすてな次郎</td>
            <td>29</td>
        </tr>
        <tr>
            <td>3</td>
            <td>hoge03</td>
            <td>10293</td>
            <td>てすと三郎</td>
            <td>25</td>
        </tr> -->
	</table>
</body>

</html>