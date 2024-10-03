// Exportamos por defecto la clase Pokemon
export class Pokemon {
  // Constructor que recibe como parámetro data que contiene los datos de los Pokemon que obtenemos desde la API
  constructor(data) {
    this.name = data.name; // Nombre del pokemon
    this.id = data.id; // Id del pokemon
    this.attack = data.stats[1].base_stat;
    this.price = 0;
    this.weight = data.weight; // Pokemon peso
    this.pkm_front = data.sprites.front_default; // Pokemon de frente
    this.pkm_back = data.sprites.back_default; // Pokemon de espaldas
    this.pkm_type = data.types; // Tipo del pokemon (Devuelve un array)
  }
}
