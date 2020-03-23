import { combineReducers } from "redux";
import PelisReducer from "./PelisReducers";
import ComentariosReducer from "./ComentariosReducer";

export default combineReducers({
  PelisReducer,
  ComentariosReducer
});
