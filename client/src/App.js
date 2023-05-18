import React from 'react';
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { Landing, Home, Detail, Form } from "./views";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { Navbar } from './components';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <Navbar />}
      <Route exact path="/" render={() => <Landing />} />
      <Route exact path="/home" render={() => <Home />} />
      <Route exact path="/form" render={() => <Form />} />
    </div>
  );
}

export default App;
