import React from 'react';
import {Link, NavLink} from 'react-router-dom';

const Header = () => {
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
            </div>
        </nav>
    );
}

export default Header;