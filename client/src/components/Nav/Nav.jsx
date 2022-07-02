import React from "react";
import {
  getVideogames,
  orderASC,
  orderDES,
  orderRatingASC,
  orderRatingDES,
  filtroGenero,
  filtroAgregado,
  filtroExistentes,
  getGenres,
  clear,
} from "../../redux/actions/actions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Nav/Nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
  let dispatch = useDispatch();
  let videogames = useSelector((state) => state.games);
  let genres = useSelector((state) => state.genres);
  let [select, setSelect] = useState([]);
  let [nombre, setNombre] = useState("");

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const HandleSubmit = (e) => {
    if (nombre === "") {
      e.preventDefault();
      setNombre("");
    } else {
      e.preventDefault();
      dispatch(getVideogames(nombre));
      setNombre("");
    }
  };

  const HandleChange = (e) => {
    setNombre(e.target.value);
  };

  const comprobarSeleccionado = (e) => {
    var orden = document.getElementsByName("orden");

    for (var contador1 = 0; contador1 < orden.length; contador1++) {
      if (orden[contador1].checked === true && contador1 === 0) {
        dispatch(orderASC(videogames));
      } else if (orden[contador1].checked === true && contador1 === 1) {
        dispatch(orderDES(videogames));
      } else if (orden[contador1].checked === true && contador1 === 2) {
        dispatch(orderRatingASC(videogames));
      } else if (orden[contador1].checked === true && contador1 === 3) {
        dispatch(orderRatingDES(videogames));
      }
    }
  };
  const HandleClear = (e) => {
    setSelect([]);
    dispatch(clear());
  };
  const comprobarFiltradoGenero = (e) => {
    dispatch(filtroGenero(videogames, e.target.value));
    setSelect([e.target.value, ...select]);
    console.log(select);
  };

  const comprobarFiltradoCrear = (e) => {
    if (e.target.value === "Creados") {
      dispatch(filtroAgregado(videogames));
    } else {
      dispatch(filtroExistentes(videogames));
    }
  };

  return (
    <div className="containerNav">
      <form onSubmit={HandleSubmit}>
        <div className="formNav">
          <div className="ordenar">
            <div className="ordenABC">
              <div className="div-abc">
                <input
                  type="radio"
                  name="orden"
                  onChange={(e) => comprobarSeleccionado(e)}
                />
                ABC ˄
              </div>
              <div className="div-abc">
                <input
                  type="radio"
                  name="orden"
                  onChange={(e) => comprobarSeleccionado(e)}
                />
                ABC ˅
              </div>
            </div>
            <div className="orderRating">
              <div className="div-rating">
                <input
                  type="radio"
                  name="orden"
                  onChange={(e) => comprobarSeleccionado(e)}
                />
                Rating ˄
              </div>
              <div className="div-rating">
                <input
                  type="radio"
                  name="orden"
                  onChange={(e) => comprobarSeleccionado(e)}
                />
                Rating ˅
              </div>
            </div>
          </div>

          <div className="Selects">
            <div className="select-genero">
              <select
                name="FiltroGenero"
                onChange={(e) => comprobarFiltradoGenero(e)}
                defaultValue={"Default"}
              >
                <option value={"Default"}>Generos..</option>

                {genres?.map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="select-filtroapi">
              <select
                name="FiltroApi/BD"
                onChange={(e) => comprobarFiltradoCrear(e)}
              >
                <option value="">Creados...</option>
                <option value="Creados">Creados</option>
                <option value="Existentes">Existentes</option>
              </select>
            </div>

            <button className="clearbutton" onClick={(e) => HandleClear(e)}>
              Clear
            </button>
          </div>
          <div className="genero-elegido-conjuto">
            {select?.map((sel) => (
              <div className="genero-elegido-ind">{sel}</div>
            ))}
          </div>
          <div className="cointeinerlink">
            <a className="linkP" href="http://localhost:3000/create">
              Postea tu juego !
            </a>
          </div>

          <div className="buscador">
            <label>Busqueda</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => HandleChange(e)}
            />
            <input type="submit" value="Buscar" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Nav;
