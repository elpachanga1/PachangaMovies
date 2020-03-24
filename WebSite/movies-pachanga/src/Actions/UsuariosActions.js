import * as Types from "../Types/UsuariosTypes";
import { links } from "../Utils/MoviesAPI";

import axios from "axios";

export const TraerUsuario = data => async dispatch => {
  dispatch({
    type: Types.CARGANDO
  });
  console.log("cargando");
  try {
    const respuesta = await axios.post(
      `${links.database_api}/api/user/login`,
      data
    );

    console.log(respuesta);

    dispatch({
      type: Types.TRAER_USUARIO,
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
