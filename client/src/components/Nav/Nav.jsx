import React from "react";
import {
  getVideogames,
  orderASC,
  orderDES,
  orderRatingASC,
  orderRatingDES,
  filtroGenero,
  filtroExisteAgregado,
} from "../../redux/actions/actions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Nav = () => {
  let dispatch = useDispatch();
  let videogames = useSelector((state) => state.games);
  let [nombre, setNombre] = useState("");

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

  const comprobarFiltradoGenero = (e) => {
    dispatch(filtroGenero(videogames, e.target.value));
  };

  const comprobarFiltradoCrear = (e) => {
    dispatch(filtroExisteAgregado(videogames));
  };

  return (
    <div>
      <form onSubmit={HandleSubmit}>
        <label>Busqueda</label>

        <input type="text" value={nombre} onChange={(e) => HandleChange(e)} />

        <input
          type="submit"
          value="Buscar"
          onClick={(e) => comprobarSeleccionado(e)}
        />
        <br></br>
        <label>
          <input type="radio" name="orden" />
          Ordernar asc ABC
        </label>
        <br></br>
        <label>
          <input type="radio" name="orden" />
          Ordernar dsc ABC
        </label>
        <br></br>
        <label>
          <input type="radio" name="orden" />
          Ordernar asc rating
        </label>
        <br></br>
        <label>
          <input type="radio" name="orden" />
          Ordernar dsc rating
        </label>
        <br></br>

        <select
          name="FiltroGenero"
          onChange={(e) => comprobarFiltradoGenero(e)}
        >
          <option value=" " disabled>
            Generos..
          </option>
          <option value="Indie">Indie</option>
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="RPG">RPG</option>
          <option value="Strategy">Strategy</option>
          <option value="Shooter">Shooter</option>
          <option value="Casual">Casual</option>
          <option value="Simulation">Simulation</option>
          <option value="Puzzle">Puzzle</option>
          <option value="Arcade">Arcade</option>
          <option value="Platformer">Platformer</option>
          <option value="Racing">Racing</option>
          <option value="Massively Multiplayer">Massively Multiplayer</option>
          <option value="Sports">Sports</option>
          <option value="Fighting">Fighting</option>
          <option value="Family">Family</option>
          <option value="Board Games">Board Games</option>
          <option value="Educational">Educational</option>
          <option value="Card">Card</option>
        </select>

        <br></br>
        <select name="FiltroApi/BD" onChange={(e) => comprobarFiltradoCrear(e)}>
          <option value="" disabled>
            Creados...
          </option>
          <option value="Creados">Creados</option>
          <option value="Existentes">Existentes</option>
        </select>
        <br></br>
      </form>
    </div>
  );
};

export default Nav;
