import { Pokemon } from "./Pokemon.js";

export class PokemonModel {
    constructor() {
        this.pokemons = [];
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

    async loadPokemons() {
        for (let i = 1; i <= 156; i++) {
            const pokemon = await this.fetchPokemon(i);
            pokemon.price = ((5 + pokemon.attack * (20 - 5)) / 100).toFixed(2);
            this.pokemons.push(pokemon);
        }
    }

    getAllPokemons() {
        return this.pokemons;
    }

    async fetchRandomPokemons(count) {
      const randomPokemons = [];
      const totalPokemons = 350;

      while (randomPokemons.length < count) {
          const randomId = Math.floor(Math.random() * totalPokemons) + 1;
          const pokemon = await this.fetchPokemon(randomId);
          if (!randomPokemons.includes(pokemon)) {
              randomPokemons.push(pokemon);
          }
      }
      return randomPokemons;
  }
}
