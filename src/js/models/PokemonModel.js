import { Pokemon } from "./Pokemon.js";

export class PokemonModel {
    constructor() {
        const randomPokemons = [];
    }

    async fetchPokemon(id) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
            const data = await response.json(); 
            return new Pokemon(data);
        } catch (error) {
            throw new Error(`Error fetching Pokémon with ID ${id}: ${error}`);
        }
    }

    getAllPokemons() {
        return this.randomPokemons;
    }

    async fetchRandomPokemons(count) {
        const randomPokemons = []
      const totalPokemons = 500;

      while (randomPokemons.length < count) {
          const randomId = Math.floor(Math.random() * totalPokemons) + 1;
          const pokemon = await this.fetchPokemon(randomId);
          
          if (!randomPokemons.includes(pokemon)) {
              randomPokemons.push(pokemon);
            }
        }
      this.randomPokemons = randomPokemons;
    }
}
