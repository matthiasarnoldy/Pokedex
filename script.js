const BASE_URL = "https://pokeapi.co/api/v2/";
const allPokemon = [];

function init() {
    loadData("pokemon?limit=25&offset=24")
}

async function loadData(path="") {
    let response = await fetch(BASE_URL + path + ".json")
    let responseAsJson = await response.json();
    responseAsJson.results.forEach(pokemon => allPokemon.push(pokemon));
    // console.log(responseAsJson);
    // loadMoreData("pokemon?limit=25&offset=49") // path durch responseAsJson.next ersetzen?
    pokemonUrlToPath();
}

function pokemonUrlToPath() {
    allPokemon.forEach((pokemon) => {
        pokemon.url = (pokemon.url.slice(26));
    });
    console.log(allPokemon)
    renderPokemonCard();
}

function renderPokemonCard() {
    let pokemonAreaRef = document.getElementById('pokemonArea');
    pokemonAreaRef.innerHTML = '';
    allPokemon.forEach((pokemon) => {
        pokemonAreaRef.innerHTML += getPokemonCardTemplate(pokemon);
    });
}

// async function loadMoreData(path="") {
//     let response = await fetch(BASE_URL + path + ".json")
//     let responseAsJson = await response.json();
//     responseAsJson.results.forEach(pokemon => allPokemon.push(pokemon));
//     console.log(allPokemon);
// }