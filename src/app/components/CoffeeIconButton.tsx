import * as React from 'react';
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  Button,
} from '@material-ui/core';
import { pxToEm } from '../util';

const styles = ({ spacing, breakpoints, palette }: Theme) =>
  createStyles({
    icon: {
      width: `${pxToEm(spacing.unit * 6)}em`,
    },
    button: {
      boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    },
  });

interface Props extends WithStyles<typeof styles> {
  lat: number;
  lng: number;
}

class CoffeeIconButton extends React.Component<Props> {
  public render() {
    const { classes } = this.props;
    return (
      <div>
        <Button className={classes.button} variant="fab" color="secondary">
          <img className={classes.icon} src={'coffee_cup_icon.svg'} />
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(CoffeeIconButton);
