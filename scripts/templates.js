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
        <header class="pokemonBigHeader">
            <h2 class="pokeName">${(allPokemon[indexAllPokemon].name).toUpperCase()}</h2>
            <h3 class="pokeId pokeIdBig">#${indexAllPokemon + 1}</h3>
            <svg onclick="closePokemon()" class="closeIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 
                469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 
                502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 
                124.8 457.8 137.3L320.5 274.7L183.1 137.4z"/>
            </svg>
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
            <footer class="navigationArrows">
                <svg class="arrowIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M112 320C112 205.1 205.1 112 320 112C434.9 112 528 205.1 528 320C528 434.9 434.9 528 320 528C205.1 528 112 434.9 112 320zM576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576C461.4 576 576 461.4 576 320zM188.7 308.7C182.5 314.9 182.5 325.1 188.7 331.3L292.7 435.3C297.3 439.9 304.2 441.2 310.1 438.8C316 436.4 320 430.5 320 424L320 352L424 352C437.3 352 448 341.3 448 328L448 312C448 298.7 437.3 288 424 288L320 288L320 216C320 209.5 316.1 203.7 310.1 201.2C304.1 198.7 297.2 200.1 292.7 204.7L188.7 308.7z"/></svg>
                <svg class="arrowIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M528 320C528 434.9 434.9 528 320 528C205.1 528 112 434.9 112 320C112 205.1 205.1 112 320 112C434.9 112 528 205.1 528 320zM64 320C64 461.4 178.6 576 320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320zM451.3 331.3C457.5 325.1 457.5 314.9 451.3 308.7L347.3 204.7C342.7 200.1 335.8 198.8 329.9 201.2C324 203.6 320 209.5 320 216L320 288L216 288C202.7 288 192 298.7 192 312L192 328C192 341.3 202.7 352 216 352L320 352L320 424C320 430.5 323.9 436.3 329.9 438.8C335.9 441.3 342.8 439.9 347.3 435.3L451.3 331.3z"/></svg>
            </footer>
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
        <figure><img loading="lazy" src="${allPokemon[indexAllPokemon].sprites.other.home.front_shiny}" alt="${(allPokemon[indexAllPokemon].name)}" class="pokeImgShiny"></figure>
    `;
}

function getPokemonBigTypeTemplate(indexAllPokemon, indexPokemonType) {
    return `
        <span class="pokeTypeBig"><h4>${allPokemon[indexAllPokemon].types[indexPokemonType].type.name}</h4></span>
    `;
}