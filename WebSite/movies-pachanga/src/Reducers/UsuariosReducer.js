import * as Types from "../Types/UsuariosTypes";

const INITIAL_STATE = {
  token: "",
  cargando: false,
  error: "",
  respuesta: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.TRAER_USUARIO:
      return {
        ...state,
        token: action.payload,
        cargando: false,
        error: ""
      };
    case Types.CREAR_USUARIO:
      return {
        ...state,
        respuesta: action.payload,
        cargando: false,
        error: ""
      };
    case Types.CARGANDO:
      return { ...state, cargando: true, error: "" };
    case Types.ERROR:
      return {
        ...state,
        cargando: false,
        error: action.payload
      };
    case Types.SALIR_USUARIO:
      return { ...state, token: "" };
    default:
      return state;
  }
};
