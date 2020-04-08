import * as Types from "../Types/PelisTypes";
import { config } from "../Utils/MoviesAPI";

const INITIAL_STATE = {
  pelis: [],
  cargando: false,
  error: "",
  paginaActual: config.page,
  paginasTotales: config.page,
  ano: config.yearSince,
  anoDesde: config.yearSince,
  anoHasta: config.yearTo,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.TRAER_PELIS:
      return {
        ...state,
        pelis: action.payload,
        cargando: false,
        error: "",
        paginasTotales: action.payload.length,
      };
    case Types.CARGANDO:
      return { ...state, cargando: true, error: "" };
    case Types.ERROR:
      return { ...state, cargando: false, error: action.payload };
    case Types.CAMBIO_PAGINA:
      return { ...state, paginaActual: action.payload };
    case Types.CAMBIO_ANO:
      return { ...state, ano: action.payload, paginaActual: config.page };
    default:
      return state;
  }
};
