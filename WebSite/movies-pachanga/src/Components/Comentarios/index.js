import React, { Component } from "react";
import { connect } from "react-redux";

import Spinner from "../General/Spinner";
import Error from "../General/Error";
import TablaComentarios from "./TablaComentarios";
import InputComentario from "./InputComentario";
import Peli from "../Peliculas/Peli";
import * as ComentariosActions from "../../Actions/ComentariosActions";

const { TraerComentarios } = ComentariosActions;

class Comentarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pelicula: {},
    };
  }

  async componentDidMount() {
    const {
      TraerComentarios,
      PelisReducer,
      match: {
        params: { key },
      },
    } = this.props;

    await TraerComentarios(key);

    this.setState({
      pelicula: PelisReducer.pelis.filter((peli) => peli.id == key)[0],
    });
  }

  //https://loading.io/css
  //una pagina para descargar iconos de CSS para tu aplicacion
  ponerComentarios = () => {
    const {
      ComentariosReducer: { cargando, error },
    } = this.props;

    if (cargando) return <Spinner />;
    if (error) return <Error mensaje={error} />;

    return <TablaComentarios history={this.props.history} />;
  };

  ponerPelicula = () => {
    const { pelicula } = this.state;

    if (pelicula) {
      return <Peli peli={pelicula} />;
    } else {
      return <h1 className="text-center">No se encontro pelicula</h1>;
    }
  };

  render() {
    return (
      <div>
        {this.ponerPelicula()}
        <h1 className="text-center">Comments</h1>
        <InputComentario
          movie_id={this.props.match.params.key}
          history={this.props.history}
        />
        {this.ponerComentarios()}
      </div>
    );
  }
}

const mapStateToProps = ({
  ComentariosReducer,
  PelisReducer,
  UsuariosReducer,
}) => {
  return {
    ComentariosReducer,
    PelisReducer,
    UsuariosReducer,
  };
};

const mapDispatchToProps = {
  TraerComentarios,
};

export default connect(mapStateToProps, mapDispatchToProps)(Comentarios);
