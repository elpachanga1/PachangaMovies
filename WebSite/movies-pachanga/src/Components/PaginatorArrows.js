import React from 'react';

export default function({paginaActual, guardarPaginaActual, paginasTotales, guardarRecargar}){
    
    const paginaAnterior = () => {
        guardarPaginaActual(paginaActual - 1);
        guardarRecargar(true);
    }

    const paginaSiguiente = () => {
        guardarPaginaActual(paginaActual + 1);
        guardarRecargar(true);
    }

    return (
        <div className="row justify-content-center">
            { 
                //controla la aparicion del boton anterior si esta en la pagina 1
                (paginaActual === 1) 
                ? null 
                : (<button onClick={paginaAnterior} type="button" className="btn btn-info mr-1">&laquo; Anterior</button>)
            }
            
            {
                //controla la aparicion del boton siguiente si esta en la ultima pagina
                (paginaActual === paginasTotales)
                ? null
                : (<button onClick={paginaSiguiente} type="button" className="btn btn-info">Siguiente &raquo;</button>)
            }
        </div>
    );
}
