import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../redux/actions/actions";

const Create = () => {
  let dispatch = useDispatch();
  let videogames = useSelector((state) => state.games);
  let genres = useSelector((state) => state.genres);
  
  const HandleSubmit = (e) => {
    e.preventDefault()
    console.log(e)
  };



  const [error, setError] = useState({});
  const [validation, setValidation] = useState({});

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <div>
      <form onSubmit={HandleSubmit}>
        <label>Nombre:</label>
        <input id="name" type="text" name="name" />
        <br></br>
        <label>Description:</label>
        <input id="Description" type="text" Description="Description" />
        <br></br>
        <label>Released:</label>
        <input id="released" type="text" released="released" />
        <br></br>
        <label>Rating:</label>
        <input id="rating" type="text" rating="rating" />
        <br></br>
        <input type="submit" value="Enviar" />
      </form>

      <select name="generos">
        <option value=" " disabled>
          Generos..
        </option>
        {genres &&
          genres.map((g) => {
            return <option value={`${g.name}`}>{g.name}</option>;
          })}
      </select>

      <select name="parent_plataform">
        <option value=" " disabled>
          Plataformas..
        </option>
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
  );
};

export default Create;
