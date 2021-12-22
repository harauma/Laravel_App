<!DOCTYPE html>
<html lang="ja">

<head>
	<meta charset="utf-8">
	<title>
		タグ設定
	</title>
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.js"></script>
</head>

<body>
	<header>
		<div class="ui menu">
			<div class="header item">
				<a href="home">Todo管理アプリ</a>
			</div>
		</div>
	</header>
	<main>
		<div class="ui container">
			<h1>タグ設定画面</h1>
			<a href="home">Todo一覧に戻る</a>
			<h2>タグ登録</h2>
			@if ($errors->any())
			<div class="alert alert-danger">
				@foreach ($errors->all() as $error)
				<li>{{ $error }}</li>
				@endforeach
			</div>
			@endif
			<div class="form">
				<form method="POST" class="ui form">
					@csrf
					<div class="field">
						<label>タグ名</label>
						<input type="hidden" id="user_name" name="user_name" value="{{ old("user_name") }}" />
						<input type="text" name="tag_name" value="{{ old("tag_name") }}" /><br />
					</div>
					<button class="ui teal button" type="submit">登録</button>
				</form>
			</div>
			<h2>タグ情報</h2>
			<table class="ui celled striped table">
				<tr>
					<th>タグ名</th>
					<th>作成者</th>
					<th></th>
				</tr>
				@foreach ($tags as $tag)
				<form method="POST" action="{{ url('/tag-setting',$tag->id) }}">
					@method('DELETE')
					@csrf
					<tr>
						<td>{{ $tag->tag_name }}</td>
						<td>{{ $tag->create_user_name }}</td>
						<td><button class="mini ui red button" type="delete">削除</button></td>
					</tr>
				</form>
				@endforeach
			</table>
		</div>
	</main>
	<footer></footer>
	<script>
		console.log(sessionStorage);
		if (sessionStorage.user_name) {
			document.getElementById("user_name").value = sessionStorage.user_name;
		} else {
			window.Location("login");
		}

		function onClickDelete(id) {
			console.log(id);
			// fetch()
		}
	</script>
	<style>
	</style>
</body>

</html>