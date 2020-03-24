import { combineReducers } from "redux";
import PelisReducer from "./PelisReducers";
import ComentariosReducer from "./ComentariosReducer";
import UsuariosReducer from "./UsuariosReducer";

export default combineReducers({
  PelisReducer,
  ComentariosReducer,
  UsuariosReducer
});
