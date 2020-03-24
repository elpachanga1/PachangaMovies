import React, { Component } from "react";
import { connect } from "react-redux";
import * as PelisActions from "../../Actions/PelisActions";
import Spinner from "../General/Spinner";
import Error from "../General/Error";
import TablaPelis from "./TablaPelis";
import PaginatorArrows from "../General/PaginatorArrows";
import ModalLogin from "../Usuarios/ModalLogin";

class Peliculas extends Component {
  componentDidMount() {
    if (!this.props.pelis.length) {
      this.props.TraerPelis();
    }

    if (this.props.location.pathname === "/login") {
      this.setState({ show: true });
    }
  }

  //https://loading.io/css
  //una pagina para descargar iconos de CSS para tu aplicacion
  ponerContenido = () => {
    if (this.props.cargando) {
      return <Spinner />;
    }

    if (this.props.error) {
      return <Error mensaje={this.props.error} />;
    }

    return <TablaPelis />;
  };

  render() {
    return (
      <div>
        <h1 className="text-center">Movie Portal</h1>
        {this.ponerContenido()}

        {this.props.location.pathname === "/login" ? (
          <ModalLogin history={this.props.history} />
        ) : null}

        <PaginatorArrows />
      </div>
    );
  }
}

const mapStateToProps = reducers => {
  return reducers.PelisReducer;
};

export default connect(mapStateToProps, PelisActions)(Peliculas);
