const BASE_URL = "https://pokeapi.co/api/v2/";
const allPokemon = [];

function init() {
    loadData("pokemon?limit=20&offset=232")
}

async function loadData(path="") {
    let response = await fetch(BASE_URL + path + ".json")
    let responseAsJson = await response.json();
    responseAsJson.results.forEach(pokemon => allPokemon.push(pokemon));
    // console.log(responseAsJson);
    // loadMoreData("pokemon?limit=20&offset=24") // path durch responseAsJson.next ersetzen?
    pokemonUrlToPath();
}

function pokemonUrlToPath() {
    allPokemon.forEach((pokemon) => {
        pokemon.url = (pokemon.url.slice(26));
    });
    loadPokemonData();
}

async function loadPokemonData() {
    let path = "";
    let response;
    let responseAsJson;
    for (let indexPokeData = 0; indexPokeData < allPokemon.length; indexPokeData++) {
        path = allPokemon[indexPokeData].url;
        response = await fetch(BASE_URL + path);
        responseAsJson = await response.json();
        pushPokemonData(indexPokeData, responseAsJson);
    }
    console.log(allPokemon)
    renderPokemonCard();
}

function pushPokemonData(indexPokeData, responseAsJson) {
    allPokemon[indexPokeData].abilities = responseAsJson.abilities;
    allPokemon[indexPokeData].height = responseAsJson.height;
    allPokemon[indexPokeData].held_items = responseAsJson.held_items;
    allPokemon[indexPokeData].id = responseAsJson.id;
    allPokemon[indexPokeData].sprites = responseAsJson.sprites;
    allPokemon[indexPokeData].stats = responseAsJson.stats;
    allPokemon[indexPokeData].types = responseAsJson.types;
    allPokemon[indexPokeData].weight = responseAsJson.weight;
}

function renderPokemonCard() {
    let pokemonAreaRef = document.getElementById('pokemonArea');
    pokemonAreaRef.innerHTML = '';
    for (let indexAllPokemon = 0; indexAllPokemon < allPokemon.length; indexAllPokemon++) {
        pokemonAreaRef.innerHTML += getPokemonCardTemplate(indexAllPokemon);
        renderPokemonCardType(indexAllPokemon);
    }
}

function renderPokemonCardType(indexAllPokemon) {
    let pokemonTypeRef = document.getElementById(`pokeType${indexAllPokemon}`);
    pokemonTypeRef.innerHTML = '';
    for (let indexPokemonType = 0; indexPokemonType < allPokemon[indexAllPokemon].types.length; indexPokemonType++) {
        pokemonTypeRef.innerHTML += getPokemonTypeTemplate(indexAllPokemon, indexPokemonType);
    }
}

// async function loadMoreData(path="") {
//     let response = await fetch(BASE_URL + path + ".json")
//     let responseAsJson = await response.json();
//     responseAsJson.results.forEach(pokemon => allPokemon.push(pokemon));
//     console.log(allPokemon);
// }

function openPokemon(indexAllPokemon) {
    console.log(indexAllPokemon)
}