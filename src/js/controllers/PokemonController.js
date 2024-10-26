import ConnectToDB from "../models/Database.js";
import { PokemonModel } from "../models/PokemonModel.js";
import { PokemonView } from "../views/PokemonView.js";

// The main controller class for handling Pokémon logic
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

      // Bind the button event to initialize the controller
    this.init()
    }

  // Initialize the application
  async init() {
    this.view.showLoading(); // Show loading spinner
    try {
        this.userFile = await this.database.getFile(this.userId)
        console.log(this.userFile)
        this.wishList = this.userFile["wishlist"]
        this.shoppingCart = this.userFile["cart"]
        await this.model.fetchRandomPokemons(54); // Fetch random Pokémon
        this.view.hideLoading(); // Hide loading spinner
        this.view.showConsole(); // Show console view

        // Show the random Pokémon
        this.pokemonsFiltered = this.model.getAllPokemons(); // Store random Pokémon in the filtered list
        this.view.displayPokemons(this.pokemonsFiltered, (pokemonId) => {
            this.selectedPokemon = pokemonId; // Set the selected Pokémon ID
            console.log(`Selected Pokémon: ${this.selectedPokemon}`); // Log selected Pokémon
        });

        this.bindingEvents(); // Bind event listeners
    } catch (error) {
        console.error(error); // Log any errors
    }
}

  // Bind event listeners for filtering and managing Pokémon
  async bindingEvents() {
    this.filterType = document.querySelector("#filtroTipo"); // Filter by type
    this.filterType.addEventListener("keyup", () => this.filteringPokemons()); // Filter on keyup

    const filterName = document.querySelector("#filtroNombre"); // Filter by name
    filterName.addEventListener("keyup", () => this.filteringPokemons()); // Filter on keyup

    const filterGeneration = document.querySelector("#filtroGeneracion"); // Filter by generation
    filterGeneration.addEventListener("keyup", () => this.filteringPokemons()); // Filter on keyup

    const btnAddToWishList = document.querySelector("#btnAgnadeListaDeseo"); // Add to wish list button
    if (btnAddToWishList) {
      btnAddToWishList.addEventListener("click", this.addToWishList.bind(this)); // Bind add to wish list event
    }

    const btnShowWishList = document.querySelector("#btnMostrarListaDeseo"); // Show wish list button
    if (btnShowWishList) {
      btnShowWishList.addEventListener("click", this.showWishList.bind(this)); // Bind show wish list event
    }

    const btnAddToCart = document.querySelector("#btnAgnadeCarrito"); // Add to cart button
    if (btnAddToCart) {
      btnAddToCart.addEventListener("click", this.addToCart.bind(this)); // Bind add to cart event
    }

    const btnViewCart = document.querySelector("#btnVerCarrito"); // View cart button
    if (btnViewCart) {
      btnViewCart.addEventListener("click", this.showCart.bind(this)); // Bind show cart event
    }

    const btnUserProfile = document.querySelector("#userProfile");
    if (btnUserProfile) {
      btnUserProfile.addEventListener("click", this.showProfile.bind(this));
    }
  }

  // Filter Pokémon based on type, name, and generation
  async filteringPokemons() {
    const typeFilterValue = this.filterType.value.toLowerCase(); // Get type filter value
    const nameFilterValue = document.querySelector("#filtroNombre").value.toLowerCase(); // Get name filter value
    const generationFilterValue = document.querySelector("#filtroGeneracion").value.toLowerCase(); // Get generation filter value

    const filteredPokemons = this.model.getAllPokemons().filter((pokemon) => {
        const matchesType = pokemon.pkm_type.some(type => type.type.name.toLowerCase().includes(typeFilterValue)); // Check type match
        const matchesName = pokemon.name.toLowerCase().includes(nameFilterValue); // Check name match
        const matchesGeneration = pokemon.generation.toLowerCase().includes(generationFilterValue); // Check generation match

        return matchesType && matchesName && matchesGeneration; // Return true if all filters match
    });

    this.view.displayPokemons(filteredPokemons, (pokemonId) => {
        this.selectedPokemon = pokemonId; // Set the selected Pokémon ID
        console.log(`Selected Pokémon: ${this.selectedPokemon}`); // Log selected Pokémon
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
