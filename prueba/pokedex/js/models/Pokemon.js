// Export the Pokemon class as the default export
export class Pokemon {
    // Constructor that receives 'data' as a parameter, which contains the Pokémon data retrieved from the API
    constructor(data) {
        this.name = data.name[0].toUpperCase() + data.name.slice(1); // Pokémon's name
        this.id = data.id; // Pokémon's ID
        this.health = data.stats[0].base_stat; // Pokémon's health stat
        this.attack = data.stats[1].base_stat; // Pokémon's attack stat
        this.defense = data.stats[2].base_stat; // Pokémon's defense stat
        this.s_attack = data.stats[3].base_stat; // Pokémon's special attack stat
        this.s_defense = data.stats[4].base_stat; // Pokémon's special defense stat
        this.speed = data.stats[5].base_stat; // Pokémon's speed stat
        this.front = data.sprites.other.dream_world.front_default; // Pokémon's front-facing sprite (Dream World version)
        this.ability = data.abilities[0].ability.name; // Pokémon's ability (the first ability in the array)
        this.pkm_type = data.types; // Pokémon's type (returns an array of types)
        // this.generation = getPokemonGeneration(this.id); // Generation of the Pokémon, determined by ID
    }

    get price() {
        return ((this.health + this.attack + this.defense + this.s_attack + this.s_defense + this.speed) * (60 - 5) / 100).toFixed(2);
    }

    get generation() {
        switch (true) {
            case (this.id >= 1 && this.id <= 151):
                return 'Generation 1 (Kanto)';
            case (this.id >= 152 && this.id <= 251):
                return 'Generation 2 (Johto)';
            case (this.id >= 252 && this.id <= 386):
                return 'Generation 3 (Hoenn)';
            case (this.id >= 387 && this.id <= 493):
                return 'Generation 4 (Sinnoh)';
            case (this.id >= 494 && this.id <= 649):
                return 'Generation 5 (Unova)';
            case (this.id >= 650 && this.id <= 721):
                return 'Generation 6 (Kalos)';
            case (this.id >= 722 && this.id <= 809):
                return 'Generation 7 (Alola)';
            case (this.id >= 810 && this.id <= 898):
                return 'Generation 8 (Galar)';
            case (this.id >= 899 && this.id <= 1010):
                return 'Generation 9 (Paldea)';
            default:
                return 'Unknown Generation'; // Fallback for Pokémon IDs outside the expected range
        }
    }
}
  