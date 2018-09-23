import DevTools from 'mobx-react-devtools';
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes';
import { Header } from './components';
import Amplify, { Auth } from 'aws-amplify';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import aws_exports from '../aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

Amplify.configure(aws_exports);

const createDevTools = () => {
  if (process.env.NODE_ENV === 'development') {
    return <DevTools />;
  }
  return null;
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00324C',
    },
    secondary: { main: '#C6C6C6' },
  },
});

const App = () => (
  <div>
    {/* {createDevTools()} */}
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </MuiThemeProvider>
  </div>
);
export default hot(module)(withAuthenticator(App));
