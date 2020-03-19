import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./Components/General/Header";
import Peliculas from "./Components/Peliculas/";

const App = () => (
  <Router>
    <Header />
    <main className="container mt-5">
      <div className="jumbotron">
        <Switch>
          <Route exact path="/" component={Peliculas} />
        </Switch>
      </div>
    </main>
  </Router>
);

export default App;
