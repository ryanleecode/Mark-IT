import * as React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { GridSize } from '@material-ui/core/Grid';

interface Props {
  title: string;
  body: string;
  container: {
    left: GridSize;
    right: GridSize;
  };
}

export default class WWD extends React.Component<Props> {
  public render() {
    const {
      title,
      body,
      container: { left, right },
    } = this.props;
    return (
      <Grid container>
        <Grid item xs={left} />
        <Grid item xs={(12 - (left as number) - (right as number)) as GridSize}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              textAlign: 'center',
            }}
          >
            <Typography variant="title">
              <i>Welcome To Us</i>
            </Typography>
            <Typography variant="display2" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body1">{body}</Typography>
          </div>
        </Grid>
        <Grid item xs={right} />
      </Grid>
    );
  }
}
