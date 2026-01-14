function getPokemonCardTemplate(pokemon) {
    return `
        <div class="pokemon">
            <header class="pokeId"><h3>#1</h3></header>
            <h2 class="pokeName">${(pokemon.name).toUpperCase()}</h2>
            <section class="pokeTypeImg">
                <div class="pokeType">
                    <span class="pokeTypeBox">Grass</span>
                    <span class="pokeTypeBox">Poison</span>
                </div>
                <figure><img src="./assets/icons/favicon.png" alt="" class="pokeImg"></figure>
            </section>
        </div>
    `;
}