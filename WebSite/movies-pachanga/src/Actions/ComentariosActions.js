import * as Types from "../Types/ComentariosTypes";
import { links } from "../Utils/MoviesAPI";

import axios from "axios";

export const TraerComentarios = (key) => async (dispatch) => {
  dispatch({
    type: Types.CARGANDO,
  });

  try {
    const respuesta = await axios.get(
      `${links.database_api}/api/comment/movie/${key}`
    );

    console.log(respuesta);

    dispatch({
      type: Types.TRAER_COMENTARIOS,
      payload: respuesta.data.body,
    });
  } catch (error) {
    console.log("Error: ", error.message);
    dispatch({
      type: Types.ERROR,
      payload: "Comments Information not Available",
    });
  }
};

export const EliminarComentario = (data) => (dispatch, getState) => {
  const { comentarios } = getState().ComentariosReducer;

  dispatch({
    type: Types.CARGANDO,
  });

  dispatch({
    type: Types.TRAER_COMENTARIOS,
    payload: comentarios.filter((item) => item.id !== data.id),
  });
};

export const SeleccionarComentario = (data) => (dispatch) => {
  dispatch({
    type: Types.SELECCIONAR_COMENTARIO,
    payload: data,
  });
};

export const CrearComentario = (data) => async (dispatch, getState) => {
  const { token } = getState().UsuariosReducer;

  try {
    const config = {
      headers: { Authorization: `Bearer ${token.token}` },
    };

    const respuesta = await axios.post(
      `${links.database_api}/api/comment/`,
      data,
      config
    );

    console.log(respuesta);
  } catch (error) {
    console.log("Error: ", error.message);
    dispatch({
      type: Types.ERROR,
      payload: "Comments Information not Available",
    });
  }
};

export const EditarComentario = (data) => async (dispatch, getState) => {
  debugger;
  const { token } = getState().UsuariosReducer;
  const { comentarios } = getState().ComentariosReducer;

  try {
    const config = {
      headers: { Authorization: `Bearer ${token.token}` },
    };

    const respuesta = await axios.put(
      `${links.database_api}/api/comment/`,
      data,
      config
    );

    console.log(respuesta);

    const comentariosActualizados = comentarios.map((item) => {
      if (item.id === data.id) {
        item.stars = data.stars;
        item.paragraph = data.paragraph;
      }
      return item;
    });

    dispatch({
      type: Types.TRAER_COMENTARIOS,
      payload: comentariosActualizados,
    });
  } catch (error) {
    console.log("Error: ", error.message);
    dispatch({
      type: Types.ERROR,
      payload: "Comments Information not Available",
    });
  }
};
