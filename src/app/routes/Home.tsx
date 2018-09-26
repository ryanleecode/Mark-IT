import * as React from 'react';
import { Header } from '../components';
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  Grid,
  Typography,
  GridList,
  GridListTile,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Button,
} from '@material-ui/core';
import WWD from '../components/WWD';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import Slider from 'react-slick';
import { pxToEm } from '../util';

const styles = ({ spacing, breakpoints, palette }: Theme) =>
  createStyles({
    background: {
      width: '100vh',
      height: '70vh',
      backgroundImage: 'url(home_background.jpeg)',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
    },
    container: {
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: spacing.unit * 2,
      [breakpoints.up('lg')]: {
        maxWidth: '71.250em',
      },
    },
    button: {
      paddingTop: `${pxToEm(spacing.unit * 2)}em`,
      paddingBottom: `${pxToEm(spacing.unit * 2)}em`,
      paddingLeft: `${pxToEm(spacing.unit * 1.875)}em`,
      paddingRight: `${pxToEm(spacing.unit * 1.875)}em`,
      marginRight: `${pxToEm(spacing.unit)}em`,
    },
    buttonContainer: {},
  });

interface Props extends WithStyles<typeof styles> {}

class Home extends React.Component<Props> {
  public render() {
    const { classes } = this.props;
    return (
      <div>
        <section className={classes.background}>
          <Grid container>
            <Grid item xs={6}>
              <div className={classes.container}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="display2">
                    Better Consulting for Smart Businesses
                  </Typography>
                  <div>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                    >
                      New Business
                    </Button>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                    >
                      Existing Business
                    </Button>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={6} />
          </Grid>
        </section>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
