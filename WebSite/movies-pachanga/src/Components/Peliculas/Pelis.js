import React, {Fragment, useState} from 'react';
import Swal from 'sweetalert2';
import PelisLista from './PelisLista';

export default function Pelis ({pelis, ano, anoDesde, anoHasta, guardarAno, guardarRecargar}) {
    const [year, guardarYear] = useState(ano);

    const handleChange  = (event) => {
        console.log(event.target.value);
        guardarYear(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (year >= anoDesde && year <= anoHasta){
            guardarAno(year);
            guardarRecargar(true);
        }
        else{
            Swal.fire({
                type: 'Advertencia',
                title: 'Oops...',
                text: `Valor de Año debe estar entre ${anoDesde} y ${anoHasta}`
            });

            guardarYear(ano);
            let TextAno = document.getElementById("TextAno");
            TextAno.value = "";
        }
    }

    return (
        <Fragment>
            <h1 className="text-center">Portal de Peliculas</h1>
            
            <form onSubmit={handleSubmit}>
                <h3>Año de Publicación</h3>
                <input id="TextAno" type="text" onChange={handleChange}></input>
                <input type="submit" value="Buscar" />
            </form>

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