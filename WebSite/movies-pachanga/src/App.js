import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./Components/General/Header";
import Peliculas from "./Components/Peliculas/";
import Comentarios from "./Components/Comentarios/";

const App = () => (
  <Router>
    <Header />
    <main className="container mt-5">
      <div className="jumbotron">
        <Switch>
          <Route exact path="/" component={Peliculas} />
          <Route exact path="/pelis/:key" component={Comentarios} />
          <Route exact path="/logout" component={Peliculas} />
          <Route exact path="/login" component={Peliculas} />
          <Route exact path="/signup" component={Peliculas} />
        </Switch>
      </div>
    </main>
  </Router>
);

export default App;
