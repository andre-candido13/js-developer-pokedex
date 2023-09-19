const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')


const maxRecords = 151
const limit = 5
let offset = 0;

function convertPokemonToLi(pokemon) {

    return `
   
        <li  class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
          

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
           
                <img src="${pokemon.photo}"
                alt="${pokemon.name}"> </button>
              
                      
            </div>

        </li>
        
    `
}

function convertPokemonToLi2(pokemon) {

    return `
   
        <li class="pokemonIndividual">
        
            <div class="detail">
             
           
                <img src="${pokemon.sprites.other.dream_world.front_default}"
                alt="${pokemon.name}"> </button>
              
                      
            </div>

            <span class="name">${pokemon.name}</span>
            <span class="weight">  Altura: <span class="altura">${pokemon.weight}</span> </span>
            <span class="height">  Peso: <span class="peso">${pokemon.height}</span> </span>


        </li>
        
    `

}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML = newHtml
        pokeApi.getSpecific().then((specificPokemon) => {
            const pokemonData = document.querySelectorAll('.pokemon')
            pokemonData.forEach((element, index) => {
                element.addEventListener('click', () => {
                    const dataPokemon = specificPokemon[index];
                    console.log(dataPokemon)
                    getDetails(dataPokemon)

                })
            })
        })
    })
}




function getDetails(parametro) {

    const detalhesHtml = convertPokemonToLi2(parametro);

    const detalhesContainer = document.getElementById('pokemonList'); // Substitua pelo seu elemento desejado
    detalhesContainer.innerHTML = detalhesHtml;

}



loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})


