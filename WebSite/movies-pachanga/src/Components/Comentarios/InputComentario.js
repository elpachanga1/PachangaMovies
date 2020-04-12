import React, { useState, useEffect } from "react";
import ReactStars from "react-stars";
import { connect } from "react-redux";
import moment from "moment";

import "../../CSS/Comentario.css";
import * as ComentariosActions from "../../Actions/ComentariosActions";
import needLogin from "../Usuarios/Helper/needLogin";

const {
  CrearComentario,
  EditarComentario,
  TraerComentarios,
} = ComentariosActions;

function InputComentario(props) {
  const { comentario } = props.ComentariosReducer;

  const [stars, setStars] = useState(0);
  const [paragraph, setParagraph] = useState("");

  useEffect(() => {
    if (Object.keys(comentario).length > 0) {
      setStars(comentario.stars);
      setParagraph(comentario.paragraph);
    } else {
      setStars(0);
      setParagraph("");
    }
  }, [comentario]);

  const writeStars = (e) => {
    setStars(e);
  };

  const writeParagraph = (e) => {
    setParagraph(e.target.value);
  };

  const handleSubmit = async (event) => {
    debugger;
    const {
      CrearComentario,
      EditarComentario,
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

      const comment = {
        stars,
        paragraph,
        movie_id,
      };

      if (Object.keys(comentario).length > 0) {
        comment.id = comentario.id;
        comment.user_id = UsuariosReducer.token.user_id;

        EditarComentario(comment);
      } else {
        CrearComentario(comment);
      }
    }
  };

  return (
    <li className="list-group-item pb-4">
      <div className="row p-1 input_comentario">
        <form className="form-inline w-100" onSubmit={handleSubmit}>
          <input
            id="paragraph"
            type="text"
            className="form-control w-100 mx-3 mt-3"
            onChange={writeParagraph}
            value={paragraph}
          />
          <div className="d-flex flex-row bd-highlight mx-3 w-100 align-items-center">
            <ReactStars
              className="bd-highlight mr-auto mb-4"
              count={5}
              edit={true}
              size={50}
              color2={"#ffd700"}
              half={false}
              value={stars}
              onChange={writeStars}
            />
            <h4 id="lblComment" className="bd-highlight">
              Type a new Comment
            </h4>
            <button
              id="btnComment"
              type="submit"
              value="Send"
              className="btn btn-info mx-3 bd-highlight"
            >
              {Object.keys(comentario).length > 0 ? "Edit" : "Send"}
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
  EditarComentario,
  TraerComentarios,
};

export default connect(mapStateToProps, mapDispatchToProps)(InputComentario);
