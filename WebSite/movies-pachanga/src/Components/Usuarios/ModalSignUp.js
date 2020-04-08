import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import * as UsuariosActions from "../../Actions/UsuariosActions";

function ModalSignUp(props) {
  const { history } = props;
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    //redirect
    history.push("/");
  };

  const createNewUser = () => {
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;
    const name = document.getElementById("name").value;
    const pass2 = document.getElementById("pass2").value;

    if (!user || !name || !pass || !pass2) {
      Swal.fire({
        type: "Warning",
        title: "Oops...",
        text: `All fields should be required`,
      });
      return;
    } else if (pass !== pass2) {
      Swal.fire({
        type: "Warning",
        title: "Oops...",
        text: `Both passwords must be Equals`,
      });
      return;
    }

    props
      .CrearUsuario({
        username: user,
        password: pass,
        name: name,
      })
      .then(() => {})
      .catch((err) => {
        Swal.fire({
          type: "Warning",
          title: "Oops...",
          text: "Something went wrong, Try Later",
        });
      });

    setShow(false);
    //redirect
    history.push("/");
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="d-block">
            <label className="col-md-3 col-sm-3">
              <strong>Username: </strong>
            </label>
            <input
              type="text"
              id="user"
              name="user"
              className="col-md-8 col-sm-8"
              required
            />
            <br />
            <br />
            <label className="col-md-3 col-sm-3">
              <strong>Name: </strong>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="col-md-8 col-sm-8"
              required
            />
            <br />
            <br />
            <label className="col-md-3 col-sm-3">
              <strong>Password: </strong>
            </label>
            <input
              className="col-md-8 col-sm-8"
              type="password"
              id="pass"
              name="pass"
              required
            />
            <br />
            <br />
            <label className="col-md-3 col-sm-3">
              <strong>Confirm Password: </strong>
            </label>
            <input
              className="col-md-8 col-sm-8 align-top"
              type="password"
              id="pass2"
              name="pass2"
              required
            />
            <br />
            <br />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Link to={`/login`} className="btn btn-info">
            Log In
          </Link>
          <div className="ml-auto">
            <Button className="mr-3" variant="info" onClick={createNewUser}>
              Create
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
const mapStateToProps = ({ UsuariosReducer }) => {
  return {
    UsuariosReducer,
  };
};

export default connect(mapStateToProps, UsuariosActions)(ModalSignUp);
