import fetch from "node-fetch"; //to use fetch api installed in folder


//Recieve the Pokemon data from PokeAPI
function fetchData(){
    const requestUrl = "https://pokeapi.co/api/v2/move/fire-blast";

    fetch(requestUrl).then((x) => x.json()).then((obj) => {
        // logObject(obj);
        cleanObject(obj);
    });
};

//Print the JSON object to the console
function logObject(obj){
    // console.log(obj);
    console.log(obj.learned_by_pokemon);
}

// Using .map transform the array of Pokémon to only contain the name and not the url.
function cleanObject(obj){

    const pokemonArray = obj.learned_by_pokemon;  //an array of Pokemon objects

    const newPokemonArray = pokemonArray.map((pokemon)=>{
        return pokemon.name;
    });

    console.log(newPokemonArray);
}


fetchData(); 