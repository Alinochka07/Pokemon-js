"use-strict";




document.querySelector("#details-button").onclick = function(event) {
    let createDiv = document.createElement('div');
    createDiv.classList.add('pokemon-cards');
    createDiv.innerHTML = `<div>
                                <span><h2 class="poke-name">Name: </h2>&nbsp &nbsp<i class='fa fa-heart right'></i></span>
                            </div>`;

    let pokemonCard = document.querySelector('.pokemon-infos.pokemon-info');
    pokemonCard.appendChild(createDiv);
    alert(1234);
   }