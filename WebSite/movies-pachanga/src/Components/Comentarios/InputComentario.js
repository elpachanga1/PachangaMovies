import React, { useState } from "react";
import ReactStars from "react-stars";
import { connect } from "react-redux";
import moment from "moment";

import "../../CSS/Comentario.css";
import * as ComentariosActions from "../../Actions/ComentariosActions";
import needLogin from "../Usuarios/Helper/needLogin";

const { CrearComentario, TraerComentarios } = ComentariosActions;

function InputComentario(props) {
  const [stars, setStars] = useState(0);
  const [paragraph, setParagraph] = useState("");

  const writeStars = (e) => {
    setStars(e);
  };

  const writeParagraph = (e) => {
    setParagraph(e.target.value);
  };

  const handleSubmit = async (event) => {
    const {
      CrearComentario,
      TraerComentarios,
      UsuariosReducer,
      history,
    } = props;

    event.preventDefault();

    if (
      !UsuariosReducer.username ||
      moment().isAfter(UsuariosReducer.token.expirationDateTime)
    ) {
      needLogin(history);
    } else {
      const MovieID = event.target.action.split("/");
      const movie_id = MovieID[MovieID.length - 1];

      const comentario = {
        stars,
        paragraph,
        movie_id,
      };

      CrearComentario(comentario);
      await TraerComentarios(movie_id);
    }
  };

  return (
    <li className="list-group-item">
      <div className="row p-1 input_comentario">
        <form className="form-inline w-100" onSubmit={handleSubmit}>
          <input
            id="paragraph"
            type="text"
            className="form-control w-100 m-3"
            onChange={writeParagraph}
          />
          <div className="d-flex mx-3 ml-auto">
            <ReactStars
              id="stars"
              className="stars"
              count={5}
              edit={true}
              size={30}
              color2={"#ffd700"}
              half={false}
              onChange={writeStars}
            />
            <h4>Type a new Comment</h4>
            <button type="submit" value="Send" className="btn btn-info mx-3">
              Send
            </button>
          </div>
        </form>
      </div>
    </li>
  );
}

const mapStateToProps = ({ ComentariosReducer, UsuariosReducer }) => {
  return {
    ComentariosReducer,
    UsuariosReducer,
  };
};

const mapDispatchToProps = {
  CrearComentario,
  TraerComentarios,
};

export default connect(mapStateToProps, mapDispatchToProps)(InputComentario);
