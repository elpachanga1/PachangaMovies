import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";

import Spinner from "../General/Spinner";
import Error from "../General/Error";
import TablaPelis from "./TablaPelis";
import PaginatorArrows from "../General/PaginatorArrows";
import ModalLogin from "../Usuarios/ModalLogin";
import ModalSignUp from "../Usuarios/ModalSignUp";

import * as PelisActions from "../../Actions/PelisActions";
import * as UsuariosActions from "../../Actions/UsuariosActions";

import ValidateExpirationDate from "../../Utils/ValidateExpirationDate";

const { TraerPelis } = PelisActions;
const { SalirUsuario } = UsuariosActions;

class Peliculas extends Component {
  componentDidMount() {
    const { TraerPelis } = this.props;

    if (!this.props.PelisReducer.pelis.length) {
      TraerPelis();
    }
  }

  //https://loading.io/css
  //una pagina para descargar iconos de CSS para tu aplicacion
  ponerContenido = () => {
    if (this.props.PelisReducer.cargando) {
      return <Spinner />;
    }

    if (this.props.PelisReducer.error) {
      return <Error mensaje={this.props.error} />;
    }

    return <TablaPelis />;
  };

  SalirUsuario = () => {
    ValidateExpirationDate(this.props);

    if (this.props.location.pathname === "/logout") {
      this.props.SalirUsuario();

      Swal.fire("Good job!", "User Logged Out Correctly", "success");
      this.props.history.push("/");
    }
  };

  render() {
    this.SalirUsuario();

    return (
      <div>
        <h1 className="text-center">Movie Portal</h1>
        {this.ponerContenido()}

        {this.props.location.pathname === "/login" ? (
          <ModalLogin history={this.props.history} />
        ) : null}

        {this.props.location.pathname === "/signup" ? (
          <ModalSignUp history={this.props.history} />
        ) : null}

        <PaginatorArrows />
      </div>
    );
  }
}

const mapStateToProps = ({ PelisReducer, UsuariosReducer }) => {
  return { PelisReducer, UsuariosReducer };
};

const mapDispatchToProps = {
  TraerPelis,
  SalirUsuario,
};

export default connect(mapStateToProps, mapDispatchToProps)(Peliculas);
