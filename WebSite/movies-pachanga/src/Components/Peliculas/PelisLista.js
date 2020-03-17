import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';

function PeliLista (props) {
    const {history, guardarRecargar, peli} = props;

    const eliminarPeli = id => {
        console.log('eliminando', id);

        Swal.fire({
            title: 'Estas Seguro?',
            text: "Un comentario eliminado no se puede recuperar",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sisas, Borralo!',
            cancelButtonText: 'Nonas, Dejalo Sano'
        }).then(async (result) => {
            if (result.value) {
                try{
                    const url = `http://localhost:4000/restaurant/${id}`;

                    const resultado = await axios.delete(url);

                    if(resultado.status === 200) {
                        Swal.fire(
                            'Lo Borraste!',
                            'Si pilla que lo Borro?.',
                            'success'
                        );
                    }
                }catch (ex) {
                    console.log(ex);
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Hubo un Error, Vuelve a Intentarlo'
                    });
                }
                
                //redirect
                guardarRecargar(true);
                history.push('/pelis');
            }
        })
    }

    return (
        <li 
            data-categoria={peli.categoria}
            className="list-group-item d-flex justify-content-between align-items-center"
        >
            <p>
                {peli.nombrePlatillo}   {" "}
                <span className="font-weight-bold">$ {peli.precioPlatillo}</span>
            </p>
            <div>
                <Link
                    to={`/pelis/editar/${peli.id}`}
                    className="btn btn-sucess mr-2"
                >
                    Editar
                </Link>

                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={()=> eliminarPeli(peli.id)}
                >
                    Eliminar &times;
                </button>
            </div>
        </li>
    );
}

export default withRouter(PeliLista);