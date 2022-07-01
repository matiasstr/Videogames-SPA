import React from "react";
import { Link } from "react-router-dom";
import "../Cartas/Cartas.css";

const Cartas = ({ videogames, genres, background_image, id }) => {
  return (
    <Link className="Link" to={`/videogame/${id}`}>

      
      <div className="Cartas">
        <img className="ImgCartas" src={background_image} alt="img" />
        <div className="titulo_cartas">
          <h4 className="titulo-carta-individual">{videogames}</h4>
        </div>

        <div className="generos">
          {genres &&
            genres?.map((e) => {
              return <h4>{e.name}</h4>;
            })}
        </div>
      </div>
    </Link>
  );
};

export default Cartas;
