import React from "react";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import ReactStars from "react-stars";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { links } from "../../Utils/MoviesAPI";
import "../../CSS/Comentario.css";
import * as ComentariosActions from "../../Actions/ComentariosActions";
import needLogin from "../Usuarios/Helper/needLogin";

const { EliminarComentario, SeleccionarComentario } = ComentariosActions;

function ComentarioLista(props) {
  const {
    comentario,
    UsuariosReducer: { token, username },
    SeleccionarComentario,
    EliminarComentario,
    history,
  } = props;

  const editarComentario = () => {
    const ref = document.getElementById("lblMainComments").offsetTop;
    window.scrollTo(0, ref - 25);
    SeleccionarComentario(comentario);
  };

  const eliminarComentario = (id) => {
    if (!username || moment().isAfter(token.expirationDateTime)) {
      return needLogin(history);
    }

    console.log("eliminando", id);

    Swal.fire({
      title: "Are You Sure?",
      text: "A deleted comment can't be recovered",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yeah, kill it!",
      cancelButtonText: "Nohh, let it to live",
    }).then(async (result) => {
      if (result.value) {
        try {
          const config = {
            headers: { Authorization: `Bearer ${token.token}` },
          };

          const url = `${links.database_api}/api/comment/${id}`;

          const resultado = await axios.delete(url, config);

          if (resultado.status === 200) {
            Swal.fire(
              "You kill it!",
              "Are you concient that you did?.",
              "success"
            );
            EliminarComentario(comentario);
          }
        } catch (ex) {
          console.log(ex);
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: "An Error Happened, Try again",
          });
        }
      }
    });
  };

  return (
    <li className="list-group-item">
      <div className="row p-1">
        <div className="col-xl-8 col-lg-7 col-xs-6">
          <h4>{comentario.username}</h4>
          <h6>
            {moment(comentario.created).format("MMMM Do YYYY, h:mm:ss a")}
          </h6>
          <p className="text-justify">
            <span className="font-weight-bold">
              Username: {comentario.name}
            </span>
            <br />
            {comentario.paragraph}
          </p>
        </div>

        <div className="col-xl-2 col-lg-2 col-xs-2">
          <ReactStars
            className="stars"
            count={5}
            edit={false}
            size={30}
            color2={"#ffd700"}
            value={comentario.stars ? comentario.stars : 0}
          />
        </div>

        {token && comentario.username === username ? (
          <div className="col-xl-1 col-lg-1 col-xs-2 pt-3">
            <button
              type="button"
              className="btn btn-info mr-2"
              onClick={() => editarComentario()}
            >
              Editar
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => eliminarComentario(comentario.id)}
            >
              Eliminar &times;
            </button>
          </div>
        ) : null}
      </div>
    </li>
  );
}

const mapStateToProps = ({ UsuariosReducer }) => {
  return {
    UsuariosReducer,
  };
};

const mapDispatchToProps = {
  EliminarComentario,
  SeleccionarComentario,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ComentarioLista)
);
