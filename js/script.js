// selecciono boton del DOM
const button = document.querySelector("button");

button.addEventListener("click", () => {
    // shows filters
    document.querySelectorAll("#filtro").forEach( (e) => {
        // console.log(e);
        e.style.visibility = "visible";
    });

    // shows bottons
    document.querySelectorAll("#wish_list_btn").forEach( (e) => {
        // console.log(e);
        e.style.visibility = "visible";
    });

    // shows pokemon list
    let pokemonList = document.querySelector(".pokemonList")
        // console.log(pokemonList);
    pokemonList.style.visibility = "visible";

    showPokemons();

});


function showPokemons() {
    document.querySelector(".loadingData").style.visibility = "visible";
}