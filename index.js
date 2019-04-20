let element = '';
//それぞれ要素を取得
let category = document.querySelector('[data-js="parent_category"]');
let child_category = document.querySelector('[data-js="child_category"]');
let grandson_category = document.querySelector('[data-js="gson_category"]');


function generateOptionTags( changedSelect, targetObjectData, targetElement, attrs ){
	//parent_categoryが変更されたらgrandsonも一緒にリセット
	targetElement.innerHTML = '';
	if( targetElement === category ){
		targetElement.nextElementSibling.nextElementSibling.innerHTML = '';
	};
	element = '';
	// value値を取得し、整数に変換した後、そのvalue値をparent_idに持つオブジェクトを検索
	let selected_category_id = Number(changedSelect.value);
	let relational_object = targetObjectData.filter(function(obj){
		return obj.parent_id === selected_category_id;
	});
		console.log(relational_object);
	// value値が0のものが選択された場合の処理
	if( selected_category_id === 0 ){
		// parentカテゴリーの「選択してください」が選択されたら全てリセット
		if( changedSelect === category ){
			targetElement.nextElementSibling.nextElementSibling.innerHTML = '';
		};
		targetElement.innerHTML = '';
		element = '';
		return;
	};
	element += `<option class="${attrs.class}" data-js="${attrs.data_js}" value="${targetObjectData[0].id}">${targetObjectData[0].name}</option>`;
	for( let i=0; i<relational_object.length; i++ ){
		element += `<option class="${attrs.class}" data-js="${attrs.data_js}" value="${relational_object[i].id}">${relational_object[i].name}</option>`;
	};
	targetElement.innerHTML = element;
	element = '';
};



	$.ajax({
		url: 'data.json',
		type: 'GET',
		dataType: 'json',
		cache: false
	})
		.done(function(data){
			//dataはJSON.parseされた状態で帰ってくる
			let parent_category_data = data.category;
			let child_category_data = data.sub_category;
			let gson_category_data = data.further_subcategory;

			let option_attrs = {
								"class": "test",
								"data_js": "category_option"
			};

			//parent_categoryのoptionタグを生成
			for( let i=0; i<parent_category_data.length; i++ ){
				if( i === 0 ){ continue };
				element += `<option class="${option_attrs.class}" data-js="${option_attrs.data_js}" value="${parent_category_data[i].id}">${parent_category_data[i].name}</option>`;
			};
			category.insertAdjacentHTML( "beforeend", element);
			element = '';

			//parent_categoryがchangeしたら発火
			category.addEventListener( 'change', function(){
				generateOptionTags( category, child_category_data, child_category, option_attrs );
			});

			// child_categoryがchangeしたら発火
			child_category.addEventListener( 'change', function(){
				generateOptionTags( child_category, gson_category_data, grandson_category, option_attrs );
			});
		})
		.fail(function(){
		});

