import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

function PeliLista({ peli }) {
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
