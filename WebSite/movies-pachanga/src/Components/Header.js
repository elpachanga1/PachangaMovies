import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import Buscador from './Peliculas/BuscadorPelis';

const Header = (props) => {
    const {ano, anoDesde, anoHasta, guardarAno, guardarRecargar} = props;
    
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    Comentarios de Películas
                </Link>

                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink 
                            to="/"
                            className="nav-link"
                            activeClassName="active">
                            Pelis
                        </NavLink>
                    </li>
                </ul>
                
                <Buscador 
                    ano={ano}
                    anoDesde={anoDesde}
                    anoHasta={anoHasta}
                    guardarAno={guardarAno}
                    guardarRecargar={guardarRecargar}
                />
            </div>
        </nav>
    );
}

export default Header;