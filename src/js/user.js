import ConnectToDB from "./models/Database.js";
import { PokemonModel } from "./models/PokemonModel.js";

const database = new ConnectToDB()
const pokemonModel = new PokemonModel()

const userId = window.location.search.slice(4)
const userFile = await database.getFile(userId)
const username = userFile["username"]
const inventory = userFile["inventory"]
const balance = userFile["balance"]

const pokemonList = document.getElementById("purchased-pokemon-list")

for (const pkmId of inventory) {
    const pokemon = await pokemonModel.fetchPokemon(pkmId)
    pokemonList.innerHTML += `
    <li>
        <div>
            <div class="text-center">${pokemon.name}</div>
            <img src="${pokemon.front}" width=90px height=100px> <br>
        </div>
        <div>Type:<br>${pokemon.getTypes()}</div>
        <div>Generation:<br>${pokemon.generation}</div>
    </li>
    `
};

$("#balance").text(`${balance}€`)
$("#username").text(username)

if (inventory.length === 0) {
    $("#empty").show();
} else {
    $("#empty").hide();
}