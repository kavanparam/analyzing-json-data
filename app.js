/*This wasn't working. Used an .mjs file instead. 
Watch Skillify video and see if this is how they approached it after.*/



import fetch from "node-fetch"; //to use fetch api installed in folder


//Recieve the Pokemon data from PokeAPI
function fetchData(){
    const requestUrl = "https://pokeapi.co/api/v2/move/fire-blast";

    fetch(requestUrl).then((x) => x.json()).then((obj) => {
        logObject(obj);
    });
}

//Try printing the JSON object to the console
function logObject(obj){
    console.log('This line executed!')
    console.log(obj);
}


fetchData();