const axios = require("axios");
const express = require('express');
const app = express();
const path = require('path');

async function makeRequest (pokName){
  const config = {
    method: "get",
    url: `https://pokeapi.co/api/v2/pokemon/${pokName}`,
  };
  let res = await axios(config);
  return res.data;
}
async function pokemonCollection() {
  let pokemon1 = await makeRequest('charmeleon');
  let pokemon2 = await makeRequest('fearow');
  let pokemon3 = await makeRequest('squirtle');
  
  return [pokemon1 , pokemon2 , pokemon3]; 
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pages'));

app.get('/', async (req, res) => {
    const collection = await pokemonCollection();
    res.render("home", {
      title: "My Collection",
      pokemon: [
        {
          name: collection[0].name,
          order:collection[0].order,
        },
        {
          name: collection[1].name,
          order: collection[1].order,
        },
        {
          name: collection[2].name,
          order: collection[2].order,
        },
      ],
    });
})

app.listen(2525, () => {
  console.log('Server is running on port 2525');
  console.log('http://localhost:2525/');
})