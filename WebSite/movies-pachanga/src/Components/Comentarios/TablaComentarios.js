import React, { Fragment } from "react";

import ComentarioLista from "./ComentarioLista";
import "../../CSS/Comentario.css";

const TablaComentarios = ({ history, comentarios, token, username }) => {
  const ponerFilas = () => {
    return comentarios.map(comentario => (
      <ComentarioLista
        key={comentario.id}
        comentario={comentario}
        history={history}
        token={token}
        username={username}
      />
    ));
  };

  return (
    <Fragment>
      {comentarios && comentarios.length > 0 ? (
        <ul className="list-group mt-5">{ponerFilas()}</ul>
      ) : (
        <p className="sin_comentarios">
          There are not comments yet for this movie
        </p>
      )}
    </Fragment>
  );
};

export default TablaComentarios;
