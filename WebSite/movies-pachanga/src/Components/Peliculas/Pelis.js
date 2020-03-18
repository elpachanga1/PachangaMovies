import React, {Fragment} from 'react';
import PelisLista from './PelisLista';

export default function Pelis ({pelis, guardarRecargar}) {
    
    return (
        <Fragment>
            <h1 className="text-center">Portal de Peliculas</h1>

            <ul className="list-group mt-5">
                {pelis.map(peli => (
                    <PelisLista
                        key={peli.id}
                        peli={peli}
                        guardarRecargar={guardarRecargar}
                    />
                ))}
            </ul>
        </Fragment>
    );
}