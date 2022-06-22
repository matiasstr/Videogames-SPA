const {Router} = require('express');
const videogame = require('./videogame');
const genre = require('./genre');


// Ejemplo: const authRouter = require('./auth.js');


const routes = Router();
//router.use(express.json());

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

routes.use('/videogames', videogame);
//routes.use('/videogame',videogameMiddle );
routes.use('/genres',genre);



module.exports = routes;
