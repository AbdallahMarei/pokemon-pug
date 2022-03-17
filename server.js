const express = require("express");
const path = require('path');
const app = express();
const axios = require("axios");


app.set('view engine', 'pug');

app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.use(express.static(path.join(__dirname, 'public')));

async function getImages(pokemons) {
    let pokemonArray = [];
    for (let i = 0; i < pokemons.length; i++) {
        let newPokemon = {};
        newPokemon.name = pokemons[i].name;
        const newImageRes = await axios.get(pokemons[i].url);
        newPokemon.image = newImageRes.data.sprites.other.home.front_default;
        newPokemon.icon = newImageRes.data.sprites.front_default
        pokemonArray.push(newPokemon);
    }
    return pokemonArray;
}

app.get('/', async (req, res) => {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10");
    let newPokemons = await getImages(response.data.results);
    res.render('index', { data: newPokemons });
})

app.get('/pokemon/:name', async (req, res) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.name}`)
    res.render("detailed", { data: response.data });
})