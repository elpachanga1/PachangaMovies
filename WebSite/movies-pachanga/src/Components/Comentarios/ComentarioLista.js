import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import ReactStars from "react-stars";
import { withRouter } from "react-router-dom";

import { links } from "../../Utils/MoviesAPI";
import "../../CSS/Comentario.css";

function ComentarioLista(props) {
  const { history, comentario } = props;

  const ratingChanged = event => {};

  const eliminarComentario = id => {
    console.log("eliminando", id);

    Swal.fire({
      title: "Are You Sure?",
      text: "A deleted comment can't be recovered",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yeah, kill it!",
      cancelButtonText: "Nohh, let it to live"
    }).then(async result => {
      if (result.value) {
        try {
          const url = `${links.database_api}/api/comment/${id}`;

          const resultado = await axios.delete(url);

          if (resultado.status === 200) {
            Swal.fire(
              "You kill it!",
              "Are you concient that you do?.",
              "success"
            );
          }
        } catch (ex) {
          console.log(ex);
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: "An Error Happened, Try again"
          });
        }

        //redirect
        history.push("/");
      }
    });
  };

  //<li className="list-group-item justify-content-between align-items-center">
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
            onChange={ratingChanged}
            edit={false}
            size={30}
            color2={"#ffd700"}
            value={comentario.stars ? comentario.stars : 0}
          />
        </div>

        <div className="col-xl-1 col-lg-1 col-xs-2 pt-3">
          <Link
            to={`/productos/editar/${comentario.id}`}
            className="btn btn-info mr-2"
          >
            Editar
          </Link>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => eliminarComentario(comentario.id)}
          >
            Eliminar &times;
          </button>
        </div>
      </div>
    </li>
  );
}

export default withRouter(ComentarioLista);