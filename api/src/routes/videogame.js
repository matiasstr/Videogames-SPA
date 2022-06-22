const { Router } = require("express");
const { Videogame, Genero } = require("../db");
const route = Router();
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

route.get("/", async (req, res) => {
  try {
    const videogamesBd = await Videogame.findAll();
    const generoBd = await Genero.findAll();

    const respuesta = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}`
    );

    var respuestaParseada = respuesta.data.results.map((e) => {
      var aux = {};

      aux.id = e.id;
      aux.name = e.name;
      aux.released = e.released;
      aux.background_image = e.background_image;
      aux.parent_platforms = e.parent_platforms;

      return aux;
    });

    var respuestaFinal = [...videogamesBd, ...respuestaParseada];

    res.status(200).json(respuestaFinal);
  } catch (error) {
    console.log(error.message);
  }
});

route.get("/", async (req, res) => {
  try {
    const respuesta = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}`
    );

    var respuestaParseada = respuesta.data.results.map((e) => {
      var aux = {};

      aux.id = e.id;
      aux.name = e.name;
      aux.released = e.released;
      aux.background_image = e.background_image;
      aux.parent_platforms = e.parent_platforms;

      return aux;
    });

    res.status(200).json(respuestaParseada);
  } catch (error) {
    console.log(error);
  }
});

//route.get("/videogame/:idVideoGame", async (req, res) => {});

route.post("/", async (req, res) => {
  const { name, id, description, parent_plataform, genre } = req.body;

  try {
    var newGame = await Videogame.create({
      name,
      id,
      description,
      parent_plataform,
    });

    genre.map(async (e) => {
      var genero = await Genero.findAll({
        where: {
          name: e,
        },
      });
      await newGame.addGenero(genero);
    });

    res.json(newGame);
  } catch (error) {
    res.send(error);
  }
});  //TERMINADO

module.exports = route;
