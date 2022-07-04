import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postVideogame, getGenres } from "../../redux/actions/actions";
import Nav from "../Nav/Nav";
import "../Create/Create.css";
import joystick from "../../Img/joystick.jpg";

function validate(data) {
  let error = {};
  let regRating = new RegExp(/[0-5]/);
  let regCaracteresEspeciales = new RegExp(
    /([@${}[<>,.:;#%^&()`~+=\*\]\-\.\'\"\\\/\|_])+/g
  );
  let regPrimerLetraMayus = new RegExp(/^[A-Z]/);
  let regRelease = new RegExp(
    /[0-9]{0,2}-[0-9]{0,2}-[2]{1,1}[0]{1,1}[2-9]{1,1}[0-9]{1,1}$/
  );

  if (!data.name) {
    error.name = "Falta ingresar un nombre";
  } else if (!regPrimerLetraMayus.test(data.name)) {
    error.name = "La primer letra debe ser mayuscula";
  } else if (regCaracteresEspeciales.test(data.name)) {
    error.name = "Solo se permiten letras en el nombre";
  } else if (data.name.length > 20) {
    error.name = "Excedido cantidad de caracteres";
  } else if (!data.description) {
    error.description = "Falta ingresar una descripcion";
  } else if (!isNaN(data.description)) {
    error.description = "Solo se pueden ingresar letras";
  } else if (!data.released) {
    error.released = "Falta ingresar fecha de lanzamiento";
  } else if (!regRelease.test(data.released)) {
    error.released = "La fecha debe tener formato dd-mm-aaaa";
  } else if (!data.rating) {
    error.rating = "Falta ingresar un rating";
  } else if (isNaN(data.rating)) {
    error.rating = "El rating debe ser un valor numerico";
  } else if (!regRating.test(data.rating)) {
    console.log('entro aca')
    error.rating = "El rating debe ser un valor numerico entre 0 y 5";
  } else if (data.genre.length === 0) {
    error.genre = "Falta ingresar un genero";
  } else if (data.parent_plataform.length === 0) {
    error.parent_plataform = "Falta ingresar una plataforma";
  }
  console.log(regRating.test(data.rating))
  return error;
}

const Create = () => {
  let dispatch = useDispatch();
  let genres = useSelector((state) => state.genres);

  const [error, setError] = useState({ " ": " " });
  const [data, setData] = useState({
    name: " ",
    description: "",
    released: "",
    rating: 0,
    genre: [],
    parent_plataform: [],
    background_image: "",
  });

  const HandleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError(validate({ ...data, [e.target.name]: e.target.value }));
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (data.name === " ") {
      alert("Debe ingresar un nombre");
    } else if (data.description.length > 140) {
      alert("Descripcion excedida de caracteres");
    } else if (data.genre.length === 0) {
      alert("Debe elegir al menos un genero");
    } else if (data.parent_plataform === 0) {
      alert("Debe elegir al menos una plataforma");
    } else if (Object.keys(error).length === 0) {
      if (data.background_image.length < 30) {
        data.background_image = joystick;
      }
      dispatch(postVideogame(data));
      alert("Juego creado");
      setData({
        name: " ",
        description: "",
        released: "",
        rating: 0,
        genre: [],
        parent_plataform: [],
        background_image: "",
      });
    }
  };

  const HandleChangePlatform = (e) => {
    if (e.target.value !== " ") {
      setData({
        ...data,
        parent_plataform: [e.target.value, ...data.parent_plataform],
      });
      setError(
        validate({
          ...data,
          parent_plataform: [e.target.value, ...data.parent_plataform],
        })
      );
    }
  };

  const HandleChangeGeneros = (e) => {
    if (e.target.value !== " ") {
      setData({
        ...data,
        genre: [e.target.value, ...data.genre],
      });
      setError(
        validate({
          ...data,
          genre: [e.target.value, ...data.genre],
        })
      );
    }
  };
  
  return (
    <div>
      <Nav isHome={false} />
      <div className="conteinerprincipal">
        <div className="conteinerizq">
          <form onSubmit={HandleSubmit}>
            <div className="nombreconteiner">
              <div className="label">Nombre:</div>
              <div>
                <input
                  id="name"
                  type="text"
                  name="name"
                  onChange={(e) => HandleInput(e)}
                  className="inputconteiner"
                />
              </div>
            </div>

            <div className="descripcionconteiner">
              <label className="label">Description:</label>
              <input
                id="Description"
                type="text"
                name="description"
                onChange={(e) => HandleInput(e)}
                className="inputconteiner"
              />
            </div>

            <div className="relasedconteiner">
              <label className="label">Released:</label>
              <input
                id="released"
                type="text"
                name="released"
                onChange={(e) => HandleInput(e)}
                className="inputconteiner"
              />
            </div>
            <div className="ratingconteiner">
              <label className="label" >Rating:</label>
              <input
                id="rating"
                type="text"
                name="rating"
                onChange={(e) => HandleInput(e)}
                className="inputconteiner"
              />
            </div>

            <div className="imagenconteiner">
              <label className="label">Imagen:</label>
              <input
                id="imagen"
                type="text"
                name="background_image"
                onChange={(e) => HandleInput(e)}
                className="inputconteiner"
              />
            </div>

            <div className="generos-select">
              <select
                name="generos"
                onChange={(e) => HandleChangeGeneros(e)}
                className="generosconteiner"
              >
                <option value=" ">Generos..</option>
                {genres &&
                  genres.map((g) => {
                    return <option value={`${g.name}`}>{g.name}</option>;
                  })}
              </select>
            </div>
            <div className="plataform-select">
              <select
                name="parent_plataform"
                onChange={(e) => HandleChangePlatform(e)}
                className="plataformconteiner"
              >
                <option value=" ">Plataformas..</option>
                <option value="PC">PC</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Xbox">Xbox</option>
                <option value="iOS">iOS</option>
                <option value="Android">Android</option>
                <option value="Apple Macintosh">Apple Macintosh</option>
                <option value="Linux">Linux</option>
                <option value="Nintendo">Nintendo</option>
                <option value="Atari">Atari</option>
                <option value="Commodore / Amiga">Commodore / Amiga</option>
                <option value="SEGA">SEGA</option>
                <option value="3DO">3DO</option>
                <option value="Neo Geo">Neo Geo</option>
                <option value="Web">Web</option>
              </select>
            </div>
            <div>
              <input
                type="submit"
                value="Enviar"
                disabled={Object.keys(error).length}
                className="buttonform"
              />
            </div>
          </form>
          <div className="erroresconteiner">
            <h2>{error.name}</h2>
            <h2>{error.description}</h2>
            <h2>{error.released}</h2>
            <h2>{error.rating}</h2>
            <h2>{error.genre}</h2>
            <h2>{error.parent_plataform}</h2>
          </div>
        </div>
        <div className="conteinerDer">
          <div className="imgpreview">Image preview</div>
          {data.background_image.length === 0 ? (
            <>
              <img className="imgconteinercreate" src={joystick} alt="img" />
            </>
          ) : (
            <>
              <img
                className="imgconteinercreate"
                src={data.background_image}
                alt="img"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Create;
