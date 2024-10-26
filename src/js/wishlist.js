import ConnectToDB from "./models/Database.js";
import { PokemonModel } from "./models/PokemonModel.js";

const database = new ConnectToDB()
const pokemonModel = new PokemonModel()

const userId = window.location.search.slice(4)
const userFile = await database.getFile(userId)
const wishlist = userFile["wishlist"]
let cart = userFile["cart"]

const pokemonList = document.getElementById("wishlist-pokemon-list")

for (const pkmId of wishlist) {
    const pokemon = await pokemonModel.fetchPokemon(pkmId)
    pokemonList.innerHTML += `
    <li class="list-group-item d-flex justify-content" id="${pkmId}">
        <div class="d-flex gap-5">
            <div>
                <div>${pokemon.name}</div>
                <img src="${pokemon.front}" width=90px height=100px>
            </div>
            <div>Price:<br>${pokemon.price}€</div>
        </div>
        <div>
        <button type="button" class="btn btn-outline-primary btn-add">Add to cart</button>
        <button type="button" class="btn btn-outline-secondary btn-remove">Remove from wishlist</button>
        </div>
    </li>
    `
};

$(".btn-remove").click( function() {
    const id = $(this).parents("li").attr("id")
    removeFromDB(id)
    
})

async function removeFromDB(id) {
    let new_wishlist = []
    for (let index = 0; index < wishlist.length; index++) {
            if (id != wishlist[index]) {
        new_wishlist.push(wishlist[index])
            }        
        }
    await database.update(userId, {
            wishlist: new_wishlist
        });
        location.reload()
}

$(".btn-add").click( function() {
    const id = $(this).parents("li").attr("id")
    addToCart(id)
})

async function addToCart(id) {
    let new_wishlist = []
    for (let index = 0; index < wishlist.length; index++) {
            if (id != wishlist[index]) {
        new_wishlist.push(wishlist[index])
            }
            else {
                cart.push(id)
            }
        }
    await database.update(userId, {
            wishlist: new_wishlist,
            cart: cart
        });
        location.reload()
}