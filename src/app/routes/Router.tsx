import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';

export default () => (
  <main>
    <Switch>
      <Route path="/" exact component={Home} />
    </Switch>
  </main>
);
