import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import Buscador from "../Peliculas/BuscadorPelis";

const Header = (props) => {
  const { username } = props;

  return (
    //no se usan los links de react-bootstrap porque recargan pagina, son mejores los de react-router-dom
    <Navbar bg="dark" expand="lg">
      <Link to="/" className="navbar-brand">
        <img
          className={username ? "logo rounded-circle" : "logo"}
          src={`${process.env.PUBLIC_URL}${
            username ? "user-an" : "movie-camera-icon"
          }.png`}
          alt="logo"
        />
      </Link>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {
          <Nav className="mr-auto">
            <NavLink to="/" className="nav-link" activeClassName="active">
              Movies
            </NavLink>
            {username ? (
              <NavLink
                to="/logout"
                className="nav-link"
                activeClassName="active"
              >
                {username} Log Out?
              </NavLink>
            ) : (
              <Fragment>
                <NavLink
                  to="/login"
                  className="nav-link"
                  activeClassName="active"
                >
                  Log In
                </NavLink>
                <NavLink
                  to="/signup"
                  className="nav-link"
                  activeClassName="active"
                >
                  Sign Up
                </NavLink>
              </Fragment>
            )}
          </Nav>
        }
        <Buscador />
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = (reducers) => {
  return reducers.UsuariosReducer;
};

export default connect(mapStateToProps)(Header);
