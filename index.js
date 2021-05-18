#!/usr/bin/env node
var fetch = require('node-fetch')
var fs = require('fs')

let url = "https://pokeapi.co/api/v2/pokemon/"

async function getPokemon(file) {
  let pokeStr = '';
  let data = fs.readFileSync(file);
  let pokemons = data.toString().split('\n');

  await pokemons.map((item) => {
    fetch(url + item)
      .then(result => result.json())
      .then(data => data.types.forEach(index => {
        if (index === data.types[0]) {
          pokeStr = `${item}: ${index.type.name}`
        } else pokeStr = pokeStr + ', ' + index.type.name;
      })).then(res => {
        console.log(pokeStr)
      })
  })
};

getPokemon('input.txt');