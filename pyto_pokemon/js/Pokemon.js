// Creo clase
export default class Pokemon {
    // Creo el constructor
    constructor(data){
        this.name = data.name;                                  // Nombre del pokemon
        this.id = data.id;                                      // Ide del pokemon
        this.pkm_front = data.sprites.front_default;            // Pokemon de frente
        this.pkm_first_move = data.moves[0].move.name;          // Primer movimiento del pokemon
        this.pkm_ability = data.abilities[0].ability.name;      // Especie del pokemon
        this.pkm_type = data.types;                             // Tipo de pokemon
    }
}