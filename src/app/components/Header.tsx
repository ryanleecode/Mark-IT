import * as React from 'react';
import {
  AppBar,
  Toolbar,
  Grid,
  createStyles,
  WithStyles,
  withStyles,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = () =>
  createStyles({
    container: {
      // position: 'absolute',
      width: '100%',
      zIndex: 1000,
      marginBottom: '6px',
    },
    appBar: {
      height: '5em',
      boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    },
    ul: {
      listStyle: 'none',
    },
    link: {
      textDecoration: 'none',
    },
  });

interface Props extends WithStyles<typeof styles> {}
class Header extends React.Component<Props> {
  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Grid className={classes.appBar} container>
          <Grid item xs={1} />
          <Grid
            item
            xs={10}
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Link className={classes.link} to="/">
                <Typography
                  variant="button"
                  style={{ textTransform: 'capitalize', fontSize: '1rem' }}
                >
                  Home
                </Typography>
              </Link>
            </div>
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
