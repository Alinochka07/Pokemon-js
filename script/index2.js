"use-strict";



const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1154';
let pokemonsList = [];

let currentPage = 1;
let sortBy = '';
let pageNumber = 20;


function pageValueFunction() {
    pageNumber = document.querySelector('#pageValue').value;
    renderPokemons();
}






async function orderByName() {
    let byName = document.querySelector('#byAlphabetFilter');
    let select = byName.options[byName.selectedIndex].value;
    // code

    let elements = document.querySelectorAll('.pokeList');
    let elementsNames = document.querySelectorAll('.poke-name');
    let elementsId = document.querySelectorAll('.pokemonId');
    let elementsImage = document.querySelectorAll('.pokemonImage');
    let elementsForMoreInfo = document.querySelectorAll('.for-more-button');

    let pokiData = [];

    let req = await fetch(pokemonUrl);
    let response = req.json();
    pokiData =  response.results;

    pokiData = Array.prototype.slice.call(elements, 0);
    console.log(pokiData);

    if (select === "az") {
        pokiData.sort(function(a, b) {
            pokiData.sort((a, b) => {
                a.elementsNames.localeCompare(b.elementsNames);
            })
        })
    
        var parent = document.querySelectorAll('.pokeList');
        parent.innerHTML = "";
    
        for(var i = 0, l = pokiData.length; i < l; i++) {
            parent.appendChild(pokiData[i]);
        }
    } else if (select === "za") {
        pokiData.reverse();
    }
    
    renderPokemons();
}




let addToFavs = document.getElementsByClassName('addToFav');
let favForm = document.getElementById('poki-fav');


function addToFavorites() {
       for (const addToFav of addToFavs) {
           addToFav.addEventListener('click', function() {
               let favPokemon = this.parentNode.parentNode;
               let favPokemonName = this.previousSibling.previousSibling.innerHTML;
               let favPokemonId = this.parentNode.nextSibling.nextSibling.innerHTML;
               let favPokemonImage = this.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.src;
            //    let favPokemonIcon = '.'+this.lastElementChild.className.slice(3);
                let favPokemonIcon = this.lastElementChild;
   
               favPokemonIcon.setAttribute('style', 'color: orange;')
               
                 
               let favoritePokemonsList = document.createElement('div');
               favoritePokemonsList.classList.add('pokeList')
               favoritePokemonsList.innerHTML = `<span><h2>Name: </h2> <h2 class="poke-name">${favPokemonName}</h2>&nbsp &nbsp
                                                   <button class="removeFromFav" onclick="removeFromFavs()">
                                                   <i id="favIcon" class="fa ${favPokemonIcon.className.slice(3)}"></i></button></span>
                                                   <p class="pokemonId"  data-sort="id">${favPokemonId}</p>
                                                   <img alt="pokemon-avatar" class="pokemonImage right" src="${favPokemonImage}">
                                                   <a href="pokemon-info.html?${favPokemonId}" onclick="pokemonDetails()" class="for-more-button">
                                                   <input type="submit" value="Click for more details" id="details-button" class="details-btn">
                                                   </a>`;
   
                let content = document.querySelector('#pokemon-favorites');

                content.appendChild(favoritePokemonsList);
                alert("Your pokemon succesfully has been added to favorites!")
               
                const obj = {
                    pName: favPokemonName,
                    pId: favPokemonId,
                    pImage: favPokemonImage,
                    pIcon: favPokemonIcon
                }
   
                localStorage.setItem("obj", JSON.stringify(obj));
            
            let arr = [];
            const setLocalStorage = (item) => {    
                const fav = JSON.parse(localStorage.getItem('obj'));
                fav.push(item);
                localStorage.setItem('fav', JSON.stringify(obj));
             }

             const saveLog = (e) => {
                e.preventDefault();
                setLocalStorage('obj', [...this.state.obj, this.state.fav]);
            }
            removeFromFavs(); 
                  
           })
       }
}
   



function removeFromFavs() {
    
    let pokeLists = document.querySelector('.removeFromFav');
    pokeLists.addEventListener('click', del_function, false);


    function del_function(evt) {
        evt.preventDefault();
        this.parentNode.parentNode.remove();
    };
    
}


   
window.onload = function() {
    addToFavorites();
}




function showFavorites() {
    let favSection = document.getElementById('favorites-pokemons');
    favSection.setAttribute('style', 'display: flex; flex-wrap: wrap; flex-direction: column;');
   
    let resultsSection = document.getElementById('results');
    resultsSection.setAttribute('style', 'display: none');

    // removeFromFavs(); 
}






let searchbar = document.getElementById("searchbar");
let dataStore = [];
let dataa = document.querySelector('.pokemons-list');


getSearchedData();

async function getSearchedData() {
    try {
        const response = await fetch(pokemonUrl);
        const pokemonData = await response.json()
        dataStore = pokemonData.results;
        dataa.innerHTML = getHTML(dataStore);
    } catch (error) {
        console.log(error)
    }
}

function getHTML(){
    if (dataStore) {
        dataStore.map((pokemon) => {
            let pokemon_Id = `${pokemon.url.slice(34).replace("/","")}`;
            let createDiv = document.createElement('div');
            createDiv.classList.add('pokeList');
            createDiv.innerHTML = `<span><h2 class="poke-name">Name: ${pokemon.name}</h2>&nbsp &nbsp<i class='fa fa-heart right'></i></span>
                                        
                                        <p class='pokemonId' id=${pokemon_Id}> ID: ${pokemon_Id}</p>
                                        <img alt="pokemon-avatar" class="pokemonImage" 
                                            src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon_Id}.png'>
                                        
                                        <a href='pokemon-info.html?${pokemon_Id}' >
                                            <button onclick="pokemonDetails()" type='submit' id='details-button' class='right details-btn'>Click for more info</button>
                                        </a>`;

            let pokemonCard = document.querySelector('.pokemons-list');
            pokemonCard.appendChild(createDiv);
    })
    }        
            
}

