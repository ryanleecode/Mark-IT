import * as React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';

export default class Header extends React.Component {
  public render() {
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <div />
        </Toolbar>
      </AppBar>
    );
  }
}
