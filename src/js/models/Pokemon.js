// Export the Pokemon class as the default export
export class Pokemon {
    // Constructor that receives 'data' as a parameter, which contains the Pokémon data retrieved from the API
    constructor(data) {
        this.name = data.name; // Pokémon's name
        this.id = data.id; // Pokémon's ID
        this.health = data.stats[0].base_stat; // Pokémon's health stat
        this.attack = data.stats[1].base_stat; // Pokémon's attack stat
        this.defense = data.stats[2].base_stat; // Pokémon's defense stat
        this.s_attack = data.stats[3].base_stat; // Pokémon's special attack stat
        this.s_defense = data.stats[4].base_stat; // Pokémon's special defense stat
        this.speed = data.stats[5].base_stat; // Pokémon's speed stat
        this.price = 0;
        this.front = data.sprites.other.dream_world.front_default; // Pokémon's front-facing sprite (Dream World version)
        this.ability = data.abilities[0].ability.name; // Pokémon's ability (the first ability in the array)
        this.pkm_type = data.types; // Pokémon's type (returns an array of types)
        this.generation = getPokemonGeneration(this.id); // Generation of the Pokémon, determined by ID

    // Function that returns a string with the Pokémon's generation based on its ID
    function getPokemonGeneration(id) {
        switch (true) {
            case (id >= 1 && id <= 151):
                return 'Generation 1 (Kanto)';
            case (id >= 152 && id <= 251):
                return 'Generation 2 (Johto)';
            case (id >= 252 && id <= 386):
                return 'Generation 3 (Hoenn)';
            case (id >= 387 && id <= 493):
                return 'Generation 4 (Sinnoh)';
            case (id >= 494 && id <= 649):
                return 'Generation 5 (Unova)';
            case (id >= 650 && id <= 721):
                return 'Generation 6 (Kalos)';
            case (id >= 722 && id <= 809):
                return 'Generation 7 (Alola)';
            case (id >= 810 && id <= 898):
                return 'Generation 8 (Galar)';
            case (id >= 899 && id <= 1010):
                return 'Generation 9 (Paldea)';
            default:
                return 'Unknown Generation'; // Fallback for Pokémon IDs outside the expected range
        }
      }
    }
  }
  