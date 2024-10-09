import { PokemonController } from "./controllers/PokemonController.js";

// Wait until the DOM content is fully loaded before initializing the controller
document.addEventListener("DOMContentLoaded", () => {
  // Create a new instance of PokemonController
  const controller = new PokemonController();
});
