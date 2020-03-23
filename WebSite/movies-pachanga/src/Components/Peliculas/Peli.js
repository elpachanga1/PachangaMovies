import React from "react";
import { links } from "../../Utils/MoviesAPI";
import "../../CSS/Pelicula.css";

function Peli({ peli }) {
  console.log(peli);
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3" id="img-peli">
          <img
            className="p-3 rounded mx-auto d-block"
            src={`${links.images_api_w200}/${peli.poster_path}`}
            alt="imagen"
          />
        </div>
        <div className="col-lg-8" id="content-peli">
          <h1 className="text-center">{peli.original_title}</h1>
          <p className="text-justify">
            <span className="font-weight-bold">
              Average: {peli.vote_average}
            </span>
            <br />
            {peli.overview}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Peli;
