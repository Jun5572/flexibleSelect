<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible">
	<title>動的セレクトボックスをjavascripで実装する</title>
	<link rel="stylesheet" href="style.css">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
</head>
<body>
	<section>
		<form action="" method="post" accept-charset="utf-8">
			<div class="selectbox_wrapper">
				<label>Parent Category</label>
				<select name="parent_category" data-js="parent_category">
					<option value=0 data-js="category_option">選択してください</option>
				</select>

				<label>Child Category</label>
				<select name="child_category" data-js="child_category"></select>

				<label>Grandson Category</label>
				<select name="gson_category" data-js="gson_category"></select>

				<button type="submit" class="submit_button" value="">Save</button>
			</div>
		</form>
	</section>
	<section>
	</section>
	<script src="index.js" type="text/javascript"></script>
</body>
</html>