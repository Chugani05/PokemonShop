export class Pokemon {
    constructor(data) {
        this.name = data.name[0].toUpperCase() + data.name.slice(1);
        this.id = data.id;
        this.health = data.stats[0].base_stat;
        this.attack = data.stats[1].base_stat;
        this.defense = data.stats[2].base_stat;
        this.s_attack = data.stats[3].base_stat;
        this.s_defense = data.stats[4].base_stat;
        this.speed = data.stats[5].base_stat;
        this.front = data.sprites.other.dream_world.front_default;
        this.ability = data.abilities[0].ability.name;
        this.pkm_type = data.types;
    }

    get price() {
        return ((this.health + this.attack + this.defense + this.s_attack + this.s_defense + this.speed) * (60 - 5) / 100).toFixed(2);
    }

    getTypes() {
        return this.pkm_type.map(type => type.type.name).join(' & ');
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
                return 'Unknown Generation';
        }
    }
}
  