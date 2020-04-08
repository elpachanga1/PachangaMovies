import { config } from "./MoviesAPI";

export const loadState = () => {
  try {
    const serializedData = localStorage.getItem("state");
    if (serializedData === null) {
      return undefined; // Si no existe el state en el local storage devolvemos undefined para que cargue el state inicial que hayamos definido
    }

    let deserializedData = JSON.parse(serializedData); // Si encontramos con exito nuestro storage lo devolvemos.

    //algunos datos por defecto que se deben escribir para que la aplicacion no genere errores
    deserializedData.PelisReducer.paginaActual = config.page;
    deserializedData.PelisReducer.ano = config.yearSince;

    return deserializedData;
  } catch (error) {
    return undefined; // Si ocurre algun error, devuelvo undefined para cargar el state inicial.
  }
};

export const saveState = (state) => {
  try {
    let serializedData = JSON.stringify(state);
    localStorage.setItem("state", serializedData);
  } catch (error) {
    // Acá podemos capturar o crear cualquier log que deseemos en caso de que falle el salvado en el storage.
    console.log(error);
  }
};
