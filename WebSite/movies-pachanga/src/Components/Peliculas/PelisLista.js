import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";

function PeliLista(props) {
  const { history, peli } = props;

  const eliminarPeli = id => {
    console.log("eliminando", id);

    Swal.fire({
      title: "Are You Sure?",
      text: "A deleted commend can't be recovered",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yeah, kill it!",
      cancelButtonText: "Nohh, let it to live"
    }).then(async result => {
      if (result.value) {
        try {
          const url = `http://localhost:4000/restaurant/${id}`;

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

  return (
    <li
      data-categoria={peli.original_title}
      className="list-group-item d-flex justify-content-between align-items-center"
    >
      <div className="row p-1">
        <div className="col-xl-3 col-lg-4 col-xs-5">
          <img
            className="p-3 rounded mx-auto d-block"
            src={`https://image.tmdb.org/t/p/w200/${peli.backdrop_path}`}
            alt="imagen"
          />
        </div>

        <div className="col-xl-7 col-lg-6 col-xs-5">
          <h4>{peli.title}</h4>
          <p className="text-justify">
            <span className="font-weight-bold">
              Average: {peli.vote_average}
            </span>
            <br />
            {peli.overview}
          </p>
        </div>

        <div className="col-xl-2 col-lg-2 col-xs-2">
          <Link
            to={`/pelis/${peli.id}`}
            className="btn btn-info mr-2 rounded mx-auto d-block"
          >
            See More
          </Link>
        </div>
      </div>
    </li>
  );
}

export default withRouter(PeliLista);
