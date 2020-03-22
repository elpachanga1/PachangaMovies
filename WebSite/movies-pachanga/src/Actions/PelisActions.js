import * as Types from "../Types/PelisTypes";
import axios from "axios";
import APIConfigs from "../Utils/MoviesAPI";

export const TraerPelis = () => async (dispatch, getState) => {
  dispatch({
    type: Types.CARGANDO
  });

  try {
    const { ano, paginaActual } = getState().PelisReducer;
    console.log(ano);
    console.log(paginaActual);

    const respuesta = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${APIConfigs.config.application_id}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${paginaActual}&year=${ano}`
    );

    console.log(respuesta.data.results);

    dispatch({
      type: Types.TRAER_PELIS,
      payload: respuesta.data.results
    });
  } catch (error) {
    console.log("Error: ", error.message);
    dispatch({
      type: Types.ERROR,
      payload: "Movies Information not Available"
    });
  }
};

export const GuardarCambioPagina = pagina => async dispatch => {
  dispatch({
    type: Types.CAMBIO_PAGINA,
    payload: pagina
  });
};

export const GuardarAno = ano => async dispatch => {
  dispatch({
    type: Types.CAMBIO_ANO,
    payload: ano
  });
};