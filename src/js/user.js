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
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <div class="d-flex gap-5 align-items-center">
            <div>
                <div>${pokemon.name}</div>
                <img src="${pokemon.front}" width=90px height=100px>
            </div>
            <div>Type:<br>${pokemon.getTypes()}</div>
            <div>Generation:<br>${pokemon.generation}</div>
        </div>
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