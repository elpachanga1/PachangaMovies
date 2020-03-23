import React, { Component } from "react";
import { connect } from "react-redux";

import Spinner from "../General/Spinner";
import Error from "../General/Error";
import TablaComentarios from "./TablaComentarios";
import * as ComentariosActions from "../../Actions/ComentariosActions";

class Comentarios extends Component {
  componentDidMount() {
    if (!this.props.comentarios.length) {
      this.props.TraerComentarios(243);
    }
  }

  //https://loading.io/css
  //una pagina para descargar iconos de CSS para tu aplicacion
  ponerComentarios = () => {
    if (this.props.cargando) {
      return <Spinner />;
    }

    if (this.props.error) {
      return <Error mensaje={this.props.error} />;
    }

    return <TablaComentarios />;
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <h1 className="text-center">Comments</h1>
        {this.ponerComentarios()}
      </div>
    );
  }
}

const mapStateToProps = reducers => {
  return reducers.ComentariosReducer;
};

export default connect(mapStateToProps, ComentariosActions)(Comentarios);
