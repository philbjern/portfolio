const POKEMON_API_URL = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const weightElement = document.getElementById('weight');
const heightElement = document.getElementById('height');
const hpElement = document.getElementById('hp');
const attackElement = document.getElementById('attack');
const defenseElement = document.getElementById('defense');
const specialAttackEl = document.getElementById('special-attack');
const specialDefenseEl = document.getElementById('special-defense');
const speedElement = document.getElementById('speed');

const spriteContainer = document.getElementById('sprite-container')
const typesContainer = document.getElementById('types')

let pokemonData = []

const fetchAllPokemonData = async () => {
  try {
    const res = await fetch(POKEMON_API_URL);
    const data = await res.json();
    pokemonData = data.results;
  } catch (err) {
    console.error(`There was an error: ${err}`);
  }
}

fetchAllPokemonData();

const displayPokemonData = (data) => {
  pokemonName.textContent = data.name.toUpperCase();
  pokemonId.textContent = `#${data.id}`;
  heightElement.textContent = `Height: ${data.height}`;
  weightElement.textContent = `Weight: ${data.weight}`;

  // sprite
  spriteContainer.innerHTML = `<img id="sprite" src="${data.sprites.front_default}"/>`

  // types
  types.innerHTML = '';
  data.types.forEach((el) => {
    types.innerHTML += `<div class="type ${el.type.name}">${el.type.name.toUpperCase()}</div>`
  })

  const stats = {}
  data.stats.map((el) => {
    stats[el.stat.name] = el.base_stat
  });
  
  // hp
  hpElement.textContent = stats.hp;
  // attack
  attackElement.textContent = stats.attack;
  // defense
  defenseElement.textContent = stats.defense;
  // special-attack
  specialAttackEl.textContent = stats['special-attack'];
  // special-defense
  specialDefenseEl.textContent = stats['special-defense'];
  // speed
  speedElement.textContent = stats.speed;
}

const fetchPokemonData = async (pokemonUrl) => {
  try {
    const res = await fetch(`${pokemonUrl}`);
    const data = await res.json();
    displayPokemonData(data);
  } catch (err) {
    console.error('Error while fetching pokemon data ' + err);
  }
}

const parseUserInput = (input) => {
  let res = input.replace(/[./,|;:'"]/ig, '-').toLowerCase();
  if (res.includes('♀')) {
    res = res.replace(/[♀]/i, '-f');
  } else if (res.includes("♂")) {
    res = res.replace(/[♂]/i, '-m');
  }
  return res;
}

const searchForPokemonName = (pokemonName) => {
  return pokemonData.find((pokemon) => pokemon.name === pokemonName);
}

const searchForPokemonId = (pokemonId) => {
  return pokemonData.find((pokemon) => pokemon.id === parseInt(pokemonId));
}

const handleSearchButtonClick = () => {
  const userInput = searchInput.value;
  const inputParsed = parseUserInput(userInput);

  if (pokemonData.length === 0) {
    fetchAllPokemonData();
  }
  let pokemon = null;
  if (Number.isInteger(parseInt(inputParsed))) {
    pokemon = searchForPokemonId(inputParsed);
  } else {
    pokemon = searchForPokemonName(inputParsed);
  }
  
  if (pokemon === undefined) {
    alert('Pokémon not found')
  } else {
    const pokemonUrl = pokemon.url;
    fetchPokemonData(pokemonUrl);
  }
}

searchBtn.addEventListener('click', handleSearchButtonClick);