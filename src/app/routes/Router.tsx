import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from '../components';
import Home from './Home';
import GraphPage from './GraphPage';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';

const styles = ({ spacing, breakpoints }: Theme) =>
  createStyles({
    container: {
      marginLeft: 'auto',
      marginRight: 'auto',
      height: '70vh',
      paddingLeft: spacing.unit * 2,
      paddingRight: spacing.unit * 2,
      [breakpoints.up('lg')]: {
        maxWidth: '80.000em',
      },
      [breakpoints.up('xl')]: {
        maxWidth: '105.000em',
      },
    },
  });

interface Props extends WithStyles<typeof styles> {}

class Router extends React.Component<Props> {
  public render() {
    const { classes } = this.props;
    return (
      <main>
        <Header />
        <Switch>
          <Route path="/" exact component={GraphPage} />
          {/* <Route path="/analytics" component={GraphPage} /> */}
        </Switch>
      </main>
    );
  }
}

export default withStyles(styles)(Router);
