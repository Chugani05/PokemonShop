import { PokemonModel } from "../models/PokemonModel.js";
import { PokemonView } from "../views/PokemonView.js";

// The main controller class for handling Pokémon logic
export class PokemonController {
  constructor() {
    this.model = new PokemonModel(); // Instance of the model for Pokémon data
    this.view = new PokemonView(); // Instance of the view for displaying Pokémon

    this.pokemonsFiltered = []; // Array to hold filtered Pokémon
    this.newDesireList = []; // Array to hold the wish list of Pokémon
    this.shoppingCart = []; // Array to hold the shopping cart items
    this.selectedPokemon = null; // Currently selected Pokémon

    // Bind the button event to initialize the controller
    document.querySelector("#button").addEventListener("click", () => this.init());
  }

  // Initialize the application
  async init() {
    this.view.showLoading(); // Show loading spinner
    try {
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

  // Show the wish list
  showWishList() {
    if (this.newDesireList.length === 0) { // Check if the wish list is empty
        alert("The wish list is empty."); // Alert if empty
        return;
    }

    let txt = "Pokémon in the wish list:\n"; // Initialize text for wish list
    this.newDesireList.forEach((pkm) => {
        txt += `- ${pkm}\n`; // Append each Pokémon to the text
    });
    alert(txt); // Show the wish list
  }

  // Add the selected Pokémon to the wish list
  async addToWishList() {
      if (this.selectedPokemon) { // Check if a Pokémon is selected
          if (this.newDesireList.includes(this.selectedPokemon)) { // Check if already in the wish list
              alert("This Pokémon is already in the wish list."); // Alert if already present
          } else {
              this.newDesireList.push(this.selectedPokemon); // Add to the wish list
              alert(`Pokémon ID ${this.selectedPokemon} added to the wish list.`); // Alert on successful addition
          }
      } else {
          alert("No Pokémon has been selected."); // Alert if no Pokémon is selected
      }
  }

  // Add the selected Pokémon to the shopping cart
  async addToCart() {
      if (this.selectedPokemon) { // Check if a Pokémon is selected
          if (this.shoppingCart.includes(this.selectedPokemon)) { // Check if already in the cart
              alert("This Pokémon is already in the cart."); // Alert if already present
          } else {
              this.shoppingCart.push(this.selectedPokemon); // Add to the shopping cart
              alert(`Pokémon ID ${this.selectedPokemon} added to the cart.`); // Alert on successful addition
          }
      } else {
          alert("No Pokémon has been selected."); // Alert if no Pokémon is selected
      }
  }

  // Show the shopping cart
  showCart() {
      if (this.shoppingCart.length > 0) { // Check if the cart has items
          let txt = "Pokémon in the cart:\n"; // Initialize text for cart
          this.shoppingCart.forEach((pkm) => {
              txt += `- ${pkm}\n`; // Append each Pokémon to the text
          });
          alert(txt); // Show the cart contents
      } else {
          alert("The cart is empty."); // Alert if the cart is empty
      }
  }
}
