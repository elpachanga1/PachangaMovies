import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from 'axios';

import Header from './Components/Header';
import Pelis from './Components/Peliculas/Pelis';
import PaginatorArrows from './Components/PaginatorArrows';
import APIConfigs from './Utils/MoviesAPI';

function App() {
  const [ano, guardarAno] = useState(APIConfigs.config.yearSince);
  const [pelis, guardarPelis] = useState([]);
  const [recargar, guardarRecargar] = useState(true);
  const [paginaActual, guardarPaginaActual] = useState(1);
  const [paginasTotales, guardarPaginasTotales] = useState(1);

  useEffect(() => {
    if(recargar){
      const consultarAPI = async () => {
        //consultar la API de json-server
        const resultado = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${APIConfigs.config.application_id}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${paginaActual}&year=${ano}`);

        console.log(resultado.data);
        guardarPelis(resultado.data.results);
        guardarPaginasTotales(resultado.data.total_pages);
        
        //mover usuario a la parte superior de la pantalla
        //jumbotron es una clase de bootstrap que maneja el scroll
        const jumbotron = document.querySelector('.jumbotron');
        jumbotron.scrollIntoView({behavior : 'smooth', block: 'start'});
      }
      
      consultarAPI();

      //cambiar a false la recarga de productos para no crear una bucla infinita
      guardarRecargar(false);
    }
  },[recargar]);

  return (
    <Router>
      <Header 
        ano={ano}
        anoDesde={APIConfigs.config.yearSince}
        anoHasta={APIConfigs.config.yearTo}
        guardarAno={guardarAno}
        guardarRecargar={guardarRecargar}
      />

      <main className="container mt-5">
        <div className="jumbotron">
          <Switch>
              <Route 
                exact path="/" 
                render={ () => (
                  <Pelis 
                    pelis={pelis}
                    guardarRecargar={guardarRecargar}
                  />
                )}
              />
          </Switch>
        </div>
      </main>

      <PaginatorArrows
        paginaActual={paginaActual}
        guardarPaginaActual={guardarPaginaActual}
        paginasTotales={paginasTotales} 
        guardarRecargar={guardarRecargar}
      />
    </Router>
  );
}

export default App;
