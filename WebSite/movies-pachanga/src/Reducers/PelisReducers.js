import * as Types from "../Types/PelisTypes";

const INITIAL_STATE = {
  pelis: [],
  cargando: false,
  error: "",
  paginaActual: 1,
  paginasTotales: 1,
  ano: 2010,
  anoDesde: 2010,
  anoHasta: 2019
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.TRAER_PELIS:
      return {
        ...state,
        pelis: action.payload,
        cargando: false,
        error: "",
        paginasTotales: action.payload.length
      };
    case Types.CARGANDO:
      return { ...state, cargando: true, error: "" };
    case Types.ERROR:
      return { ...state, cargando: false, error: action.payload };
    case Types.CAMBIO_PAGINA:
      return { ...state, paginaActual: action.payload };
    default:
      return state;
  }
};
