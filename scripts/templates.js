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
            <h3 class="pokeId">#${indexAllPokemon + 1}</h3>
        </header>
        <section class="pokemonPresentation">
            <div id="pokeBigType" class="pokeBigType"></div>
            <figure><img loading="lazy" src="${allPokemon[indexAllPokemon].sprites.other.dream_world.front_default}" alt="${(allPokemon[indexAllPokemon].name)}" class="pokeImgBig"></figure>
        </section>
        <section class="pokemonInfo">
            <ul class="pokemonNav">
                <li onclick="(infoAbout)" id="infoAbout" class="pokemonHeaderInfo"><h4>About</h4></li>
                <li onclick="(infoStats)" id="infoStats" class="pokemonHeaderInfo pokemonNavActive"><h4>Stats</h4></li>
                <li onclick="(infoAbilities)" id="infoAbilities" class="pokemonHeaderInfo"><h4>Abilities</h4></li>
                <li onclick="(infoEvolutions)" id="infoEvolutions" class="pokemonHeaderInfo"><h4>Evolutions</h4></li>
            </ul>
            <main id="pokemonStats" class="pokemonStats"></main>
        </section>
    `;
}

function getPokemonInfoTemplate(indexAllPokemon, indexInfo) {
    return `
        <span class="statsList"><h4>${allPokemon[indexAllPokemon].stats[indexInfo].stat.name}</h4><p>${allPokemon[indexAllPokemon].stats[indexInfo].base_stat}</p></span>
    `;
}

function getPokemonBigTypeTemplate(indexAllPokemon, indexPokemonType) {
    return `
        <span class="pokeTypeBox">${allPokemon[indexAllPokemon].types[indexPokemonType].type.name}</span>
    `;
}