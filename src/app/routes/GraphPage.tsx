import * as React from 'react';
import GoogleMapReact, { ClickEventValue } from 'google-map-react';
import {
  CoffeeIconButton,
  LocationMarker,
  TransactionGraph,
  DemographicsGraph,
} from '../components';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import {
  Grid,
  Tabs,
  Tab,
  Divider,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  TextField,
} from '@material-ui/core';
import { ResponsiveLine } from '@nivo/line';
import axios from 'axios';
import { AggregateData } from '../../api/data';
import { generateTrafficData, generateDemographicsData } from '../util';
import { AnalyticsFilter } from '../../api';

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

interface HighlightFrame {
  bottomLeft: number;
  topLeft: number;
  topRight: number;
  bottomRight: number;
}

interface State {
  location: {
    lat: number;
    lng: number;
  };
  tabIndex: number;
  data: AggregateData | null;
  age: number | null;
  frames: google.maps.Polygon[];
  googleMap: any;
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
      age: null,
      frames: [],
      googleMap: null,
    };

    this.getAnalytics = this.getAnalytics.bind(this);
    this.getFilters = this.getFilters.bind(this);
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

  public async getFilters(filter: AnalyticsFilter) {
    const { age } = filter;
    const result: AggregateData[] = (await axios.get('/api/filter', {
      headers: {
        age,
      },
    })).data.payload;

    return result;
  }

  public render() {
    const {
      age,
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
          <ExpansionPanel
            style={{
              position: 'absolute',
              zIndex: 1000,
              left: '1em',
              top: '6em',
              width: '40vh',
            }}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="title">Filter</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <TextField
                id="standard-number"
                label="Age"
                value={age || undefined}
                onChange={async () => {
                  const filteredAreas = ((await this.getFilters({
                    age: age || undefined,
                  })) as any).result;

                  const polygons = filteredAreas.map((x) => {
                    const coordinates = [
                      { lat: x.min_lat, lng: x.min_lon },
                      { lat: x.min_lat, lng: x.max_lon },
                      { lat: x.min_lon, lng: x.min_lat },
                      { lat: x.min_lon, lng: x.max_lat },
                    ];
                    return new this.state.googleMap.maps.Polygon({
                      map: this.state.googleMap.map,
                      paths: coordinates,
                      strokeColor: '#0000FF',
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                      fillColor: '#0000FF',
                      fillOpacity: 0.35,
                      draggable: true,
                      editable: true,
                      geodesic: false,
                    });
                  });
                  this.setState({ age, frames: polygons });
                }}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                margin="normal"
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <div style={{ height: '85vh', width: '100%' }}>
            <GoogleMapReact
              onClick={({ x, y, lat: newLat, lng: newLng }) => {
                this.getAnalytics(lat, lng);
                this.setState({ location: { lat: newLat, lng: newLng } });
              }}
              onGoogleApiLoaded={(map) => this.setState({ googleMap: map })}
              defaultCenter={{
                lat: arrayAverage(dataPoints.map((x) => x.lat)),
                lng: arrayAverage(dataPoints.map((x) => x.lng)),
              }}
              yesIWantToUseGoogleMapApiInternals
              bootstrapURLKeys={{
                libraries: 'places',
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
            <Divider style={{ marginTop: '1em' }} />
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
            <Divider />
            {(() => {
              switch (tabIndex) {
                case 0:
                  return (
                    <TransactionGraph chartData={generateTrafficData(data)} />
                  );
                  break;
                case 1:
                  return (
                    <DemographicsGraph
                      chartData={generateDemographicsData(data)}
                    />
                  );
                  break;
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
