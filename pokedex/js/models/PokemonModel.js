import { Pokemon } from "./Pokemon.js";

export class PokemonModel {
    constructor() {
        const randomPokemons = []; // Array to store randomly fetched Pokémon
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

    // Function to return all fetched Pokémon
    getAllPokemons() {
        return this.randomPokemons;
    }

    // Function to fetch a specified number of random Pokémon
    async fetchRandomPokemons(count) {
        const randomPokemons = []
      const totalPokemons = 500; // Define the total range of Pokémon (for this example, it's 350)

      // Keep fetching random Pokémon until the desired number (count) is reached
      while (randomPokemons.length < count) {
          const randomId = Math.floor(Math.random() * totalPokemons) + 1; // Generate a random ID between 1 and totalPokemons
          const pokemon = await this.fetchPokemon(randomId); // Fetch the Pokémon by its random ID
          
          // Check if the Pokémon is not already in the array, and if not, add it
          if (!randomPokemons.includes(pokemon)) {
              randomPokemons.push(pokemon);
          }
      }
      this.randomPokemons = randomPokemons; // Return the array of random Pokémon
  }
}
