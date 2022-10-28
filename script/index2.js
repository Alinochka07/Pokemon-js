"use-strict";



const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1154';
let pokemonsList = [];

let currentPage = 1;
let sortBy = '';
let pageNumber = 20;


function pageValueFunction() {
    pageNumber = document.querySelector('#pageValue').value;
    console.log(pageNumber);
    renderPokemons();
}



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
            pokemons += '<div class="pokeList">\
                            <span><h2 class="poke-name" data-sort ="name">Name: '+pokemon.name+'</h2>&nbsp &nbsp\
                            <i class="fa fa-heart right"></i></span>\
                            <p class="pokemonId" id="'+pokemonId+'" data-sort="id"> ID: '+pokemonId+'</p>\
                            <img alt="pokemon-avatar" class="pokemonImage right" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+pokemonId+'.png">\
                            <a href="pokemon-info.html?'+pokemonId+'" onclick="pokemonDetails()"><input type="submit" value="Click for more details" id="details-button" class="details-btn"></a>\
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
        pokemonsList = pokemonData.results
        
    } catch (error) {
        console.log(error)
    }
}

getPokemons();









// byAlphabetFilter

// products.sort((a,b) => a.category > b.category ? 1 : b.category > a.category ? -1 : 0)


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


// function pokemonDetails() {
//     console.log('flflf');
//     try {
//         let createAnotherDiv = document.createElement('div');
//         createAnotherDiv.classList.add('pokemon-det');
//         createDiv.innerHTML = '<div><p>Some text here</p></div>'
//         let pokemonCard = document.querySelector('.pokemon-info');
//         pokemonCard.appendChild(createAnotherDiv);
//     } catch(error) {
//         console.log('ERRORRR')
//     }
   
// }


// Pagination

// function myPagination() {
//     const displayPageNav = perPage => {
  
//         let pagination =``
//         const totalItems = res.length;
//         perPage = perPage ? perPage : 1
//         const pages = Math.ceil(totalItems/perPage)
        
//         for(let i = 1; i <= pages; i++) {
//           pagination += `<a href="#" onClick="displayItems(${i},${perPage})" >${i}</a>`
//         }
      
//         document.getElementById('pagination').innerHTML = pagination
        
//       }
      
//       const displayItems = ( page = 1, perPage = 2 ) => {
        
//        let index, offSet
        
//         if(page == 1 || page <=0)  {
//           index = 0
//           offSet = perPage
//         } else if(page > res.length) {
//           index = page - 1
//           offSet = res.length
//         } else {
//           index = page * perPage - perPage
//           offSet = index + perPage
//         }
        
//         const slicedItems = res.slice(index, offSet)
//         let pokemon_Id;

//         const html = slicedItems.map(pokemon => 
//             pokemon_Id = `${pokemon.url.slice(34).replace("/","")}`
//             `<div class='pokeList'>
//                 <span><h2 class="poke-name">Name: ${pokemon.name}</h2>&nbsp &nbsp<i class='fa fa-heart right'></i></span>
//                     <p class='pokemonId' id=${pokemon_Id}> ID: ${pokemon_Id}</p>
//                     <img alt="pokemon-avatar" class="pokemonImage" 
//                         src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon_Id}.png'>
                                        
//                     <a href='pokemon-info.html?${pokemon_Id}' >
//                         <button onclick="pokemonDetails()" type='submit' id='details-button' class='right details-btn'>Click for more info</button>
//                     </a>
//             </div>`)
        
//         document.querySelector('.pokemons-list').innerHTML = html.join('')
       
//       }
      
//       let perPage = 10
//       displayPageNav(perPage)
//       displayItems(1, perPage)
// }

// function myPagination() {
//     let config = {
//         maxResults: 100,
//         maxPerPage: 10,
//         page: 1
//     }

//     pageAmount = Math.ceil(config.maxResults / config.maxPerPage),
// 	results = res;

//     function getPagination() {
//         for(let i = 1; i < res.length; i++) {
//             results[i] = 'Result ' + i;
//         }

//         document.getElementById("next-button").onclick = function() { 
// 			pager("next");
// 			return false;
// 		};
// 		document.getElementById("prev-button").onclick = function() { 
// 			pager("previous"); 
// 			return false;
// 		};
		
// 		document.getElementById("goTo").onclick = function() { 
// 			pager("goTo", document.getElementById("pagination-number").value); 
// 			return false;
// 		};
// 		document.getElementById("page_nav").onclick = function(e) { 
// 			var page = e.srcElement.getAttribute("data-page");
// 			if(page){
// 				pager("goTo", page);
// 			}
// 			return false;
// 		};
// 		update_page();
//     }

//     function pager(action, page) {
// 		switch (action) {
// 			case "next-button":
// 				if( (config.page + 1) < pageAmount ){ 
// 					++config.page;
// 				}
// 				break;
			 
// 			case "prev-button":
// 				if( (config.page - 1) >= 1 ){
// 					 --config.page;
// 				}
// 				break;
			
// 			case "goTo":
// 				config.page = page;
// 				break;
			
// 			default:
// 				break;
// 		}
// 		update_page();
// 	}

//     function build_nav() {
// 		var j,
// 			page_nav = "";
							
// 		for( j = config.page; j < pageAmount; j++ ){
// 			page_nav += "<li><a data-page=" + j + ">" + j + "</a></li>\n";
// 		}
// 		return page_nav;
// 	}

//     function build_results(){
// 		var k,
// 			tmp = "",
// 			start = ( config.page !== 1 )? config.page * config.maxPerPage : 1,
// 			end = start + config.maxPerPage,
// 			result;
			
// 		for( k = start; k < end; k++ ){
// 			result = results[k];
// 			if(typeof result !== "undefined"){ 
// 				tmp += "<li>" + result + "</li>\n";
// 			}
// 			else {
// 				tmp = "";
// 			}
// 		}
// 		return tmp;
// 	}				
// 	function update_page(){
// 		document.getElementById("curr_page").innerText = config.page;
// 		document.getElementById("page_nav").innerHTML = build_nav();
// 		document.getElementById("page-results").innerHTML = build_results();
// 	}
// 	window.addEventListener("load", function() {
// 		getPagination();
// 	});
// }

// myPagination();