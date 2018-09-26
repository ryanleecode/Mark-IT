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
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={'logo.png'}
                style={{ backgroundSize: 'contain', maxHeight: '4em' }}
              />
              <div style={{ width: '1em' }} />
              <Typography
                style={{ display: 'flex', alignItems: 'center' }}
                variant="title"
              >
                MarkITplace (Coffee and Foodchains)
              </Typography>
              <img
                src={'coffee_cup_icon.svg'}
                style={{ backgroundSize: 'contain', maxHeight: '4em' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="subheading" style={{ paddingRight: '1em' }}>
                Low Density
              </Typography>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  paddingRight: '1em',
                }}
              >
                <svg height="24" width="24">
                  <circle
                    cx="12"
                    cy="12"
                    r="24"
                    stroke="#6144FE"
                    stroke-width="3"
                    fill="#6144FE"
                  />
                </svg>
              </div>
              <Typography variant="subheading" style={{ paddingRight: '1em' }}>
                Medium Density
              </Typography>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  paddingRight: '1em',
                }}
              >
                <svg height="24" width="24">
                  <circle
                    cx="12"
                    cy="12"
                    r="24"
                    stroke="#FEE744"
                    stroke-width="3"
                    fill="#FEE744"
                  />
                </svg>
              </div>
              <Typography variant="subheading" style={{ paddingRight: '1em' }}>
                High Density
              </Typography>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  paddingRight: '1em',
                }}
              >
                <svg height="24" width="24">
                  <circle
                    cx="12"
                    cy="12"
                    r="24"
                    stroke="#FFBE37"
                    stroke-width="3"
                    fill="#FFBE37"
                  />
                </svg>
              </div>
              <Typography variant="subheading" style={{ paddingRight: '1em' }}>
                Concentrated Density
              </Typography>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <svg height="24" width="24">
                  <circle
                    cx="12"
                    cy="12"
                    r="24"
                    stroke="#CB227E"
                    stroke-width="3"
                    fill="#CB227E"
                  />
                </svg>
              </div>
            </div>
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
