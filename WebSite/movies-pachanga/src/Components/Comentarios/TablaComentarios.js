import React, { Fragment } from "react";
import { connect } from "react-redux";

import ComentarioLista from "./ComentarioLista";

const TablaComentarios = props => {
  const ponerFilas = () =>
    props.comentarios.map(comentario => (
      <ComentarioLista key={comentario.id} comentario={comentario} />
    ));

  return (
    <Fragment>
      <ul className="list-group mt-5">{ponerFilas()}</ul>
    </Fragment>
  );
};

const mapStateToProps = reducers => {
  return reducers.ComentariosReducer;
};

export default connect(mapStateToProps)(TablaComentarios);
