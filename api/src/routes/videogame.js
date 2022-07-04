const { Router } = require("express");
const { Videogame, Genre } = require("../db");
const route = Router();
const axios = require("axios");
const { Op } = require("sequelize");
require("dotenv").config();
const { API_KEY } = process.env;

route.get("/", async (req, res, next) => {
  try {
    if (Object.keys(req.query).length === 0) {
      var resultado = [];

      const videogamesBd = await Videogame.findAll({
        include: {
          model: Genre,
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      });

      axios
        .get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=20`)
        .then((e) => {
          resultado = [...resultado, ...e.data.results]; //20
          return axios.get(e.data.next);
        })
        .then((e) => {
          resultado = [...resultado, ...e.data.results]; //40
          return axios.get(e.data.next);
        })
        .then((e) => {
          resultado = [...resultado, ...e.data.results]; //60
          return axios.get(e.data.next);
        })
        .then((e) => {
          resultado = [...resultado, ...e.data.results]; //80
          return axios.get(e.data.next);
        })
        .then((e) => {
          resultado = [...resultado, ...e.data.results]; //100
          resultado = [...videogamesBd, ...resultado];
          console.log(typeof resultado[0].id);
          console.log(typeof resultado[1].id);
          res.json(resultado);
        })
        .catch((err) => {
          console.log("hubo un error con la API", err);
        });
    } else {
      next();
    }
  } catch (error) {
    console.log("Hubo un error con la base de datos", error);
  }
}); //TERMINADO

route.get("/", async (req, res) => {
  let { name } = req.query;

  try {
    const videogamesBd = await Videogame.findAll({
      where: {
        name: {
          [Op.substring]: `%${name}%`,
        },
      },
      include: {
        model: Genre,
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
    });

    let cant = 15 - videogamesBd.length;

    if (cant <= 0) {
      res.json(videogamesBd.slice(0, 16));
    }

    var resultado = await axios.get(
      `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=${cant}`
    );

    if (cant > 0) {
      var resultado = [...videogamesBd, ...resultado.data.results];
      res.json(resultado);
    } else if (videogamesBd.length === 0) {
      res.json(resultado);
    }
  } catch (error) {
    console.log("Hubo un error con la base de datos", error);
  }
}); //TERMINADO

route.get("/videogame/:idVideoGame", async (req, res) => {
  let { idVideoGame } = req.params;

  try {
    const regex = /^[0-9]*$/;

    if (regex.test(idVideoGame)) {
      //Es un numero
      var resultado = await axios.get(
        `https://api.rawg.io/api/games/${idVideoGame}?key=${API_KEY}`
      );

      res.json(resultado.data);
    } else {
      //No es un numero

      const videogamesBd = await Videogame.findAll({
        where: {
          id: idVideoGame,
        },
        include: {
          model: Genre,
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      });
      console.log(videogamesBd)
      res.json(videogamesBd[0]);
    }
  } catch (error) {
    console.log(error.message);
  }
}); //TERMINADO

route.post("/", async (req, res) => {

  const { name, description, released, rating, genre, parent_plataform, background_image } =
    req.body;

  try {


    console.log(parent_plataform)
    var newGame = await Videogame.create({
      name,
      description,
      released,
      rating,
      genre,
      parent_plataform,
      background_image
      
    });

    genre.map(async (e) => {

      var genre = await Genre.findAll({
        where: {
          name: e,
        },
      });
      
      await newGame.addGenre(genre);
    });

    res.json(newGame);
  } catch (error) {
    res.send(error);
  }
}); //TERMINADO

module.exports = route;
