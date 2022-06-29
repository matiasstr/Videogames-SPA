import axios from "axios";

export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAME = "GET_VIDEOGAME";
export const ORDER_ASC = "ORDER_ASC";
export const ORDER_DES = "ORDER_DES";
export const ORDER_RATING_ASC = "ORDER_RATING_ASC";
export const ORDER_RATING_DES = "ORDER_RATING_DES";
export const FILTRO_GENERO = "FILTRO_GENERO";
export const FILTRO_EXISTE_AGREGADO = "FILTRO_EXISTE_AGREGADO";
export const GET_GENRES = "GET_GENRES";
export const POST_VIDEOGAME = "POST_VIDEOGAME";

export const getAllvideogames = () => {
  return async function (dispatch) {
    return axios.get("http://localhost:3001/videogames").then((r) =>
      dispatch({
        type: GET_ALL_VIDEOGAMES,
        payload: r.data,
      })
    );
  };
};

export const getVideogames = (nombre) => {
  return async function (dispatch) {
    return axios
      .get(`http://localhost:3001/videogames?name=${nombre}`)
      .then((r) =>
        dispatch({
          type: GET_VIDEOGAMES,
          payload: r.data,
        })
      );
  };
};

export const getGenres = () => {
  return async function (dispatch) {
    return axios.get(`http://localhost:3001/genres`).then((r) =>
      dispatch({
        type: GET_GENRES,
        payload: r.data,
      })
    );
  };
};

export const getVideogame = (id) => {
  return async function (dispatch) {
    return axios
      .get(`http://localhost:3001/videogames/videogame/${id}`)
      .then((r) =>
        dispatch({
          type: GET_VIDEOGAME,
          payload: r.data,
        })
      );
  };
};

export const postVideogame = (payload) => {
  return async function (dispatch) {
    let created = await axios.post("http://localhost:3001/videogames", payload);

    return dispatch({ type: POST_VIDEOGAME, payload: created.data });
  };
};

export const orderASC = (array) => {
  var new_array = array.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    } else if (a.name < b.name) {
      return -1;
    }
    return 0;
  });

  return {
    type: ORDER_ASC,
    payload: new_array,
  };
};

export const orderDES = (array) => {
  var new_array = array.sort((a, b) => {
    if (a.name > b.name) {
      return -1;
    } else if (a.name < b.name) {
      return 1;
    }
    return 0;
  });

  return {
    type: ORDER_DES,
    payload: new_array,
  };
};

export const orderRatingASC = (array) => {
  var new_array = array.sort((a, b) => {
    if (a.rating > b.rating) {
      return 1;
    } else if (a.rating < b.rating) {
      return -1;
    }
    return 0;
  });

  return {
    type: ORDER_RATING_ASC,
    payload: new_array,
  };
};

export const orderRatingDES = (array) => {
  var new_array = array.sort((a, b) => {
    if (a.rating > b.rating) {
      return -1;
    } else if (a.rating < b.rating) {
      return 1;
    }
    return 0;
  });

  return {
    type: ORDER_RATING_DES,
    payload: new_array,
  };
};

export const filtroGenero = (array, genre) => {
  var new_arr = [];

  var new_array = array.map((arr) => {
    for (let index = 0; index < arr.genres.length; index++) {
      if (arr.genres[index].name === genre) {
        new_arr.push(arr);
      }
    }
  });
  return {
    type: FILTRO_GENERO,
    payload: new_arr,
  };
};

export const filtroExisteAgregado = (array) => {
  var new_array = array.filter((arr) => arr.hasOwnProperty("created"));

  console.log(new_array);

  return {
    type: FILTRO_EXISTE_AGREGADO,
    payload: new_array,
  };
};

export const paginadoSiguiente = (array) => {
  return {
    type: FILTRO_EXISTE_AGREGADO,
    payload: array,
  };
};

export const paginadoAnterior = (array) => {
  return {
    type: FILTRO_EXISTE_AGREGADO,
    payload: array,
  };
};
