import ConnectToDB from "../models/Database.js";
import { PokemonModel } from "../models/PokemonModel.js";
import { PokemonView } from "../views/PokemonView.js";

export class PokemonController {
  constructor() {
    this.model = new PokemonModel();
    this.view = new PokemonView();
    
    this.database = new ConnectToDB()
    this.userId = window.location.search.slice(4)
    this.userFile;

    this.pokemonsFiltered = [];
    this.wishList = [];
    this.shoppingCart = [];
    this.selectedPokemon = null;

    this.init()
    }

  async init() {
    this.view.showLoading();
    try {
        this.userFile = await this.database.getFile(this.userId)
        console.log(this.userFile)
        this.wishList = this.userFile["wishlist"]
        this.shoppingCart = this.userFile["cart"]
        await this.model.fetchRandomPokemons(54);
        this.view.hideLoading();
        this.view.showConsole();

        this.pokemonsFiltered = this.model.getAllPokemons();
        this.view.displayPokemons(this.pokemonsFiltered, (pokemonId) => {
            this.selectedPokemon = pokemonId; 
            console.log(`Selected Pokémon: ${this.selectedPokemon}`);
        });

        this.bindingEvents();
    } catch (error) {
        console.error(error);
    }
}

  async bindingEvents() {
    this.filterType = document.querySelector("#filtroTipo");
    this.filterType.addEventListener("keyup", () => this.filteringPokemons());

    const filterName = document.querySelector("#filtroNombre");
    filterName.addEventListener("keyup", () => this.filteringPokemons());

    const filterGeneration = document.querySelector("#filtroGeneracion");
    filterGeneration.addEventListener("keyup", () => this.filteringPokemons());

    const btnAddToWishList = document.querySelector("#btnAgnadeListaDeseo");
    if (btnAddToWishList) {
      btnAddToWishList.addEventListener("click", this.addToWishList.bind(this));
    }

    const btnShowWishList = document.querySelector("#btnMostrarListaDeseo");
    if (btnShowWishList) {
      btnShowWishList.addEventListener("click", this.showWishList.bind(this));
    }

    const btnAddToCart = document.querySelector("#btnAgnadeCarrito");
    if (btnAddToCart) {
      btnAddToCart.addEventListener("click", this.addToCart.bind(this));
    }

    const btnViewCart = document.querySelector("#btnVerCarrito");
    if (btnViewCart) {
      btnViewCart.addEventListener("click", this.showCart.bind(this));
    }

    const btnUserProfile = document.querySelector("#userProfile");
    if (btnUserProfile) {
      btnUserProfile.addEventListener("click", this.showProfile.bind(this));
    }
  }

  async filteringPokemons() {
    const typeFilterValue = this.filterType.value.toLowerCase();
    const nameFilterValue = document.querySelector("#filtroNombre").value.toLowerCase();
    const generationFilterValue = document.querySelector("#filtroGeneracion").value.toLowerCase();

    const filteredPokemons = this.model.getAllPokemons().filter((pokemon) => {
        const matchesType = pokemon.pkm_type.some(type => type.type.name.toLowerCase().includes(typeFilterValue));
        const matchesName = pokemon.name.toLowerCase().includes(nameFilterValue);
        const matchesGeneration = pokemon.generation.toLowerCase().includes(generationFilterValue);

        return matchesType && matchesName && matchesGeneration;
    });

    this.view.displayPokemons(filteredPokemons, (pokemonId) => {
        this.selectedPokemon = pokemonId;
        console.log(`Selected Pokémon: ${this.selectedPokemon}`);
    });
  }

  async addToWishList() {
    if (this.selectedPokemon) {
      if (this.wishList.includes(this.selectedPokemon)) {
        alert("This Pokémon is already in the wish list.");
      } else {
        this.wishList.push(this.selectedPokemon);
        await this.database.update(this.userId, {wishlist: this.wishList})
        alert(`Pokémon ID ${this.selectedPokemon} added to the wish list.`);
      }
    } else {
      alert("No Pokémon selected.");
    }
  }

  showWishList() {
    window.open(`wishlist.html?id=${this.userId}`)
  }

  async addToCart() {
    if (this.selectedPokemon) {
      if (this.shoppingCart.includes(this.selectedPokemon)) {
        alert("This Pokémon is already in the cart.");
      } else {
        this.shoppingCart.push(this.selectedPokemon);
        await this.database.update(this.userId, {cart: this.shoppingCart})
        alert(`Pokémon ID ${this.selectedPokemon} added to the cart.`);
      }
    } else {
      alert("No Pokémon selected.");
    }
  }

  showCart() {
    window.open(`cart.html?id=${this.userId}`)
  }

  showProfile() {
    window.open(`user.html?id=${this.userId}`)
  }

}
