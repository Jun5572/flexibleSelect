let element = '';
let selected_data = {
						"category": "",
						"child_category": "",
						"gson_category": ""
					};
//それぞれ要素を取得
let category = document.querySelector('[data-js="parent_category"]');
let category_wrapper = document.getElementById('category_wrapper');

let child_category = document.querySelector('[data-js="child_category"]');
let child_category_wrapper = document.getElementById('child_category_wrapper');

let grandson_category = document.querySelector('[data-js="gson_category"]');
let grandson_category_wrapper = document.getElementById('gson_category_wrapper');

let button = document.getElementById('button');
let disp_results = document.getElementsByClassName('show_select_contents');



function generateOptionTags( changedSelect, targetObjectData, targetElement, attrs ){
	element = '';
	targetElement.innerHTML = '';

	//parent_categoryが変更されたらgrandsonも一緒にリセット
	if( changedSelect === category ){
		category_wrapper.nextElementSibling.nextElementSibling.lastElementChild.innerHTML = '';
		category_wrapper.nextElementSibling.nextElementSibling.lastElementChild.setAttribute('disabled', true);
	};

	// value値を取得し、整数に変換した後、そのvalue値をparent_idに持つオブジェクトを検索
	let selected_category_id = Number( changedSelect.value );
	let relational_object = targetObjectData.filter(function(obj){
		return obj.parent_id === selected_category_id;
	});

	// value値が0のものが選択された場合の処理
	if( selected_category_id === 0 ){
		targetElement.innerHTML = '';
		targetElement.disabled = true;
		element = '';
		return;
	};
	element += `<option class="${attrs.class}" data-js="${attrs.data_js}" value="${targetObjectData[0].id}">${targetObjectData[0].name}</option>`;
	for( let i=0; i<relational_object.length; i++ ){
		element += `<option class="${attrs.class}" data-js="${attrs.data_js}" value="${relational_object[i].id}">${relational_object[i].name}</option>`;
	};
	targetElement.disabled = false;
	targetElement.innerHTML = element;
	element = '';

//選択されたカテゴリーを格納
	switch (changedSelect){
		case category:
			selected_data.category = changedSelect[changedSelect.selectedIndex].text;
		break;
		case child_category:
			selected_data.child_category = changedSelect[changedSelect.selectedIndex].text;
		break;
	};
};

//ボタンが押されたときの処理
button.addEventListener('click', function(){
	let parent = document.querySelector('[data-js="show_parent_contents"]');
	let child = document.querySelector('[data-js="show_child_contents"]');
	let grandson = document.querySelector('[data-js="show_gson_contents"]');
	// 一つでもundefinedがあった場合は処理ボタン押しても処理走らない
	if( selected_data.category !== '' ){
		parent.innerHTML = `Parent: ${selected_data.category}`;
		child.innerHTML = `Child: ${selected_data.child_category}`;
		grandson.innerHTML = `Grandson: ${selected_data.gson_category}`;
	} else if( typeof parent.innerHTML === undefined ){
		parent.innerHTML = `Parent: `;
		child.innerHTML = `Child: `;
		grandson.innerHTML = `Grandson: `;
	};
	selected_data = {};
});

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
						"class": "category_option",
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

	// gson_categoryがchangeしたとき
	grandson_category.addEventListener('change', function(){
		selected_data.gson_category = grandson_category[grandson_category.selectedIndex].text;
	});
})
.fail(function(){
});

