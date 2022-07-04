import { getAllvideogames } from "../../redux/actions/actions";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";
import Cartas from "../Cartas/Cartas.jsx";
import Nav from "../Nav/Nav.jsx";
import Paginacion from "../Paginacion/Paginacion";
import "../Home/Home.css";

const Home = () => {
  var flag = false;
  let dispatch = useDispatch();
  let videogames = useSelector((state) => state.games);

  const [pagina, setPagina] = useState(1);
  const [porPagina, setporPagina] = useState(15);

  const max = videogames.length / porPagina;

  useEffect(() => {
    dispatch(getAllvideogames());
  }, [dispatch]);

  
  return videogames.length === 0 ? (
    <div className="loading-screen">
      <div class="loader">
        <svg viewBox="0 0 80 80">
          <circle id="test" cx="40" cy="40" r="32"></circle>
        </svg>
      </div>

      <div class="loader triangle">
        <svg viewBox="0 0 86 80">
          <polygon points="43 8 79 72 7 72"></polygon>
        </svg>
      </div>

      <div class="loader">
        <svg viewBox="0 0 80 80">
          <rect x="8" y="8" width="64" height="64"></rect>
        </svg>
      </div>
    </div>
  ) : (
    <div className="juegosContainer">
      <Nav isHome={true}/>

      <div className="ListaJuegos">
        {videogames &&
          videogames
            .slice(
              (pagina - 1) * porPagina,
              (pagina - 1) * porPagina + porPagina
            )
            .map((e, idx) => (
              <Cartas
                key={idx}
                videogames={e.name}
                genres={e.genres}
                background_image={e.background_image}
                id={e.id}
              />
            ))}
      </div>
        <Paginacion pagina={pagina} maximo={max} setPagina={setPagina} />
    </div>
  );
};

export default Home;
