import ConnectToDB from "./models/Database.js";
import { PokemonModel } from "./models/PokemonModel.js";

const database = new ConnectToDB()
const pokemonModel = new PokemonModel()

const userId = window.location.search.slice(4)
const userFile = await database.getFile(userId)
const cart = userFile["cart"]
const balance = userFile["balance"]
const inventory = userFile["inventory"]
let totalPrice = 0

const pokemonList = document.getElementById("cart-items-list")

for (const pkmId of cart) {
    const pokemon = await pokemonModel.fetchPokemon(pkmId)
    totalPrice += parseFloat(pokemon.price)
    pokemonList.innerHTML += `
    <li class="list-group-item d-flex justify-content align-items-center" id="${pkmId}">
        <div class="d-flex gap-5 align-items-center">
            <div>
                <div>${pokemon.name}</div>
                <img src="${pokemon.front}" width=90px height=100px>
            </div>
            <div>Price:<br>${pokemon.price}€</div>
        </div>
        <div>
        <button type="button" class="btn btn-outline-secondary btn-remove">Remove from cart</button>
        </div>
    </li>
    `
};

$("#balance").text(`${balance}€`)
$("#total-price").text(`${totalPrice}€`)

$(".btn-remove").click( function() {
    const id = $(this).parents("li").attr("id")
    removeFromDB(id)
    
})

async function removeFromDB(id) {
    let new_cart = []
    for (let index = 0; index < cart.length; index++) {
            if (id != cart[index]) {
        new_cart.push(cart[index])
            }        
        }
    await database.update(userId, {
            cart: new_cart
        });
        location.reload()
}

$("#btn-buy").click( function() {
    if (balance >= totalPrice) {
        purchaseItems(userId)
    }
    else {
        alert("You don't have enough money in the account to purchase these items")
    }
})

async function purchaseItems(userId) {
    for (let item of cart) {
        inventory.push(item)
    }
    await database.update(userId, {
        cart: [],
        balance: balance - totalPrice,
        inventory: inventory
    });
    location.reload()
}

if (cart.length === 0) {
    $("#empty").show();
} else {
    $("#empty").hide();
}