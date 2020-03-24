import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import Buscador from "../Peliculas/BuscadorPelis";

const Header = () => {
  return (
    //no se usan los links de react-bootstrap porque recargan pagina, son mejores los de react-router-dom
    <Navbar bg="dark" expand="lg">
      <Link to="/" className="navbar-brand">
        <img
          className="logo"
          src={process.env.PUBLIC_URL + "movie-camera-icon.png"}
          alt="logo"
        />
      </Link>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink to="/" className="nav-link" activeClassName="active">
            Movies
          </NavLink>
          <NavLink to="/login" className="nav-link" activeClassName="active">
            Login
          </NavLink>
        </Nav>

        <Buscador />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
