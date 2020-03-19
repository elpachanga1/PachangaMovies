import React, { Fragment } from "react";
import { connect } from "react-redux";

import PelisLista from "./PelisLista";

const TablaPelis = props => {
  const ponerFilas = () =>
    props.pelis.map(peli => <PelisLista key={peli.id} peli={peli} />);

  return (
    <Fragment>
      <ul className="list-group mt-5">{ponerFilas()}</ul>
    </Fragment>
  );
};

const mapStateToProps = reducers => {
  return reducers.PelisReducer;
};

export default connect(mapStateToProps)(TablaPelis);
