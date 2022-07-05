import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogame, empty_videogame } from "../../redux/actions/actions";
import "../Carta/Carta.css";
import "../Carta/loadercarta.css";
import Nav from "../Nav/Nav";

const Carta = (props) => {
  let dispatch = useDispatch();
  let gameDetail = useSelector((state) => state.gameDetail);

  let id = props.match.params.Idvideogame;
  useEffect(() => {
    dispatch(empty_videogame());
    dispatch(getVideogame(id));
  }, [dispatch, id]);

  if (
    gameDetail.parent_platforms &&
    typeof gameDetail.parent_platforms === "object"
  ) {
    var plataformArray = [];
    for (let i = 0; i < gameDetail.parent_platforms.length; i++) {
      plataformArray.push(gameDetail.parent_platforms[i].platform.name);
    }
  } else {
    var plataformArray = gameDetail.parent_plataform;
  }

  return Object.keys(gameDetail).length === 0 ? (
    <div className="loader-carta-Conteiner">
      <div className="loaderCarta"></div>
    </div>
  ) : (
    <>
      <Nav isHome={false} />
      <div className="cartacointeiner">
        <div className="cartanameconteiner">
          <div className="cartaname">{gameDetail.name}</div>
        </div>
        <div className="cartaratingconteiner">
          <div className="cartarating">
            <div className="labelrating">Rating : {gameDetail.rating}</div>
          </div>
        </div>
        <div className="cartaimgcontainer">
          <img
            className="cartaimg"
            src={gameDetail.background_image}
            alt="img"
          />
        </div>

        <div className="conteiner-plataformas-genero">
          <div className="cartageneroconteiner">
            <div className="labelgeneros">Generos:</div>
            {gameDetail.genres?.map((g) => {
              return (
                <div className="cartagenero">
                  <div className="label-genero">{g.name}</div>
                </div>
              );
            })}
          </div>
          <div className="cartaplataformasconteiner">
            <div className="labelplataformas">Plataformas:</div>
            {plataformArray?.map((p) => {
              console.log(p);
              return (
                <div className="cartanplataforma">
                  <div className="label-plataforma">{p}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="cartadescripcion">
          <div className="label-descripcion">
            {gameDetail.description_raw
              ? gameDetail.description_raw
              : gameDetail.description}
          </div>
          <div className="cartalanzamiento">
            <div className="label-lanzamiento">{gameDetail.released}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carta;
