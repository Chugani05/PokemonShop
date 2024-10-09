export class PokemonView {
  constructor() {
      this.pokedex = document.getElementById("pokedex");
      this.loadingMessage = document.querySelector(".cargandoDatos");
      this.consoleElements = document.querySelectorAll(".input, .btnMenu");
  }

  showLoading() {
      document.querySelector("#button").style.visibility = "hidden";
      this.loadingMessage.style.visibility = "visible";
      this.pokedex.style.visibility = "hidden";
  }

  hideLoading() {
      this.loadingMessage.style.visibility = "hidden";
      this.pokedex.style.visibility = "visible";
  }

  showConsole() {
      this.consoleElements.forEach((e) => (e.style.visibility = "visible"));
  }

  displayPokemons(pokemons, onPokemonClick) {
      this.pokedex.innerHTML = "";
      pokemons.forEach((pokemon) => {
          let types = pokemon.pkm_type.map((t) => t.type.name).join(" & ");
          const pokemonCard = document.createElement("div");
          pokemonCard.classList.add("card");
          pokemonCard.id = `pokemon-${pokemon.id}`;
          pokemonCard.innerHTML += `
              <div class="card-container">
                  <div class="card">
                      <div class="card-front">
                          <div class="name">${pokemon.name}</div>
                          <img class="front" src="${pokemon.front}" width=90px height=100px>
                          <div class="type">Type: ${types}</div>
                          <div class="generation">Generation:<br>${pokemon.generation}</div>
                          <div class="price">Price: ${pokemon.price}€</div>
                      </div>
                      <div class="card-back">
                          <div class="attack">
                              Health: ${pokemon.health}<br> 
                              Attack: ${pokemon.attack}<br> 
                              Defense: ${pokemon.defense}<br> 
                              Special attack: ${pokemon.s_attack}<br> 
                              Special defense: ${pokemon.s_defense}<br> 
                              Speed: ${pokemon.speed}
                          </div>
                          <div class="ability">Ability: ${pokemon.ability}</div>
                      </div>
                  </div>
              </div>`;

          pokemonCard.addEventListener("click", () => {
              onPokemonClick(pokemon.id);
          });

          this.pokedex.appendChild(pokemonCard);
      });
  }
}
