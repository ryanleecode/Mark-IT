import * as React from 'react';
import GoogleMapReact, { ClickEventValue } from 'google-map-react';
import {
  CoffeeIconButton,
  LocationMarker,
  TransactionGraph,
} from '../components';
import { Grid, Tabs, Tab } from '@material-ui/core';
import { ResponsiveLine } from '@nivo/line';
import axios from 'axios';
import { AggregateData } from '../../api/data';

const generateChartData = (data: AggregateData | null) => {
  if (!data) {
    return null;
  }
  const newData = [
    {
      id: 'Analytics',
      color: 'hsl(175, 54%, 48%)',
      data: [
        {
          x: 'mm',
          y: data.Monday.morning,
        },
        {
          x: 'ma',
          y: data.Monday.noon,
        },
        {
          x: 'me',
          y: data.Monday.evening,
        },
        {
          x: 'tm',
          y: data.Tuesday.morning,
        },
        {
          x: 'tn',
          y: data.Tuesday.noon,
        },
        {
          x: 'te',
          y: data.Tuesday.evening,
        },
        {
          x: 'wm',
          y: data.Wednesday.morning,
        },
        {
          x: 'wn',
          y: data.Wednesday.noon,
        },
        {
          x: 'we',
          y: data.Wednesday.evening,
        },
        {
          x: 'Tm',
          y: data.Thursday.morning,
        },
        {
          x: 'Tn',
          y: data.Thursday.noon,
        },
        {
          x: 'Te',
          y: data.Thursday.evening,
        },
        {
          x: 'fm',
          y: data.Friday.morning,
        },
        {
          x: 'fn',
          y: data.Friday.noon,
        },
        {
          x: 'fe',
          y: data.Friday.evening,
        },
        {
          x: 'sm',
          y: data.Saturday.morning,
        },
        {
          x: 'sn',
          y: data.Saturday.noon,
        },
        {
          x: 'se',
          y: data.Saturday.evening,
        },
        {
          x: 'Sm',
          y: data.Sunday.morning,
        },
        {
          x: 'Sn',
          y: data.Sunday.noon,
        },
        {
          x: 'Se',
          y: data.Sunday.evening,
        },
      ],
    },
  ];
  return newData;
};

const arrayAverage = (arr: number[]) =>
  arr.reduce((total, num) => total + num) / arr.length;

interface Props2 {
  lat: number;
  lng: number;
  text: string;
}

interface Props {
  zoom: number;
}

interface State {
  location: {
    lat: number;
    lng: number;
  };
  tabIndex: number;
  data: AggregateData | null;
}

class GraphPage extends React.Component<Props, State> {
  public static defaultProps: Props = {
    zoom: 15,
  };

  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: 0,
        lng: 0,
      },
      tabIndex: 0,
      data: null,
    };

    this.getAnalytics = this.getAnalytics.bind(this);
  }

  public async getAnalytics(lat: number, lng: number) {
    const result: AggregateData = (await axios.get('/api/analytics', {
      headers: {
        lat,
        lng,
      },
    })).data.payload.result;

    this.setState({ data: result });
  }

  public render() {
    const {
      data,
      tabIndex,
      location: { lat, lng },
    } = this.state;
    const dataPoints = [
      {
        lat: 43.65884,
        lng: -79.39529,
      },
      {
        lat: 43.65591,
        lng: -79.38156,
      },
      {
        lat: 43.65857,
        lng: -79.38891,
      },
    ];
    return (
      <Grid container>
        <Grid item xs={5}>
          <div style={{ height: '85vh', width: '100%' }}>
            <GoogleMapReact
              onClick={({ x, y, lat: newLat, lng: newLng }) => {
                this.getAnalytics(lat, lng);
                this.setState({ location: { lat: newLat, lng: newLng } });
              }}
              defaultCenter={{
                lat: arrayAverage(dataPoints.map((x) => x.lat)),
                lng: arrayAverage(dataPoints.map((x) => x.lng)),
              }}
              bootstrapURLKeys={{
                key: process.env.GOOGLE_MAPS_API_KEY as string,
              }}
              defaultZoom={this.props.zoom}
            >
              {dataPoints.map((x) => (
                <CoffeeIconButton
                  key={`${x.lat}_${x.lng}`}
                  lat={x.lat}
                  lng={x.lng}
                />
              ))}
              <LocationMarker lat={lat} lng={lng} />
            </GoogleMapReact>
          </div>
        </Grid>
        <Grid item xs={7}>
          <div
            style={{ height: '85vh', marginLeft: '1em', marginRight: '1em' }}
          >
            <Tabs
              value={tabIndex}
              onChange={(_, value) => this.setState({ tabIndex: value })}
              indicatorColor="primary"
              textColor="primary"
              scrollable
              scrollButtons="auto"
            >
              <Tab label="Traffic" />
              <Tab label="Demographics" />
            </Tabs>
            {(() => {
              switch (tabIndex) {
                case 0:
                  return (
                    <TransactionGraph chartData={generateChartData(data)} />
                  );
                default:
                  return null;
              }
            })()}
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default GraphPage;
