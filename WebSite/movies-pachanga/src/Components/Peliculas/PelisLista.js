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
                history.push('/');
            }
        })
    }

    return (
        <li 
            data-categoria={peli.original_title}
            className="list-group-item d-flex justify-content-between align-items-center"
        >
            <img
                className="p-3" 
                src={`https://image.tmdb.org/t/p/w200/${peli.backdrop_path}`} 
                alt="imagen"/>
            
            <div className="row p-1">
                <div className="col-md-10 col-sm-12">
                    <h4>{peli.title}</h4>
                    <p>
                        <span className="font-weight-bold">Average: {peli.vote_average}</span>
                        <br/>
                        {peli.overview}
                    </p>
                </div>
                
                <div className="col-2">
                    <Link
                        to={`/pelis/${peli.id}`}
                        className="btn btn-info mr-2"
                    >
                        See More
                    </Link>
                </div>
            </div>
        </li>
    );
}

export default withRouter(PeliLista);