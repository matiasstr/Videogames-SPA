import {
  GET_ALL_VIDEOGAMES,
  GET_VIDEOGAMES,
  GET_VIDEOGAME,
  ORDER_ASC,
  ORDER_DES,
  ORDER_RATING_ASC,
  ORDER_RATING_DES,
  FILTRO_GENERO,
  FILTRO_AGREGADO,
  GET_GENRES,
  POST_VIDEOGAME,
  FILTRO_EXISTENTES,
  CLEAR,
  EMPTY_VIDEOGAME,
  FILTRADO_REVERSA,
} from "../actions/actions";

const initialState = {
  games: [],
  aux: [],
  auxFil: [],
  gameDetail: {},
  genres: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR:
      return {
        ...state,
        games: state.aux,
      };

    case GET_ALL_VIDEOGAMES:
      return {
        ...state,
        games: action.payload,
        aux: action.payload,
        auxFil: action.payload,
      };
    case GET_VIDEOGAMES:
      return {
        ...state,
        games: action.payload,
      };

    case EMPTY_VIDEOGAME:
      var obj = {};

      return {
        ...state,
        gameDetail: obj,
      };
    case GET_VIDEOGAME:
      return {
        ...state,
        gameDetail: action.payload,
      };

    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    case POST_VIDEOGAME:
      return {
        ...state,
      };

    case ORDER_ASC:
      return {
        ...state,
        games: [...action.payload],
      };
    case ORDER_DES:
      return {
        ...state,
        games: [...action.payload],
      };

    case ORDER_RATING_ASC:
      return {
        ...state,
        games: [...action.payload],
      };

    case ORDER_RATING_DES:
      return {
        ...state,
        games: [...action.payload],
      };

    case FILTRADO_REVERSA:
      var arrfilrado = state.auxFil;
      var arraux = [];

      for (let index = 0; index < action.payload.length; index++) {
        arrfilrado.map((g) => {
          for (let i = 0; i < g.genres.length; i++) {
            if (g.genres[i].name === action.payload[index]) {
              arraux = [...arraux, g];
            }
          }
        });
        arrfilrado = [...arraux];
        arraux = [];
      }

      return {
        ...state,
        games: arrfilrado,
      };

    case FILTRO_GENERO:
      if (!action.payload.length) {
        alert("No se encontraron coincidencias");
        return {
          ...state,
          games: state.aux,
        };
      } else {
        return {
          ...state,
          games: [...action.payload],
        };
      }

    case FILTRO_AGREGADO:
      if (!action.payload.length) {
        alert("No se encontraron coincidencias");
        return {
          ...state,
          games: state.aux,
        };
      } else {
        return {
          ...state,
          games: [...action.payload],
        };
      }

    case FILTRO_EXISTENTES:
      if (!action.payload.length) {
        alert("No se encontraron coincidencias");
        return {
          ...state,
          games: state.aux,
        };
      } else {
        return {
          ...state,
          games: [...action.payload],
        };
      }
    default:
      return state;
  }
};

export default rootReducer;
