import React, {useState} from 'react';
import Swal from 'sweetalert2';

export default function Buscador ({ano, anoDesde, anoHasta, guardarAno, guardarRecargar}){
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
                type: 'Warning',
                title: 'Oops...',
                text: `Year value must be between ${anoDesde} and ${anoHasta}`
            });

            guardarYear(ano);
            let TextAno = document.getElementById("TextAno");
            TextAno.value = "";
        }
    }

    return (
        <form className="form-inline" onSubmit={handleSubmit}>
            <input 
                id="TextAno" 
                type="search" 
                placeholder="Search per Year"
                aria-label="Search"
                onChange={handleChange}
                className="form-control mr-sm-2"/>
            <button type="submit" value="Search" className="btn btn-info m-2 my-sm-0">Search</button>
        </form>
    );
}
