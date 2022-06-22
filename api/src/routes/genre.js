const { Router } = require("express");
const { Genero } = require("../db");
const route = Router();
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

route.get("/", async (req, res) => {
  try {
    const genero = await Genero.findAll();

    if (genero.length === 0) {
      var aux = await axios.get(
        `https://api.rawg.io/api/genres?key=${API_KEY}`
      );
      
      var respuesta = aux.data.results.map((e) => {
        return e.name;
      });

      for (let i = 0; i < respuesta.length; i++) {
        await Genero.create({
          name: respuesta[i],
        });
      }

      const genero = await Genero.findAll();
      res.json(genero);
    } else {
      res.json(genero);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
