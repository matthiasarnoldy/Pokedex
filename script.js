const BASE_URL = "https://pokeapi.co/api/v2/";
const cacheAllPokemon = [];
const allPokemon = [];
let loadDataResponse;
let dialogRef;
let pokemonInfoRef;

function init() {
    loadData("pokemon?limit=40&offset=0")
}

async function loadData(path="") {
    let response = await fetch(BASE_URL + path + ".json")
    let responseAsJson = await response.json();
    responseAsJson.results.forEach(pokemon => cacheAllPokemon.push(pokemon));
    loadDataResponse = responseAsJson;
    console.log(responseAsJson);
    pokemonUrlToPath();
}

function pokemonUrlToPath() {
    cacheAllPokemon.forEach((pokemon) => {
        if (pokemon.url.length > 20) {
            pokemon.url = (pokemon.url.slice(26));
        }
    });
    loadPokemonData();
}

async function loadPokemonData() {
    for (let indexPokeData = 0; indexPokeData < cacheAllPokemon.length; indexPokeData++) {
        let response = await fetch(BASE_URL + cacheAllPokemon[indexPokeData].url);
        console.log(response)
        let responseAsJson = await response.json();
        pushPokemonData(indexPokeData, responseAsJson);
    }
    cacheToAllPokemon();
    console.log(allPokemon)
    renderPokemonCard();
}

function cacheToAllPokemon() {
    cacheAllPokemon.forEach((pokemon) => allPokemon.push(pokemon));
}

function pushPokemonData(indexPokeData, responseAsJson) {
    cacheAllPokemon[indexPokeData].sprites = responseAsJson.sprites.other;
    cacheAllPokemon[indexPokeData].abilities = responseAsJson.abilities;
    cacheAllPokemon[indexPokeData].height = responseAsJson.height;
    cacheAllPokemon[indexPokeData].held_items = responseAsJson.held_items;
    cacheAllPokemon[indexPokeData].id = responseAsJson.id;
    cacheAllPokemon[indexPokeData].species = responseAsJson.species;
    cacheAllPokemon[indexPokeData].stats = responseAsJson.stats;
    cacheAllPokemon[indexPokeData].types = responseAsJson.types;
    cacheAllPokemon[indexPokeData].weight = responseAsJson.weight;
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

function searchPokemon() {
    let searchFunctionRef = document.getElementById('headerSearch');
    let searchFunction = searchFunctionRef.value;
    if (searchFunction.length >= 3) {
        pushPokemonAndRender(searchFunction);
        renderError();
    } else {
        resetPokemonAndRender();
    }
}

function pushPokemonAndRender(searchFunction) {
    allPokemon.splice(0, allPokemon.length);
    cacheAllPokemon.forEach(pokemon => {
        if (pokemon.name.includes(searchFunction)) {
            allPokemon.push(pokemon);
        }
    });
    renderPokemonCard();
}

function renderError() {
    if (allPokemon.length === 0) {
        let pokemonAreaRef = document.getElementById('pokemonArea');
        pokemonAreaRef.innerHTML = getSearchErrorTemplate();
    }
}

function resetPokemonAndRender() {
    allPokemon.splice(0, allPokemon.length);
    cacheToAllPokemon();
    renderPokemonCard();
}

function openPokemon(indexAllPokemon) {
    dialogRef = document.getElementById('pokemonBig');
    dialogRef.classList.add('open');
    document.body.classList.add('bodyOverflowH');
    renderPokemonBig(indexAllPokemon);
    dialogRef.showModal();
    dialogRef.addEventListener('close', () => {
        dialogRef.setAttribute('class', 'pokemonBig');
        document.body.classList.remove('bodyOverflowH');
    });
}

function closePokemon() {
    dialogRef.classList.remove('open');
    document.body.classList.remove('bodyOverflowH');
    dialogRef.close();
}

function renderPokemonBig(indexAllPokemon) {
    dialogRef.innerHTML = getPokemonBigTemplate(indexAllPokemon);
    renderPokemonBigType(indexAllPokemon);
    renderPokemonAbout(indexAllPokemon);
    setPokemonBg(indexAllPokemon);
}

function renderPokemonBigType(indexAllPokemon) {
    let pokemonTypeRef = document.getElementById('pokeBigType');
    for (let indexPokemonType = 0; indexPokemonType < allPokemon[indexAllPokemon].types.length; indexPokemonType++) {
        pokemonTypeRef.innerHTML += getPokemonBigTypeTemplate(indexAllPokemon, indexPokemonType); 
    }
}

function renderPokemonAbout(indexAllPokemon) {
    pokemonInfoRef = document.getElementById('pokemonStats');
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
    pokemonInfoRef.innerHTML = "";
    for (let indexInfo = 0; indexInfo < allPokemon[indexAllPokemon].stats.length; indexInfo++) {
        pokemonInfoRef.innerHTML += getPokemonStatsTemplate(indexAllPokemon, indexInfo);
    }
}

function renderPokemonShiny(indexAllPokemon) {
    pokemonInfoRef.innerHTML = getPokemonShinyTemplate(indexAllPokemon);
}

function setPokemonBg(indexAllPokemon) {
    dialogRef.classList.add(allPokemon[indexAllPokemon].types[0].type.name)
}

function changePokemon(indexAllPokemon, operator) {
    if (indexAllPokemon > 0 && indexAllPokemon < (allPokemon.length - 1)) {
        operator === "-" ? indexAllPokemon-- : indexAllPokemon++;
    } else if (indexAllPokemon === 0) {
        operator === "-" ? indexAllPokemon = allPokemon.length - 1 : indexAllPokemon++;
    } else if (indexAllPokemon === (allPokemon.length - 1)) {
        operator === "-" ? indexAllPokemon-- : indexAllPokemon = 0;
    }
    renderPokemonBig(indexAllPokemon);
}