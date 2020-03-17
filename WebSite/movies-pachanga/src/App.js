import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from 'axios';

import Header from './Components/Header';
import Pelis from './Components/Peliculas/Pelis';
import APIConfigs from './Utils/MoviesAPI';

function App() {
  const [ano, guardarAno] = useState(APIConfigs.config.yearSince);
  const [pelis, guardarPelis] = useState([]);
  const [recargar, guardarRecargar] = useState(true);

  useEffect(() => {
    if(recargar){
      const consultarAPI = async () => {
        //consultar la API de json-server
        const resultado = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${APIConfigs.config.application_id}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${APIConfigs.config.page}&year=${ano}`);

        console.log(resultado.data.results);
        guardarPelis(resultado.data.results);
      }
      
      consultarAPI();

      //cambiar a false la recarga de productos para no crear una bucla infinita
      guardarRecargar(false);
    }
  },[recargar]);

  return (
    <Router>
      <Header />
      <main className="container mt-5">
        <Switch>
            <Route 
              exact path="/" 
              render={ () => (
                <Pelis 
                  pelis={pelis}
                  ano={ano}
                  anoDesde={APIConfigs.config.yearSince}
                  anoHasta={APIConfigs.config.yearTo}
                  guardarAno={guardarAno}
                  guardarRecargar={guardarRecargar}
                />
              )}
            />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
