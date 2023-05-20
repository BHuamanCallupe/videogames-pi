import React from 'react';
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { Landing, Home, Form } from "./views";
import style from "./App.module.css"

function App() {

  return (
    <div className={style.color}>
      <Route exact path="/" render={() => <Landing />} />
      <Route exact path="/home" render={() => <Home />} />
      <Route exact path="/form" render={() => <Form />} />
    </div>
  );
}

export default App;
