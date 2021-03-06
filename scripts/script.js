const list = document.querySelector('.pokemon-boxes')
const input = document.querySelector('input')

list.innerHTML = ""

input.addEventListener('keydown', (event)=>{
    if(event.code == 'Enter'){
        list.innerHTML = ""
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=${event.target.value}`)
        .then(response => response.json())
        .then(allPokemon => {
            allPokemon.results.map(val=>{
                fetch(val.url)
                .then(response => response.json())
                .then(pokemonSingle => {
                    list.innerHTML += `
                    <div class="pokemon-box">
                    <img src="${pokemonSingle.sprites.front_default}" alt="${val.name}">
                    <p><strong>${val.name}</strong></p>
                    <p>${pokemonSingle.height}m</p>
                    <p>${pokemonSingle.weight}kg</p>
                    <p>Principais Habilidades:</p>
                    <ul>
                        ${pokemonSingle.abilities.map(val=> {
                            return `<li>${val.ability.name}</li>`
                        })}
                    </ul>
                    </div>
                    `
                })            
            })
        })
    }
})

