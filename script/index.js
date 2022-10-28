"use-strict";


async function getPokemons() {
    const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1154';
    try {
        let res = await fetch(pokemonUrl);
        let req = await res.json();
        renderPokemons(req)
        console.log(res)
        
    } catch (error) {
        console.log(error);
    }
}

getPokemons();


function renderPokemons(res) {
    let html = '';
    if (res.results) {
        res.results.forEach(pokemon => {
            let pokemon_Id = `${pokemon.url.slice(34).replace("/","")}`
            let htmlSegment = `<div class="pokeList">
                                    <span><h2 class="poke-name">Name: ${pokemon.name}
                                    </h2>&nbsp &nbsp<i class='fa fa-heart right'></i></span>
                                    
                                    <p class='pokemonId' id=${pokemon_Id}> ID: ${pokemon_Id}</p>
                                    <img alt="pokemon-avatar" class="pokemonImage" 
                                    src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon_Id}.png'>
                                    
                                    <a href='pokemon-info.html?${pokemon_Id}' onclick="pokemonDetails()">
                                    <input type='submit' value='Click for more details' 
                                    id='details-button' class='right details-btn'></a>
                                    
                                </div>`;
    
            html += htmlSegment;
        })
    }
   
    let insertPokemon = document.querySelector('.pokemons-list');
    insertPokemon.innerHTML = html;
}


function pokemonDetails() {
    alert(123455);
    let createDiv = document.createElement('div');
    createDiv.classList.add('pokemon-card');
    createDiv.innerHTML = '<div><p>Some text here</p></div>'
    let pokemonCard = document.querySelector('.pokemon-infos.pokemon-info.pokemon-det');
    pokemonCard.appendChild(createDiv);
    alert('ok');
}

    
    

    // createDiv.classList.add('pokemon-det');
    // createDiv.innerHTML = `<div>
    //                             Some text here
    //                         </div>`;

    // let pokemonCard = document.querySelector('.pokemon-infos.pokemon-info');
    // pokemonCard.appendChild(createDiv);
   







// let newHtml = '';
// let newHtmlSegment = `<div class="pokemon-det">
//                         Some text
                        
//                         <p class='pokemonId' id=''> ID: some id</p>
                      
//                     </div>`;

// newHtml += newHtmlSegment;


// let insertNewPokemon = document.querySelector('.pokemon-info');
// insertNewPokemon.innerHTML = newHtml;





