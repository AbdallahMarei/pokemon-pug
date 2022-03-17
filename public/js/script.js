let burgerMenu = document.querySelector(".burger-menu");
let navLinks = document.querySelector(".nav-links");
let imagesContainer = document.querySelector(".pokemon-images");
let loadMoreBtn = document.querySelector(".load-more");
let numberOfPokemons = 20;

/**
 * Function to fetch the images and icons for the pokemons
 * @param {Array of Objects} pokemons the array of objects from the api that doesn't have images
 * @returns array of objects with images and icons
 */
async function getPokemonImages(pokemons) {
    let pokemonArray = [];
    for (let i = 0; i < pokemons.length; i++) {
        let newPokemon = {};
        newPokemon.name = pokemons[i].name;
        const newImageRes = await fetch(pokemons[i].url);
        const result = await newImageRes.json();
        newPokemon.image = result.sprites.other.home.front_default;
        newPokemon.icon = result.sprites.front_default
        pokemonArray.push(newPokemon);
    }
    return pokemonArray;
}

/**
 * Function to fetch pokemons from the api
 */
async function getRandomPokemons() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${numberOfPokemons}`);
    const result = await response.json();
    let newPokemonArr = result.results.slice(-10);
    let pokemonImagesArr = await getPokemonImages(newPokemonArr);
    pokemonImagesArr.forEach(pokemon => {
        imagesContainer.insertAdjacentHTML("beforeend", `<div class="image-container">
            <a href='/pokemon/${pokemon.name}'>
                <img src='${pokemon.image}' alt='pokemon' class='pokemon-image'/>
            </a>
        </div>`)
    })
    numberOfPokemons += 10;
}

loadMoreBtn.addEventListener("click", getRandomPokemons);

burgerMenu.addEventListener("click", function () {
    navLinks.classList.toggle("nav-links-mobile")
})
