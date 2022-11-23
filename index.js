const input = document.getElementById('input__search')
const submit = document.getElementById('input__btn')
const result = document.querySelector('poke__result')
const form = document.getElementById('form')

const baseURL = "https://pokeapi.co/api/v2/pokemon/";

let lastPokemon = JSON.parse(localStorage.getItem("pokemon")) || {};

const saveLocalStorage = () => {
  localStorage.setItem("pokemon", JSON.stringify(lastPokemon));
};

const showPokemons = (pokemon) =>{
const { id, name, sprites, height, weight, types } = pokemon;

return `
  <div class="poke">
        <img  src="${sprites.other.home.front_default}"/>
        <h2>${name.toUpperCase()}</h2>
        <span class="exp">EXP: ${pokemon.base_experience}</span>
        <div class="tipo-poke">
            ${types
              .map((tipo) => {
                return `<span class="${tipo.type.name} poke__type">${tipo.type.name}</span>`;
              })
              .join("")}
        </div>
        <p class="id-poke">#${id}</p>
        <p class="height">Height: ${height / 10}m</p>
        <p class="weight">Weight: ${weight / 10}Kg</p>
    </div>
  `;
};

const renderPokemons = (pokemon) => {
  lastPokemon=pokemon;
  saveLocalStorage();
  result.innerHTML = showPokemons(lastPokemon);
};

const showError= (error)=>{
  result.innerHTML = `<h3>${error}</h3>`
}

const searchPokemon = async (e) => {
  e.preventDefault();
  const pokemonId = input.value;
  if (pokemonId.length === 0) {
    showError("Por favor, ingrese una ID");
    return
  }
     const searchedPokemon = await fetchPokemon (pokemonId);
     if (searchedPokemon === undefined){
      showError(`No existe el pokemon con el id ${pokemonId}`)
      input.value=""
      return
     }
     renderPokemons(searchedPokemon)
      console.log(searchedPokemon);
  input.value=""
};

const fetchPokemon = async (pokemonId) => {
 try{
  const res = await fetch(baseURL+pokemonId);
  const data= await res.json();
  return data
}  catch(err){
  console.log( "error "+ err);
  }
};

const init = () => {
  form.addEventListener("submit", searchPokemon);
  renderPokemons(lastPokemon);
};

init();