import React, { Fragment } from "react";
import { connect } from "react-redux";

import ComentarioLista from "./ComentarioLista";
import "../../CSS/Comentario.css";

const TablaComentarios = props => {
  const ponerFilas = () => {
    props.comentarios.map(comentario => (
      <ComentarioLista key={comentario.id} comentario={comentario} />
    ));
  };

  return (
    <Fragment>
      {props.comentarios && props.comentarios.length > 0 ? (
        <ul className="list-group mt-5">{ponerFilas()}</ul>
      ) : (
        <p className="sin_comentarios">
          There are not comments yet for this movie
        </p>
      )}
    </Fragment>
  );
};

const mapStateToProps = reducers => {
  return reducers.ComentariosReducer;
};

export default connect(mapStateToProps)(TablaComentarios);
