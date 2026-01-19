const BASE_URL = "https://pokeapi.co/api/v2/";
const cacheAllPokemon = [];
const allPokemon = [];
let loadDataResponse;
let dialogRef;
let pokemonInfoRef;

function init() {
    loadData("pokemon?limit=20&offset=0")
}

async function loadData(path="") {
    let response = await fetch(BASE_URL + path + ".json")
    let responseAsJson = await response.json();
    responseAsJson.results.forEach(pokemon => cacheAllPokemon.push(pokemon));
    loadDataResponse = responseAsJson;
    pokemonUrlToPath();
}

function pokemonUrlToPath() {
    cacheAllPokemon.forEach((pokemon) => {
        if (pokemon.url.length > 20) {
            pokemon.url = (pokemon.url.slice(26));
        }
    })
    loadPokemonData();
}

async function loadPokemonData() {
    for (let indexPokeData = 0; indexPokeData < cacheAllPokemon.length; indexPokeData++) {
        if (Object.keys(cacheAllPokemon[indexPokeData]).length < 3) {
            let response = await fetch(BASE_URL + cacheAllPokemon[indexPokeData].url);
            let responseAsJson = await response.json();
            pushPokemonData(indexPokeData, responseAsJson);
        }
    }
    hideLoadingScreen();
    cacheToAllPokemon();
}

function cacheToAllPokemon() {
    showLoadMoreButton();
    clearAllPokemon();
    cacheAllPokemon.forEach((pokemon) => allPokemon.push(pokemon));
    renderPokemonCard();
}

function hideLoadingScreen() {
    let loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.classList.add('loadingScreenHidden');
    showLoadMoreButton();
}

function showLoadingScreen() {
    let loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.classList.remove('loadingScreenHidden');
    hideLoadMoreButton();
}

function hideLoadMoreButton() {
    let button = document.getElementById('loadMorePokemon');
    button.style.display = "none";
}

function showLoadMoreButton() {
    let button = document.getElementById('loadMorePokemon');
    button.style.display = "flex";
}

function clearAllPokemon() {
    allPokemon.splice(0, allPokemon.length);
}

function pushPokemonData(indexPokeData, responseAsJson) {
    cacheAllPokemon[indexPokeData].sprites = responseAsJson.sprites.other;
    cacheAllPokemon[indexPokeData].abilities = responseAsJson.abilities;
    cacheAllPokemon[indexPokeData].height = responseAsJson.height;
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
    showLoadingScreen();
    let response = await fetch(path + ".json")
    let responseAsJson = await response.json();
    clearAllPokemon();
    loadDataResponse = responseAsJson;
    responseAsJson.results.forEach(pokemon => cacheAllPokemon.push(pokemon));
    pokemonUrlToPath();
}

function searchPokemon() {
    let searchFunctionRef = document.getElementById('headerSearch');
    let searchFunction = searchFunctionRef.value;
    if (searchFunction.length >= 3) {
        hideLoadMoreButton();
        pushPokemonAndRender(searchFunction);
        renderError();
    } else {
        showLoadMoreButton();
        resetPokemonAndRender();
    }
    searchFunctionRef.value = '';
}

function pushPokemonAndRender(searchFunction) {
    clearAllPokemon();
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
    cacheToAllPokemon();
}

function openPokemon(indexAllPokemon) {
    dialogRef = document.getElementById('pokemonBig');
    dialogRef.classList.add('open');
    document.body.classList.add('bodyOverflowH');
    renderDialog(indexAllPokemon);
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

function renderDialog(indexAllPokemon) {
    dialogRef.innerHTML = getPokemonDialogTemplate(indexAllPokemon);
    renderDialogTypeType(indexAllPokemon);
    setAbout(indexAllPokemon);
    setPokemonBg(indexAllPokemon);
}

function renderDialogTypeType(indexAllPokemon) {
    let pokemonTypeRef = document.getElementById('pokeBigType');
    for (let indexPokemonType = 0; indexPokemonType < allPokemon[indexAllPokemon].types.length; indexPokemonType++) {
        pokemonTypeRef.innerHTML += getPokemonDialogTypeTemplate(indexAllPokemon, indexPokemonType); 
    }
}

function setAbout(indexAllPokemon) {
    pokemonInfoRef = document.getElementById('pokemonStats');
    pokemonInfoRef.innerHTML = getPokemonAboutTemplate(indexAllPokemon);
    setAbilities(indexAllPokemon);
}

function setAbilities(indexAllPokemon) {
    let aboutAbilitiesRef = document.getElementById('aboutAbilities');
    for (let indexAbilities = 0; indexAbilities < allPokemon[indexAllPokemon].abilities.length; indexAbilities++) {
        aboutAbilitiesRef.innerHTML += getPokemonAbilitiesTemplate(indexAllPokemon, indexAbilities)
    }
}

function setStats(indexAllPokemon) {
    pokemonInfoRef.innerHTML = "";
    for (let indexInfo = 0; indexInfo < allPokemon[indexAllPokemon].stats.length; indexInfo++) {
        pokemonInfoRef.innerHTML += getPokemonStatsTemplate(indexAllPokemon, indexInfo);
    }
}

function setShiny(indexAllPokemon) {
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
    renderDialog(indexAllPokemon);
}