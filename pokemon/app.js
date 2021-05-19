const colores = {
    fire: '#f42b03',
    grass: '#799431',
    electric: '#ffff3f',
    water: '#023e8a',
    ground: '#603808',
    rock: '#495057',
    fairy: '#e05780',
    poison: '#c77dff',
    bug: '#1a4301',
    dragon: '#240046',
    psychic: '#f3c4fb',
    flying: '#adb5bd',
    fighting: '#660708',
    normal: '#ffffff',
    ghost: '#d8e2dc',
    steel: '#7c90a0',
    ice: '#c0fdff',
    steel: '#adb5bd',
    sinister: '#463f3a',
    dark: '#3c6e71',
}

const tipoPrincipal = Object.keys(colores);

const contenedor = document.querySelector('#contenedor');
const numeroDePokemon = 898;

const esperarPokemon = async () => {
    for(let i = 1; i <= numeroDePokemon; i++){
        await obtenerPokemon (i);
    }
}

const obtenerPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const respuesta = await fetch(url);
    const pokemon = await respuesta.json();
    crearCarta(pokemon);
    console.log(pokemon)
}

const crearCarta = (pokemon) => {
    const pokemonDiv = document.createElement('div');
    const tipoPokemon = pokemon.types.map(type => type.type.name)
    const tipo = tipoPrincipal.find(type => tipoPokemon.indexOf(type) > -1);
    const nombre = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    pokemonDiv.classList.add('pokemon');
    const color = colores[tipo];
    pokemonDiv.style.backgroundColor = color;
    const pokemonHTML = `
            <div class="imgContenedor">
                <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png"> 
            </div>
            <div class="informacion">
                <span class="numeroPokemon">#${pokemon.id.toString().padStart(3, '0')}</span>
                <h2 class="nombrePokemon">${nombre}</h2>
                <h3 class="tipo">Tipo: ${tipo}</h3>
            </div>
    `;
    pokemonDiv.innerHTML = pokemonHTML;

    contenedor.appendChild(pokemonDiv);
}

esperarPokemon();
