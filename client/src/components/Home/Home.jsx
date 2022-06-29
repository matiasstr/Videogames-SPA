import { getAllvideogames } from "../../redux/actions/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";
import Cartas from "../Cartas/Cartas.jsx";
import Nav from "../Nav/Nav.jsx";
import Paginacion from "../Paginacion/Paginacion";

const Home = () => {
  let dispatch = useDispatch();
  let videogames = useSelector((state) => state.games);

  const [pagina, setPagina] = useState(1);
  const [porPagina, setporPagina] = useState(15);

  const max = videogames.length / porPagina;

  useEffect(() => {
    dispatch(getAllvideogames());
  }, [dispatch]);

  return (
    <div>
      <Nav />

      <Link to={'/videogames/create'}>Aca para Crear</Link>

      <div className="ListaJuegos">
        {videogames &&
          videogames
            .slice(
              (pagina - 1) * porPagina,
              (pagina - 1) * porPagina + porPagina
            )
            .map((e, idx) => (
              <Cartas key={idx} videogames={e.name} genre={e.genre} id={e.id} />
            ))}
        <Paginacion pagina={pagina} maximo={max} setPagina={setPagina} />
      </div>
    </div>
  );
};

export default Home;
