import { rest } from "msw";
import { Pokemon } from "../shared_types/pokemon";
import { API_URL } from "../utils/Axios";

export const pokemonListAnswer = [
  {
    id: 2765,
    name: "charizardss",
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/006_f2.png",
    attack: 100,
    defense: 100,
    hp: 100,
    type: "Unknown",
    id_author: 1,
  },
  {
    id: 2770,
    name: "happycachu",
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/026.png",
    attack: 17,
    defense: 68,
    hp: 89,
    type: "water",
    id_author: 1,
  },
  {
    id: 2782,
    name: "t4est",
    image:
      "https://as01.epimg.net/diarioas/imagenes/2022/05/29/actualidad/1653826510_995351_1653826595_noticia_normal_recorte1.jpg",
    attack: 41,
    defense: 83,
    hp: 100,
    type: "Unknown",
    id_author: 1,
  },
  {
    id: 2783,
    name: "Vulpixb",
    image:
      "https://archives.bulbagarden.net/media/upload/thumb/6/60/037Vulpix.png/500px-037Vulpix.png",
    attack: 35,
    defense: 80,
    hp: 100,
    type: "Base",
    id_author: 1,
  },
  {
    id: 2786,
    name: "Charizard",
    image:
      "https://e7.pngegg.com/pngimages/373/740/png-clipart-pokemon-x-and-y-charizard-pokemon-universe-drawing-shining-charizard-card.png",
    attack: 26,
    defense: 100,
    hp: 12,
    type: "water",
    id_author: 1,
  },
];

let pokemonNextId = 100001;

const getPokemonHandler = rest.get(API_URL, async (req, res, ctx) => {
  console.info("call mock getPokemonHandler");
  return res(ctx.status(200), ctx.json(pokemonListAnswer));
});

const postPokemonHandler = rest.post(`${API_URL}/`, async (req, res, ctx) => {
  //const newPoke = JSON.parse(req.body);
  const newPoke: Pokemon = await req.json();
  newPoke.id = pokemonNextId;
  pokemonNextId += 1;
  return res(ctx.status(200), ctx.json(newPoke));
});

const updatePokemonHandler = rest.put(
  `${API_URL}/:id`,
  async (req, res, ctx) => {
    //const newPoke = JSON.parse(req.body);
    const newPoke: Pokemon = await req.json();
    return res(ctx.status(200), ctx.json(newPoke));
  }
);

const deletePokemonHandler = rest.delete(
  `${API_URL}/:id`,
  async (req, res, ctx) => {
    const response = { success: true, type: "pokemon_removed" };
    return res(ctx.status(200), ctx.json(response));
  }
);

export const handlers = [
  getPokemonHandler,
  postPokemonHandler,
  updatePokemonHandler,
  deletePokemonHandler,
];
