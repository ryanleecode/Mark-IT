import DevTools from 'mobx-react-devtools';
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes';
import { Header } from './components';

const createDevTools = () => {
  if (process.env.NODE_ENV === 'development') {
    return <DevTools />;
  }
  return null;
};

const App = () => (
  <div>
    {createDevTools()}
    <Header />
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </div>
);
export default hot(module)(App);
