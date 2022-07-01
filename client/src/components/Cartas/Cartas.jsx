import React from "react";
import {Link} from 'react-router-dom'

const Cartas = ({ videogames, genres, background_image, id }) => {
  
  return (
    <div>
      <h4><Link to={`/videogame/${id}`}>{videogames}</Link></h4>
      {genres && genres?.map((img)=>{
        return (<h4>{img.name}</h4>)
      })}
      <img src={background_image} alt="img"/>
    </div>
  );
};

export default Cartas;
