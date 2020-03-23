import * as Types from "../Types/ComentariosTypes";

const INITIAL_STATE = {
  comentarios: [],
  cargando: false,
  error: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.TRAER_COMENTARIOS:
      return {
        ...state,
        comentarios: action.payload,
        cargando: false,
        error: ""
      };
    case Types.CARGANDO:
      return { ...state, cargando: true, error: "" };
    case Types.ERROR:
      return { ...state, cargando: false, error: action.payload };
    default:
      return state;
  }
};
