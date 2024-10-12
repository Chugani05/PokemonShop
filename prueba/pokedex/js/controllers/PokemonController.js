import { PokemonModel } from "../models/PokemonModel.js";
import { PokemonView } from "../views/PokemonView.js";

// The main controller class for handling Pokémon logic
export class PokemonController {
  constructor() {
    this.model = new PokemonModel(); // Instance of the model for Pokémon data
    this.view = new PokemonView(); // Instance of the view for displaying Pokémon

    this.isLoggedIn = false; // Check if the user is logged in
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

    const btnViewPurchases = document.querySelector("#btnVerCompras");
    if (btnViewPurchases) {
      btnViewPurchases.addEventListener("click", this.showPurchases.bind(this));
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

  addToWishList() {
    if (this.selectedPokemon) {
      if (this.newDesireList.includes(this.selectedPokemon)) {
        alert("This Pokémon is already in the wish list.");
      } else {
        this.newDesireList.push(this.selectedPokemon);
        alert(`Pokémon ID ${this.selectedPokemon} added to the wish list.`);
        this.model.saveWishList(this.newDesireList);
      }
    } else {
      alert("No Pokémon selected.");
    }
  }

  showWishList() {
    const wishList = this.model.getWishList();
    if (wishList.length === 0) {
      alert("The wish list is empty.");
    } else {
      this.view.showWishListWindow(wishList, this.removeFromWishList.bind(this));
    }
  }

  removeFromWishList(pokemonId) {
    this.newDesireList = this.newDesireList.filter(id => id !== pokemonId);
    this.model.saveWishList(this.newDesireList);
    this.showWishList(); // Refresh wish list view
  }

  addToCart() {
    if (this.selectedPokemon) {
      if (this.shoppingCart.includes(this.selectedPokemon)) {
        alert("This Pokémon is already in the cart.");
      } else {
        this.shoppingCart.push(this.selectedPokemon);
        alert(`Pokémon ID ${this.selectedPokemon} added to the cart.`);
        this.model.saveCart(this.shoppingCart);
      }
    } else {
      alert("No Pokémon selected.");
    }
  }

  showCart() {
    const cartItems = this.model.getCartItems();
    if (cartItems.length > 0) {
      this.view.showCartWindow(cartItems, this.removeFromCart.bind(this), this.buyItems.bind(this));
    } else {
      alert("The cart is empty.");
    }
  }

  removeFromCart(pokemonId) {
    this.shoppingCart = this.shoppingCart.filter(id => id !== pokemonId);
    this.model.saveCart(this.shoppingCart);
    this.showCart(); // Refresh cart view
  }

  // Only allow purchases if the user is logged in
  buyItems() {
    if (!this.isLoggedIn) {
      alert("You need to be logged in to make a purchase.");
      return;
    }

    if (this.shoppingCart.length === 0) {
      alert("No items selected for purchase.");
    } else {
      const confirmation = confirm("Do you want to purchase the selected items?");
      if (confirmation) {
        this.model.savePurchase(this.shoppingCart);
        this.shoppingCart = []; // Clear the cart after purchase
        this.model.saveCart(this.shoppingCart);
        alert("Purchase completed successfully.");
      }
    }
  }

  // View purchase history
  showPurchases() {
    if (!this.isLoggedIn) {
      alert("You need to be logged in to view your purchase history.");
      return;
    }

    const purchases = this.model.getPurchaseHistory();
    this.view.showPurchaseWindow(purchases, this.filterPurchases.bind(this));
  }
}
