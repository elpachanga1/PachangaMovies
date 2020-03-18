import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {Link, NavLink} from 'react-router-dom';
import Buscador from './Peliculas/BuscadorPelis';

const Header = (props) => {
    const {ano, anoDesde, anoHasta, guardarAno, guardarRecargar} = props;
    
    return(
        //no se usan los links de react-bootstrap porque recargan pagina, son mejores los de react-router-dom
        <Navbar bg="dark" expand="lg">
            <Link to="/" className="navbar-brand">
                <img className="logo" src={process.env.PUBLIC_URL + 'movie-camera-icon.png'} alt="logo"/>
            </Link>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink 
                        to="/"
                        className="nav-link"
                        activeClassName="active">
                        Movies
                    </NavLink>
                </Nav>

                <Buscador 
                    ano={ano}
                    anoDesde={anoDesde}
                    anoHasta={anoHasta}
                    guardarAno={guardarAno}
                    guardarRecargar={guardarRecargar}
                />
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;