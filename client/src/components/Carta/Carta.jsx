import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogame } from "../../redux/actions/actions";


const Carta = (props) => {
  let dispatch = useDispatch();
  let gameDetail = useSelector((state) => state.gameDetail);

  let id = props.match.params.Idvideogame;
  console.log(props)
  console.log(gameDetail)
  useEffect(() => {
    dispatch(getVideogame(id));
  }, [dispatch, id]);
  
  return (
    <div>
      <h4>{gameDetail.name}</h4>

      {gameDetail.genres?.map((g) => {
        return <h4>{g.name}</h4>;
      })}

      <h4>{gameDetail.description_raw? gameDetail.description_raw:gameDetail.description}</h4> 
      <h4>{gameDetail.released}</h4>
      <h4>{gameDetail.rating}</h4>

      {gameDetail.parent_platforms?.map((p) => {
        return <h4>{p.platform.name}</h4>;
      })}
      <img src={gameDetail.background_image} alt="img" />
    </div>
  );
};

export default Carta;
