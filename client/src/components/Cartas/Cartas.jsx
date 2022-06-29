import React from "react";
import {Link} from 'react-router-dom'

const Cartas = ({ videogames, genre, id }) => {
  return (
    <div>
      <h4><Link to={`/videogame/${id}`}>{videogames}</Link></h4>
      <h4>{genre}</h4>
    </div>
  );
};

export default Cartas;
