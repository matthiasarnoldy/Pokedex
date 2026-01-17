function getPokemonCardTemplate(indexAllPokemon) {
    return `
        <div onclick="openPokemon(${indexAllPokemon})" class="pokemon ${allPokemon[indexAllPokemon].types[0].type.name}">
            <header class="pokeId"><h3>#${indexAllPokemon + 1}</h3></header>
            <h2 class="pokeName">${(allPokemon[indexAllPokemon].name).toUpperCase()}</h2>
            <section class="pokeTypeImg">
                <div id="pokeType${indexAllPokemon}" class="pokeType"></div>
                <figure><img loading="lazy" src="${allPokemon[indexAllPokemon].sprites.other.dream_world.front_default}" alt="${(allPokemon[indexAllPokemon].name)}" class="pokeImg"></figure>
            </section>
        </div>
    `;
}

function getPokemonTypeTemplate(indexAllPokemon, indexPokemonType) {
    return `
        <span class="pokeTypeBox">${allPokemon[indexAllPokemon].types[indexPokemonType].type.name}</span>
    `;
}

function getPokemonBigTemplate(indexAllPokemon) {
    return `
        <section class="closeButton">
            <svg onclick="closePokemon()" class="closeIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 
                469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 
                502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 
                124.8 457.8 137.3L320.5 274.7L183.1 137.4z"/>
            </svg>
        </section>
        <header class="pokemonBigHeader">
            <h2 class="pokeName">${(allPokemon[indexAllPokemon].name).toUpperCase()}</h2>
            <h3 class="pokeId">#${indexAllPokemon + 1}</h3>
        </header>
        <section class="pokemonPresentation">
            <div id="pokeBigType" class="pokeBigType"></div>
            <figure><img loading="lazy" src="${allPokemon[indexAllPokemon].sprites.other.dream_world.front_default}" alt="${(allPokemon[indexAllPokemon].name)}" class="pokeImgBig"></figure>
        </section>
        <section class="pokemonInfo">
            <ul class="pokemonNav">
                <li onclick="renderPokemonAbout(${indexAllPokemon})" id="infoAbout" class="pokemonHeaderInfo"><h4>About</h4></li>
                <li onclick="renderPokemonStats(${indexAllPokemon})" id="infoStats" class="pokemonHeaderInfo"><h4>Stats</h4></li>
                <li onclick="renderPokemonShiny(${indexAllPokemon})" id="infoAbilities" class="pokemonHeaderInfo"><h4>Shiny</h4></li>
            </ul>
            <main id="pokemonStats" class="pokemonStats"></main>
        </section>
    `;
}

function getPokemonAboutTemplate(indexAllPokemon) {
    return `
        <span class="statsList"><h4>Species</h4><p>${allPokemon[indexAllPokemon].species.name}</p></span>
        <span class="statsList"><h4>Height</h4><p>${(allPokemon[indexAllPokemon].height) * 10}cm</p></span>
        <span class="statsList"><h4>Weight</h4><p>${((allPokemon[indexAllPokemon].weight) / 10).toFixed(1).replace('\.', ',')}kg</p></span>
        <span class="statsList"><h4>Abilities</h4><p id="aboutAbilities"></p></span>
    `;
}

function getPokemonAbilitiesTemplate(indexAllPokemon, indexAbilities) {
    return `
        ${allPokemon[indexAllPokemon].abilities[indexAbilities].ability.name}<br>
    `;
}

function getPokemonStatsTemplate(indexAllPokemon, indexInfo) {
    return `
        <span class="statsList"><h4>${allPokemon[indexAllPokemon].stats[indexInfo].stat.name}</h4><p>${allPokemon[indexAllPokemon].stats[indexInfo].base_stat}</p></span>
    `;
}

function getPokemonShinyTemplate(indexAllPokemon) {
    return `
        <figure><img loading="lazy" src="${allPokemon[indexAllPokemon].sprites.other.home.front_shiny}" alt="${(allPokemon[indexAllPokemon].name)}" class="pokeImgBig"></figure>
    `;
}

function getPokemonBigTypeTemplate(indexAllPokemon, indexPokemonType) {
    return `
        <span class="pokeTypeBig"><h4>${allPokemon[indexAllPokemon].types[indexPokemonType].type.name}</h4></span>
    `;
}