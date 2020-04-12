import * as Types from "../Types/ComentariosTypes";

const INITIAL_STATE = {
  comentario: {},
  comentarios: [],
  cargando: false,
  error: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.TRAER_COMENTARIOS:
      return {
        ...state,
        comentarios: action.payload,
        comentario: {},
        cargando: false,
        error: "",
      };
    case Types.CARGANDO:
      return { ...state, cargando: true, error: "" };
    case Types.ERROR:
      return { ...state, cargando: false, error: action.payload };
    case Types.SELECCIONAR_COMENTARIO:
      return { ...state, comentario: action.payload };
    default:
      return state;
  }
};
