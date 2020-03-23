import * as Types from "../Types/ComentariosTypes";
import { links } from "../Utils/MoviesAPI";

import axios from "axios";

export const TraerComentarios = key => async dispatch => {
  dispatch({
    type: Types.CARGANDO
  });

  try {
    const respuesta = await axios.get(
      `${links.database_api}/api/comment/movie/${key}`
    );

    console.log(respuesta);

    dispatch({
      type: Types.TRAER_COMENTARIOS,
      payload: respuesta.data.body
    });
  } catch (error) {
    console.log("Error: ", error.message);
    dispatch({
      type: Types.ERROR,
      payload: "Comments Information not Available"
    });
  }
};
