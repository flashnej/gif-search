import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomeContainer from "./containers/HomeContainer"

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomeContainer} />
      </Switch>
    </BrowserRouter>
  );
}

export default App
