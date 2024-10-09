export class PokemonView {
    constructor() {
        this.pokedex = document.getElementById("pokedex"); // Element to display Pokémon
        this.loadingMessage = document.querySelector(".cargandoDatos"); // Element to show a loading message
        this.consoleElements = document.querySelectorAll(".input, .btnMenu"); // Console UI elements
    }
  
    // Show loading screen by hiding the button and displaying the loading message
    showLoading() {
        document.querySelector("#button").style.visibility = "hidden"; // Hide the button
        this.loadingMessage.style.visibility = "visible"; // Show the loading message
        this.pokedex.style.visibility = "hidden"; // Hide the pokedex until loading is complete
    }
  
    // Hide the loading screen and display the Pokedex
    hideLoading() {
        this.loadingMessage.style.visibility = "hidden"; // Hide the loading message
        this.pokedex.style.visibility = "visible"; // Show the Pokedex
    }
  
    // Show console-related elements
    showConsole() {
        this.consoleElements.forEach((e) => (e.style.visibility = "visible")); // Make console elements visible
    }
  
    // Function to display Pokémon on the screen
    displayPokemons(pokemons, onPokemonClick) {
        this.pokedex.innerHTML = ""; // Clear the Pokedex display before adding new Pokémon
  
        // Iterate over each Pokémon and create a card for each one
        pokemons.forEach((pokemon) => {
            // Get the types of the Pokémon and join them into a string
            let types = pokemon.pkm_type.map((t) => t.type.name).join(" & ");
            
            // Create a div element for the Pokémon card
            const pokemonCard = document.createElement("div");
            pokemonCard.classList.add("card"); // Add the card class
            pokemonCard.id = `pokemon-${pokemon.id}`; // Set the card's ID using the Pokémon's ID
            
            // Add the inner HTML structure for the Pokémon's card
            pokemonCard.innerHTML += `
                <div class="card-container">
                    <div class="card">
                        <div class="card-front">
                            <div class="name">${pokemon.name}</div>  <!-- Pokémon name -->
                            <img class="front" src="${pokemon.front}" width=90px height=100px>  <!-- Front sprite -->
                            <div class="type">Type: ${types}</div>  <!-- Pokémon types -->
                            <div class="generation">Generation:<br>${pokemon.generation}</div>  <!-- Generation info -->
                            <div class="price">Price: ${pokemon.price}€</div>  <!-- Price of Pokémon -->
                        </div>
                        <div class="card-back">
                            <div class="attack">
                                Health: ${pokemon.health}<br>  <!-- Pokémon's health stat -->
                                Attack: ${pokemon.attack}<br>  <!-- Pokémon's attack stat -->
                                Defense: ${pokemon.defense}<br>  <!-- Pokémon's defense stat -->
                                Special attack: ${pokemon.s_attack}<br>  <!-- Pokémon's special attack stat -->
                                Special defense: ${pokemon.s_defense}<br>  <!-- Pokémon's special defense stat -->
                                Speed: ${pokemon.speed}  <!-- Pokémon's speed stat -->
                            </div>
                            <div class="ability">Ability: ${pokemon.ability}</div>  <!-- Pokémon's ability -->
                        </div>
                    </div>
                </div>`;
  
            // Add an event listener for when the card is clicked, passing the Pokémon's ID
            pokemonCard.addEventListener("click", () => {
                onPokemonClick(pokemon.id); // Trigger callback with the selected Pokémon's ID
            });
  
            // Append the card to the Pokedex element
            this.pokedex.appendChild(pokemonCard);
        });
    }
  }
  