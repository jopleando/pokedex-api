
$("#btn-search").click(function(e){
	e.preventDefault(e)
	var pokemon = $("#pokemon-search-input").val(); // te da el resultado de lo que escribes
	var url= 'http://pokeapi.co/api/v2/pokemon/' + pokemon;
	request(url, 'load-pokemon', " ");
});

function request (url, action){
		$.ajax({
			url: url,
			type: "GET",
			dataType: "JSON",
			success : function(response){
					if(action==='load-pokemon'){
					loadPokemon(response)
								} 

					if(action==='filter-pokemon'){
					filterPokemon(response)

							}
						}
					})	
}

function loadPokemon (response){
	var response=response;
	console.log(response)

	var html="";
	html+= '<div class= "col-md-12">' +
							'<h2>' +  response.name + '</h2>' +
							'<img src="' + response.sprites.front_shiny + '" alt="pokemon-img">'+
						'<div class="description"><span>Type: </span>';

		for (var i=0; i<response.types.length; i++){
			html+=response.types[i].type.name;
		}

		html+= '<span> Weight:' + response.weight + '</span>'  +
						'<span> Height:' + response.height + '</span>' +
						// enlace para abrir modal para evolutions
							'</div>' +
						'</div>';

$('#pokemon-list').append(html)

}

$('#dropdown-menu').change(function(){
	var type=$('#dropdown-menu').val();
	var url ='http://pokeapi.co/api/v2/type/' + type;
	request(url,"filter-pokemon")
});

function filterPokemon (array){
	$("#pokemon-list").empty();
console.log(array)
	array.slice(0,12).forEach(function(pokemon){
		request(pokemon.pokemon.url, 'load-pokemon')
	})
}