import React, { Component } from "react";
import { connect } from "react-redux";

import Spinner from "../General/Spinner";
import Error from "../General/Error";
import TablaComentarios from "./TablaComentarios";
import Peli from "../Peliculas/Peli";
import * as ComentariosActions from "../../Actions/ComentariosActions";

class Comentarios extends Component {
  /*
  componentDidMount() {
    const {
      match: {
        params: { key }
      }
    } = this.props;

    if (!this.props.comentarios.length) {
      this.props.TraerComentarios(key);
    }
  }*/

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

  ponerPelicula = () => {
    //aqui si se puede deestructurar porque usuariosReducer se ejecuta en el render
    const {
      PelisReducer,
      match: {
        params: { key }
      }
    } = this.props;

    if (PelisReducer.error) {
      return <Error mensaje={PelisReducer.error} />;
    }

    if (!PelisReducer.pelis.length || PelisReducer.cargando) {
      return <Spinner />;
    }

    const pelicula = PelisReducer.pelis.filter(peli => peli.id == key)[0];

    return <Peli peli={pelicula} />;
  };

  render() {
    console.log(this.props);
    return (
      <div>
        {this.ponerPelicula()}
        <h1 className="text-center">Comments</h1>
        {this.ponerComentarios()}
      </div>
    );
  }
}

const mapStateToProps = ({ ComentariosReducer, PelisReducer }) => {
  return {
    ComentariosReducer,
    PelisReducer
  };
};

export default connect(mapStateToProps, ComentariosActions)(Comentarios);
