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

const expansionPanelItems = [
  {
    title: 'Illustration The right team for your project.',
    body:
      'There are many variations of passages of Lorem Ipsum available but the about majority a have suffered alteration in some form by injected humour or that a randomized even slightly believable.',
  },
  {
    title: 'We Are help you to Grow your business',
    body:
      'There are many variations of passages of Lorem Ipsum available but the about majority a have suffered alteration in some form by injected humour or that a randomized even slightly believable.',
  },
  {
    title: 'The perfect Saas and WebApp template',
    body:
      'There are many variations of passages of Lorem Ipsum available but the about majority a have suffered alteration in some form by injected humour or that a randomized even slightly believable.',
  },
  {
    title: 'Awesome, Clean, Powerful, and Creative',
    body:
      'There are many variations of passages of Lorem Ipsum available but the about majority a have suffered alteration in some form by injected humour or that a randomized even slightly believable.',
  },
];

const styles = ({ spacing, breakpoints, palette }: Theme) =>
  createStyles({
    belowHeader: {
      height: spacing.unit * 10,
    },
    belowWelcome: {
      height: spacing.unit * 5,
    },
    container: {
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: spacing.unit * 2,
      [breakpoints.up('lg')]: {
        maxWidth: '71.250em',
      },
    },
    altBackground: {
      background: '#f2f2f2',
    },
  });

interface Props extends WithStyles<typeof styles> {}

class Home extends React.Component<Props> {
  public render() {
    const { classes } = this.props;
    const tileData = [
      'Good Approach',
      'Great Ideas',
      'Save Money',
      'Easy Customize',
      'Detailed Report',
      'Marketing Plan',
    ];
    return (
      <div>
        <div>
          <div className={classes.container}>
            <div className={classes.belowHeader} />
            <WWD
              title="Top Consulting Agency"
              body="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form by injected humour or randomized words which even slightly believable."
              container={{ left: 2, right: 2 }}
            />
            <div className={classes.belowWelcome} />
            <Grid container>
              <Grid item xs={6}>
                <GridList cols={3}>
                  {tileData.map((tile) => (
                    <GridListTile key={tile} cols={1}>
                      <p>{tile}</p>
                    </GridListTile>
                  ))}
                </GridList>
              </Grid>
              <Grid item xs={6} />
            </Grid>
            <div className={classes.belowHeader} />
          </div>
        </div>
        <div className={classes.altBackground}>
          <div className={classes.container}>
            <div className={classes.belowHeader} />
            <WWD
              title="Welcome To Our Consulting Agency"
              body="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form by injected humour or randomized words which even slightly believable."
              container={{ left: 1, right: 2 }}
            />
            <div className={classes.belowWelcome} />
            <Grid container>
              <Grid item xs={6}>
                <div>
                  {expansionPanelItems.map((x, idx) => (
                    <ExpansionPanel key={idx} style={{ marginBottom: '1em' }}>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subheading">{x.title}</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography>{x.body}</Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  ))}
                  <div className={classes.belowWelcome} />
                  <div style={{ display: 'flex' }}>
                    <Button variant="outlined" component="span" color="primary">
                      Contact Us
                    </Button>
                  </div>
                </div>
              </Grid>
              <Grid item xs={6} />
            </Grid>
          </div>
        </div>
        <div>
          <div className={classes.container}>
            <div className={classes.belowHeader} />
            <WWD
              title="Case Studios: Business Consulting"
              body="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form by injected humour or randomized words which even slightly believable."
              container={{ left: 2, right: 2 }}
            />
            <div className={classes.belowWelcome} />
            <Slider dots>
              <div>
                <Grid container>
                  <Grid item xs={6} />
                  <Grid item xs={6}>
                    <Typography variant="title">Case 02</Typography>
                  </Grid>
                </Grid>
              </div>
              <div>
                <h1>LOL</h1>
              </div>
              <div>
                <h1>LOL</h1>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
