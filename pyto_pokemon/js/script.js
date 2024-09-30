// Importamos la clase Pokemon
import Pokemon from "./Pokemon.js";

// Creo el array
const pokemons = [];

// Selecciono boton del DOM
const button = document.querySelector("button");

function showConsole() {
    //Mostrar filtros
    document.querySelectorAll("#filtro").forEach((e) => {
        //console.log(e);
        e.style.visibility = "visible";
    });

    // Mostrar botones
    document.querySelectorAll("#btn_lista_deseo").forEach((e) => {
        //console.log(e);
        e.style.visibility = "visible";
    });
}

button.addEventListener("click", () => {
    // Mostrar lista Pokemon
    document.querySelector("#pokedex").style.visibility = "visible";

    startPokemon();

});


const startPokemon = async () => {
    document.querySelector(".cargandoDatos").style.visibility = "visible";
    for (var i = 1; i <= 151; i++) {
        try {
            await fetch("https://pokeapi.co/api/v2/pokemon/" + i + "/")
                .then(function (result) {
                    return result.json();
                })
                .then(function (data) {
                    //console.log(data);
                    const pokemon = new Pokemon(data); // Instancio la clase
                    //console.log(pokemon);
                    pushPokemon(pokemon); // Guardo pokemon en array
                })
        } catch (error) {
            alert(`There is am error: ${error}`)
        }
    }

    await showPokedex();

};

function pushPokemon(pokemon) {
    pokemons.push(pokemon);
}

const showPokedex = async () => {
    //console.log(pokemons);
    // Hago visible la lista
    document.querySelector("#pokedex").style.visibility = "visible";

    const pokedex = document.getElementById("pokedex");

    document.querySelector(".cargandoDatos").style.visibility = "hidden";
    showConsole();
    button.style.visibility = "hidden";

    for (var i = 0; i < pokemons.length; i++) {
        var aux = 0;
        while (aux != pokemons[i].pkm_type.length) {
            if (aux == 0) var tipo1 = pokemons[i].pkm_type[aux].type.name;
            if (aux == 1) var tipo2 = pokemons[i].pkm_type[aux].type.name;
            else tipo2 = "";
            aux++;
        }
        pokedex.innerHTML += `
            <div class="card">
                <img src="${pokemons[i].pkm_back}">
                <img src="${pokemons[i].pkm_front}">
                <br>
                ${pokemons[i].id}. ${pokemons[i].name}
                <br>
                <div class="move">
                    first move: ${pokemons[i].pkm_first_move}<br>
                </div>
                <div class="ability">
                    ability: ${pokemons[i].pkm_ability}<br>
                </div>
                <div class="types">
                ${tipo1}  ${tipo2} 
                </div>
            </div>`;
    }
};