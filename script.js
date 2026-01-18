const BASE_URL = "https://pokeapi.co/api/v2/";
const allPokemon = [];
let loadDataResponse;

function init() {
    // loadData("pokemon?limit=40&offset=232")
    loadData("pokemon?limit=40&offset=0")
}

async function loadData(path="") {
    let response = await fetch(BASE_URL + path + ".json")
    let responseAsJson = await response.json();
    responseAsJson.results.forEach(pokemon => allPokemon.push(pokemon));
    loadDataResponse = responseAsJson;
    console.log(responseAsJson);
    pokemonUrlToPath();
}

function pokemonUrlToPath() {
    allPokemon.forEach((pokemon) => {
        if (pokemon.url.length > 20) {
            pokemon.url = (pokemon.url.slice(26));
        }
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
    allPokemon[indexPokeData].species = responseAsJson.species;
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

async function loadMoreData(path="") {
    let response = await fetch(path + ".json")
    let responseAsJson = await response.json();
    loadDataResponse = responseAsJson;
    responseAsJson.results.forEach(pokemon => allPokemon.push(pokemon));
    pokemonUrlToPath();
}

// function searchPokemon() {
//     let searchFunctionRef = document.getElementById('headerSearch');
//     let searchFunction = searchFunctionRef.value;
//     let nameKey = [];
//     allPokemon.forEach(pokemon => nameKey.push(pokemon.name))
//     console.log(nameKey)
//     if (searchFunction.length >= 3) {
//         nameKey.find(() => {
//             console.log(searchFunction);
//         })
//     }
// }

function openPokemon(indexAllPokemon) {
    let dialogRef = document.getElementById('pokemonBig');
    dialogRef.classList.add('open');
    document.body.classList.add('bodyOverflowH');
    renderPokemonBig(dialogRef, indexAllPokemon);
    dialogRef.showModal();
    dialogRef.addEventListener('close', () => {
        dialogRef.setAttribute('class', 'pokemonBig');
        document.body.classList.remove('bodyOverflowH');
    });
}

function closePokemon() {
    let dialogRef = document.getElementById('pokemonBig');
    dialogRef.classList.remove('open');
    document.body.classList.remove('bodyOverflowH');
    dialogRef.close();
}

function renderPokemonBig(dialogRef, indexAllPokemon) {
    dialogRef.innerHTML = getPokemonBigTemplate(indexAllPokemon);
    renderPokemonBigType(indexAllPokemon);
    renderPokemonAbout(indexAllPokemon);
    setPokemonBg(dialogRef, indexAllPokemon);
}

function renderPokemonBigType(indexAllPokemon) {
    let pokemonTypeRef = document.getElementById('pokeBigType');
    for (let indexPokemonType = 0; indexPokemonType < allPokemon[indexAllPokemon].types.length; indexPokemonType++) {
        pokemonTypeRef.innerHTML += getPokemonBigTypeTemplate(indexAllPokemon, indexPokemonType); 
    }
}

function renderPokemonAbout(indexAllPokemon) {
    let pokemonInfoRef = document.getElementById('pokemonStats');
    pokemonInfoRef.innerHTML = "";
    pokemonInfoRef.innerHTML = getPokemonAboutTemplate(indexAllPokemon);
    renderPokemonAboutAbilities(indexAllPokemon);
}

function renderPokemonAboutAbilities(indexAllPokemon) {
    let aboutAbilitiesRef = document.getElementById('aboutAbilities');
    for (let indexAbilities = 0; indexAbilities < allPokemon[indexAllPokemon].abilities.length; indexAbilities++) {
        aboutAbilitiesRef.innerHTML += getPokemonAbilitiesTemplate(indexAllPokemon, indexAbilities)
    }
}

function renderPokemonStats(indexAllPokemon) {
    let pokemonInfoRef = document.getElementById('pokemonStats');
    pokemonInfoRef.innerHTML = "";
    for (let indexInfo = 0; indexInfo < allPokemon[indexAllPokemon].stats.length; indexInfo++) {
        pokemonInfoRef.innerHTML += getPokemonStatsTemplate(indexAllPokemon, indexInfo);
    }
}

function renderPokemonShiny(indexAllPokemon) {
    let pokemonInfoRef = document.getElementById('pokemonStats');
    pokemonInfoRef.innerHTML = getPokemonShinyTemplate(indexAllPokemon);
}

function setPokemonBg(dialogRef, indexAllPokemon) {
    dialogRef.classList.add(allPokemon[indexAllPokemon].types[0].type.name)
}