const { Router } = require("express");
const { Videogame, Genero } = require("../db");
const route = Router();
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

route.get("/", async (req, res) => {
  try {
    const videogamesBd = await Videogame.findAll({
      include: {
        model: Genero,
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
    });

    // var resultado=[];

    // axios
    //   .get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=5`)
    //   .then((e) => {
    //     console.log(e.data.results);
    //     resultado.concat(e.data.results);
    //     console.log(resultado);
    //     axios.get(e.data.next)

    //     .then((e)=>{
    //       resultado.concat(e.data.results);
    //       console.log(resultado);
    //       e.data.next.replace("page_size=40","page_size=20");
    //       axios.get(e.data.next)

    //       .then((e)=>{
    //         resultado.concat(e.data.results);
    //         console.log(resultado);
    //       });
    //     })

    //   })
    //   .then(()=>{
        
    //     return res.send(resultado)

    //   })


      // .then(async (e) => {
      //   var get3 = await axios.get(e.data.next); //page 3
      //   get3.data.results.concat(e.data.results);
      //   return get3;
      // })
      // .then(async (e) => {
      //   var get4 = await axios.get(e.data.next); //page 4
      //   get4.data.results.concat(e.data.results);
      //   return get4;
      // })
      // .then(async (e) => {
      //   var get5 = await axios.get(e.data.next); //page 5
      //   get5.data.results.concat(e.data.results);
      //   return get5;
      // });

    // .then((e)=>{

    //   var get5 = await axios.get(e.next) //page 6
    //   get5.data.results.concat(e.results)
    //   return get5;
    // })

    // const respuesta2 = await axios.get(
    //   `https://api.rawg.io/api/games?key=${API_KEY}&page=2`
    // );

    // const respuesta3 = await axios.get(
    //   `https://api.rawg.io/api/games?key=${API_KEY}&page=3`
    // );

    // const respuesta4 = await axios.get(
    //   `https://api.rawg.io/api/games?key=${API_KEY}&page=4`
    // );

    // const respuesta5 = await axios.get(
    //   `https://api.rawg.io/api/games?key=${API_KEY}&page=5`
    // );

    // var respuestaParseada = respuesta.data.results.map((e) => {
    //   var aux = {};

    //   aux.id = e.id;
    //   aux.name = e.name;
    //   aux.released = e.released;
    //   aux.background_image = e.background_image;
    //   aux.parent_platforms = e.parent_platforms;
    //   aux.genre = e.genres;

    //   return aux;
    // });

    // var respuestaFinal = [...videogamesBd, ...respuestaParseada];

    // res.status(200).json(respuestaFinal);
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

route.get("/videogame/:idVideoGame", async (req, res) => {});

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
}); //TERMINADO

module.exports = route;
