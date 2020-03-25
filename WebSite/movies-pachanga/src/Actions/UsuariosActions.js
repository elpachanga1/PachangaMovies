import * as Types from "../Types/UsuariosTypes";
import { links } from "../Utils/MoviesAPI";

import axios from "axios";
import Swal from "sweetalert2";

export const SalirUsuario = () => async dispatch => {
  dispatch({
    type: Types.SALIR_USUARIO
  });
};

export const TraerUsuario = data => async (dispatch, getState) => {
  dispatch({
    type: Types.CARGANDO
  });

  try {
    const respuesta = await axios.post(
      `${links.database_api}/api/user/login`,
      data
    );

    dispatch({
      type: Types.TRAER_USUARIO,
      payload: respuesta.data.body
    });

    Swal.fire("Good job!", `Welcome ${data.username}`, "success");

    dispatch({
      type: Types.USERNAME_USUARIO,
      payload: data.username
    });
  } catch (error) {
    console.log("Error: ", error.message);
    dispatch({
      type: Types.ERROR,
      payload: "User Information not Available"
    });
    throw error;
  }
};

export const CrearUsuario = data => async (dispatch, getState) => {
  dispatch({
    type: Types.CARGANDO
  });

  try {
    const respuesta = await axios.post(`${links.database_api}/api/user`, data);

    console.log(respuesta);

    dispatch({
      type: Types.CREAR_USUARIO,
      payload: respuesta.data.body
    });

    Swal.fire(
      "Good job!",
      `User ${data.username} Created Correctly`,
      "success"
    );
  } catch (error) {
    console.log("Error: ", error.message);
    dispatch({
      type: Types.ERROR,
      payload: "User haven't been created"
    });
    throw error;
  }
};
