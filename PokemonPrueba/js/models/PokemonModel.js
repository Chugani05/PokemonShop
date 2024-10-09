import { Pokemon } from "./Pokemon.js";

export class PokemonModel {
    constructor() {
        this.pokemons = []; // Array to store the fetched Pokémon
    }

    // Function to fetch a Pokémon by its ID from the PokeAPI
    async fetchPokemon(id) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`); // Fetching Pokémon data from the API
            const data = await response.json(); // Convert the response to JSON
            return new Pokemon(data); // Create a new Pokémon instance with the fetched data
        } catch (error) {
            throw new Error(`Error fetching Pokémon with ID ${id}: ${error}`); // Error handling in case the fetch fails
        }
    }

    // Function to load Pokémon from ID 1 to 156
    async loadPokemons() {
        for (let i = 1; i <= 156; i++) {
            const pokemon = await this.fetchPokemon(i); // Fetch each Pokémon by its ID
            pokemon.price = ((5 + pokemon.attack * (20 - 5)) / 100).toFixed(2); // Set the Pokémon's price based on its attack stat
            this.pokemons.push(pokemon); // Add the Pokémon to the list
        }
    }

    // Function to return all fetched Pokémon
    getAllPokemons() {
        return this.pokemons;
    }

    // Function to fetch a specified number of random Pokémon
    async fetchRandomPokemons(count) {
      const randomPokemons = []; // Array to store randomly fetched Pokémon
      const totalPokemons = 350; // Define the total range of Pokémon (for this example, it's 350)

      // Keep fetching random Pokémon until the desired number (count) is reached
      while (randomPokemons.length < count) {
          const randomId = Math.floor(Math.random() * totalPokemons) + 1; // Generate a random ID between 1 and totalPokemons
          const pokemon = await this.fetchPokemon(randomId); // Fetch the Pokémon by its random ID
          
          // Check if the Pokémon is not already in the array, and if not, add it
          if (!randomPokemons.includes(pokemon)) {
              randomPokemons.push(pokemon);
          }
      }
      return randomPokemons; // Return the array of random Pokémon
  }
}
