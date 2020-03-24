import React, { useState } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import * as PelisActions from "../../Actions/PelisActions";

function Buscador(props) {
  const { ano, anoDesde, anoHasta, GuardarAno, TraerPelis } = props;

  const [year, guardarYear] = useState(ano);

  const handleChange = event => {
    console.log(event.target.value);
    guardarYear(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (year >= anoDesde && year <= anoHasta) {
      GuardarAno(year);
      TraerPelis();
    } else {
      Swal.fire({
        type: "Warning",
        title: "Oops...",
        text: `Year value must be between ${anoDesde} and ${anoHasta}`
      });

      guardarYear(ano);
      document.getElementById("TextAno").value = "";
    }
  };

  return (
    <form className="form-inline" onSubmit={handleSubmit}>
      <input
        id="TextAno"
        type="search"
        placeholder="Search per Year"
        aria-label="Search"
        onChange={handleChange}
        className="form-control mr-sm-2"
      />
      <button type="submit" value="Search" className="btn btn-info m-2 my-sm-0">
        Search
      </button>
    </form>
  );
}

const mapStateToProps = reducers => {
  return reducers.PelisReducer;
};

export default connect(mapStateToProps, PelisActions)(Buscador);
