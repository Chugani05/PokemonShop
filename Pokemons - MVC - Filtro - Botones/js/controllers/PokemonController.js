import { PokemonModel } from "../models/PokemonModel.js";
import { PokemonView } from "../views/PokemonView.js";

export class PokemonController {
  constructor() {
    this.model = new PokemonModel();
    this.view = new PokemonView();

    this.pokemonsFiltered = [];
    this.newDesireList = [];
    this.shoppingCart = [];
    this.selectedPokemon = null;

    // Bind button event
    document.querySelector("#button").addEventListener("click", () => this.init());
  }

  // async init() {
  //   this.view.showLoading();
  //   try {
  //     await this.model.loadPokemons();
  //     this.view.hideLoading();
  //     this.view.showConsole();

  //     this.view.displayPokemons(this.model.getAllPokemons(), (pokemonId) => {
  //       this.selectedPokemon = pokemonId;
  //       console.log(`Pokémon seleccionado: ${this.selectedPokemon}`);
  //     });

  //     this.bindingEvents();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // cambie la función para que devolviera pokemons aleatorios
  async init() {
    this.view.showLoading();
    try {
        await this.model.loadPokemons();
        const randomPokemons = await this.model.fetchRandomPokemons(54);
        this.view.hideLoading();
        this.view.showConsole();

        // Muestra los Pokémon aleatorios
        this.pokemonsFiltered = randomPokemons; // Guardar Pokémon aleatorios en la lista filtrada
        this.view.displayPokemons(this.pokemonsFiltered, (pokemonId) => {
            this.selectedPokemon = pokemonId;
            console.log(`Pokémon seleccionado: ${this.selectedPokemon}`);
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

    // no funciona
    const btnAgnadeListaDeseo = document.querySelector("btnAgnadeListaDeseo");
    if (btnAgnadeListaDeseo) {
      btnAgnadeListaDeseo.addEventListener("click", this.agregarADeseo.bind(this));
    }

    const btnMostrarListaDeseo = document.querySelector("#btnMostrarListaDeseo");
    if (btnMostrarListaDeseo) {
      btnMostrarListaDeseo.addEventListener("click", this.mostrarListaDeseo.bind(this));
    }

    const btnAgnadeCarrito = document.querySelector("#btnAgnadeCarrito");
    if (btnAgnadeCarrito) {
      btnAgnadeCarrito.addEventListener("click", this.agregarAlCarrito.bind(this));
    }

    const btnVerCarrito = document.querySelector("#btnVerCarrito");
    if (btnVerCarrito) {
      btnVerCarrito.addEventListener("click", this.mostrarCarrito.bind(this));
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
        console.log(`Pokémon seleccionado: ${this.selectedPokemon}`);
    });
  }

  mostrarListaDeseo() {
    if (this.newDesireList.length === 0) {
        alert("La lista de deseos está vacía.");
        return;
    }

    let txt = "Lista de Deseo:\n";
    this.newDesireList.forEach((pkm) => {
        txt += `- ${pkm}\n`;
    });
    alert(txt);
  }

  // no funciona
  async agregarADeseo() {
      if (this.selectedPokemon) {
          if (this.newDesireList.includes(this.selectedPokemon)) {
              alert("Este Pokémon ya está en la lista de deseos.");
          } else {
              this.newDesireList.push(this.selectedPokemon);
              alert(`Pokémon ID ${this.selectedPokemon} añadido a la lista de deseos.`);
          }
      } else {
          alert("No se ha seleccionado ningún Pokémon.");
      }
  }

  async agregarAlCarrito() {
      if (this.selectedPokemon) {
          if (this.shoppingCart.includes(this.selectedPokemon)) {
              alert("Este Pokémon ya está en el carrito.");
          } else {
              this.shoppingCart.push(this.selectedPokemon);
              alert(`Pokémon ID ${this.selectedPokemon} añadido al carrito.`);
          }
      } else {
          alert("No se ha seleccionado ningún Pokémon.");
      }
  }

  mostrarCarrito() {
      if (this.shoppingCart.length > 0) {
          let txt = "Pokémon en el carrito:\n";
          this.shoppingCart.forEach((pkm) => {
              txt += `- ${pkm}\n`;
          });
          alert(txt);
      } else {
          alert("El carrito está vacío.");
      }
  }
}


