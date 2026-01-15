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
        <figure><img loading="lazy" src="${allPokemon[indexAllPokemon].sprites.other.dream_world.front_default}" alt="${(allPokemon[indexAllPokemon].name)}" class="pokeImg"></figure>
    `;
}