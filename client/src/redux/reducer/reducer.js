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
  FILTRO_EXISTENTES
} from "../actions/actions";

const initialState = {
  games: [],
  gameDetail: [],
  genres: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VIDEOGAMES:
      return {
        ...state,
        games: action.payload,
      };
    case GET_VIDEOGAMES:
      return {
        ...state,
        games: action.payload,
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
        games: [action.payload, ...state.games],
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

    case FILTRO_GENERO:
      return {
        ...state,
        games: [...action.payload],
      };

    case FILTRO_AGREGADO:
      return {
        ...state,
        games: [...action.payload],
      };

    case FILTRO_EXISTENTES:
      return {
        ...state,
        games: [...action.payload],
      };
    default:
      return state;
  }
};

export default rootReducer;