function noResultHTML(){
    return `<div class=""><h1 class="noResults">No Results Found</h1></div>`;
}

searchbar.addEventListener('keyup', function(e){
    const currentword = e.target.value;
    const filteredData= dataStore.filter(o => o.pName.includes(currentword));
    dataa.innerHTML = filteredData.length ? getHTML(filteredData) : noResultHTML();
});


let pokeDetails = document.getElementsByClassName('details-button');
let insertPokeInfo = document.getElementById('pokemon-info');

function pokemonDetails() {

    try {
            for (const pokeDetail of pokeDetails) {
                pokeDetail.addEventListener('click', function() {
                    let pokemon = this.parentNode;
                    let pokemonName = this.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML;
                    let pokemonId = this.parentNode.nextSibling.nextSibling.innerHTML;
                    let pokemonImage = this.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.src;
                    
                    console.log(pokemonName);
                      
                    let pokemonsList = document.createElement('div');
                    pokemonsList.classList.add('pokeList')
                    pokemonsList.innerHTML = `<span><h2>Name: </h2> <h2 class="poke-name">${pokemonName}</h2>&nbsp &nbsp
                                                        <button class="removeFromFav" onclick="removeFromFavs()">
                                                        <i id="favIcon" class="fa ${favPokemonIcon.className.slice(3)}"></i></button></span>
                                                        <p class="pokemonId"  data-sort="id">${pokemonId}</p>
                                                        <img alt="pokemon-avatar" class="pokemonImage right" src="${pokemonImage}">
                                                        <a href="pokemon-info.html?${pokemonId}" onclick="pokemonDetails()" class="for-more-button">
                                                        <input type="submit" value="Click for more details" id="details-button" class="details-btn">
                                                        </a>`;
        
                     let content = document.querySelector('#pokemon-info');
     
                     content.appendChild(pokemonsList);
            
                    
            })
     }
    } catch(error) {
        console.log('ERRORRR')
    }
   
}

pokemonDetails();

async function renderPokemons() {
    await getPokemons();

    var pokemons = '';
    try {
        pokemonsList.filter((row, index) => {
            let start = (currentPage - 1) * pageNumber;
            let end = currentPage * pageNumber;
            if (index >= start && index < end) {
                return true;
            }
        })
        .forEach(pokemon => {
            let pokemonId = `${pokemon.url.slice(34).replace("/","")}`;
            let pokemonName = pokemon.name;
            let pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
        
            pokemons += '<div class="pokeList">\
                            <span><h2>Name: </h2> <h2 class="poke-name">'+pokemonName+'</h2>&nbsp &nbsp\
                            <button class="addToFav" onclick="addToFavorites()"><i id="favIcon" class="fa fa-heart"></i></button></span>\
                            <p class="pokemonId" id="'+pokemonId+'" data-sort="id"> ID: '+pokemonId+'</p>\
                            <img alt="pokemon-avatar" class="pokemonImage right" src="'+pokemonImage+'">\
                            <a href="pokemon-info.html?'+pokemonId+'" onclick="pokemonDetails()" class="for-more-button"><input type="submit" value="Click for more details" id="details-button" class="details-btn"></a>\
                        </div>';
        })
    
        document.querySelector('.pokemons-list').innerHTML = pokemons;


    } catch(err) {
        console.log(err);
    }

}

renderPokemons();





function previousPage() {
    if (currentPage > 1) {
        currentPage --;
        renderPokemons();
    }
}

function nextPage() {
    if ((currentPage * pageNumber) < pokemonsList.length) {
        currentPage ++;
        renderPokemons();
    }
}

document.querySelector('#prev-button').addEventListener('click', previousPage, false);
document.querySelector('#next-button').addEventListener('click', nextPage, false);



async function getPokemons() {
    try {
        const response = await fetch(pokemonUrl);
        const pokemonData = await response.json()
        pokemonsList = pokemonData.results;
       
        
    } catch (error) {
        console.log(error)
    }
}

getPokemons();










// async function getPokemons() {
//     const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1154';
//     try {
//         let res = await fetch(pokemonUrl);
//         let req = await res.json();
//         renderPokemons(req)
//         console.log(res)
        
//     } catch (error) {
//         console.log(error);
//     }
// }

// getPokemons();




// function renderPokemons(res) {
//     if (res.results) {
//         res.results.map((pokemon) => {
//             let pokemon_Id = `${pokemon.url.slice(34).replace("/","")}`;
//             let createDiv = document.createElement('div');
//             createDiv.classList.add('pokeList');
//             createDiv.innerHTML = `<span><h2 class="poke-name">Name: ${pokemon.name}</h2>&nbsp &nbsp<i class='fa fa-heart right'></i></span>
                                        
//                                         <p class='pokemonId' id=${pokemon_Id}> ID: ${pokemon_Id}</p>
//                                         <img alt="pokemon-avatar" class="pokemonImage" 
//                                             src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon_Id}.png'>
                                        
//                                         <a href='pokemon-info.html?${pokemon_Id}' >
//                                             <button onclick="pokemonDetails()" type='submit' id='details-button' class='right details-btn'>Click for more info</button>
//                                         </a>`;

//             let pokemonCard = document.querySelector('.pokemons-list');
//             pokemonCard.appendChild(createDiv);
            
//         })
//     }
    

// }

