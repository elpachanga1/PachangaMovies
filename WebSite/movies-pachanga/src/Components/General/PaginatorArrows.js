import React from "react";
import { connect } from "react-redux";
import * as PelisActions from "../../Actions/PelisActions";

const Paginator = (props) => {
  const {
    paginaActual,
    paginasTotales,
    GuardarCambioPagina,
    TraerPelis,
  } = props;

  const paginaAnterior = () => {
    GuardarCambioPagina(paginaActual - 1);
    TraerPelis();
  };

  const paginaSiguiente = () => {
    GuardarCambioPagina(paginaActual + 1);
    TraerPelis();
  };

  return (
    <div className="row justify-content-center align-items-center mt-5">
      {
        //controla la aparicion del boton anterior si esta en la pagina 1
        paginaActual === 1 ? null : (
          <button
            onClick={paginaAnterior}
            type="button"
            className="btn btn-info mr-5"
          >
            &laquo; Anterior
          </button>
        )
      }
      <h4 className="mr-5">{`Pagina ${paginaActual} de ${paginasTotales}`}</h4>
      {
        //controla la aparicion del boton siguiente si esta en la ultima pagina
        paginaActual === paginasTotales ? null : (
          <button
            onClick={paginaSiguiente}
            type="button"
            className="btn btn-info"
          >
            Siguiente &raquo;
          </button>
        )
      }
    </div>
  );
};

const mapStateToProps = (reducers) => {
  return reducers.PelisReducer;
};

export default connect(mapStateToProps, PelisActions)(Paginator);
