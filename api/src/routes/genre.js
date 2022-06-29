const { Router } = require("express");
const { Genre } = require("../db");
const route = Router();
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

route.get("/", async (req, res) => {
  try {
    const genre = await Genre.findAll();

    if (genre.length === 0) {
      var aux = await axios.get(
        `https://api.rawg.io/api/genres?key=${API_KEY}`
      );

      var respuesta = aux.data.results.map((e) => {
        return e.name;
      });

      for (let i = 0; i < respuesta.length; i++) {
        await Genre.create({
          name: respuesta[i],
        });
      }

      const genre = await Genre.findAll();
      res.json(genre);
    } else {
      res.json(genre);
    }
  } catch (error) {
    console.log(error);
  }
}); //TERMINADO

module.exports = route;
