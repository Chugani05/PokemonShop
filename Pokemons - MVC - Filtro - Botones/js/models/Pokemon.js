// Exportamos por defecto la clase Pokemon
export class Pokemon {
  // Constructor que recibe como parámetro data que contiene los datos de los Pokemon que obtenemos desde la API
  constructor(data) {
    this.name = data.name; // Nombre del pokemon
    this.id = data.id; // Id del pokemon
    this.attack = data.stats[1].base_stat;
    this.price = 0;
    this.front = data.sprites.other.dream_world.front_default; // Pokemon de frente
    this.ability = data.abilities[0].ability.name;      // Especie del pokemon
    this.first_move = data.moves[0].move.name;          // Primer movimiento del pokemon
    this.pkm_type = data.types; // Tipo del pokemon (Devuelve un array)
    this.generation = getPokemonGeneration(this.id);

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
              return 'Unknown Generation';
      }
  }
  }
}
