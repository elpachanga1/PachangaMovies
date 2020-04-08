import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import * as UsuariosActions from "../../Actions/UsuariosActions";

function ModalLogin(props) {
  const { history } = props;
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    //redirect
    history.push("/");
  };

  const getToken = () => {
    const user = document.getElementById("fname").value;
    const pass = document.getElementById("lname").value;

    if (!user || !pass) {
      Swal.fire({
        type: "Warning",
        title: "Oops...",
        text: "Username and Password Should not be Void",
      });
      return;
    }

    props
      .TraerUsuario({
        username: user,
        password: pass,
      })
      .then(() => {})
      .catch((err) => {
        Swal.fire({
          type: "Warning",
          title: "Oops...",
          text: "Invalid Credentials",
        });
      });

    handleClose();
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
          <Modal.Title>Login User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="d-block">
            <label className="col-md-3 col-sm-3">
              <strong>Username: </strong>
            </label>
            <input
              type="text"
              id="fname"
              name="fname"
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
              id="lname"
              name="lname"
              required
            />
            <br />
            <br />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Link to={`/signup`} className="btn btn-info">
            Sign Up
          </Link>
          <div className="ml-auto">
            <Button className="mr-3" variant="info" onClick={getToken}>
              Login
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

export default connect(mapStateToProps, UsuariosActions)(ModalLogin);
