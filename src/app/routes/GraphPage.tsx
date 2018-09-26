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
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
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
  gender: string | null;
  frames: google.maps.Polygon[];
  googleMap: any;
  income: number | null;
}

interface FilterParam {
  age?: number;
  gender?: 'Male' | 'Female' | 'Other' | 'Any';
  income?: number;
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
      gender: 'Any',
      income: null,
    };

    this.getAnalytics = this.getAnalytics.bind(this);
    this.getFilters = this.getFilters.bind(this);
  }

  public async getAnalytics(lat: number, lng: number) {
    const result: AggregateData = (await axios.get('/api/analytics', {
      headers: {
        lat,
        lng,
        'Access-Control-Allow-Origin': '*',
      },
    })).data.payload.result;

    this.setState({ data: result });
  }

  public async getFilters(filter: AnalyticsFilter) {
    const { age, gender, income } = filter;
    const result: AggregateData[] = (await axios.get('/api/filter', {
      headers: {
        age,
        gender,
        income,
        'Access-Control-Allow-Origin': '*',
      },
    })).data.payload;

    return result;
  }

  public render() {
    const {
      age,
      gender,
      income,
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
        <Grid item xs={6}>
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
                value={age || ''}
                onChange={(event) => {
                  this.setState({
                    age: event.target.value as any,
                  });
                  this.updatePolygons({ age: event.target.value as any });
                }}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                margin="normal"
              />
            </ExpansionPanelDetails>
            <ExpansionPanelDetails>
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  aria-label="Gender"
                  name="gender"
                  value={gender || undefined}
                  onChange={(event) => {
                    this.setState({
                      gender: (event.target as any).value as any,
                    });
                    this.updatePolygons({
                      gender: (event.target as any).value,
                    });
                  }}
                >
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="Other"
                    control={<Radio />}
                    label="Other"
                  />
                  <FormControlLabel
                    value="Any"
                    control={<Radio />}
                    label="Any"
                  />
                </RadioGroup>
              </FormControl>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails>
              <TextField
                id="standard-number"
                label="Income"
                value={income || ''}
                onChange={(event) => {
                  this.setState({
                    income: event.target.value as any,
                  });
                  this.updatePolygons({ income: event.target.value as any });
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
              {/* {dataPoints.map((x) => (
                <CoffeeIconButton
                  key={`${x.lat}_${x.lng}`}
                  lat={x.lat}
                  lng={x.lng}
                />
              ))} */}
              <LocationMarker lat={lat} lng={lng} />
            </GoogleMapReact>
          </div>
        </Grid>
        <Grid item xs={6}>
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
  public async updatePolygons(params: FilterParam) {
    const filteredAreas: AggregateData[] = ((await this.getFilters({
      age: params.age || this.state.age || undefined,
      gender: params.gender || (this.state.gender as any) || undefined,
      income: params.income || (this.state.income as any) || undefined,
    })) as any).result;

    const { frames } = this.state;
    frames.forEach((x) => x.setMap(null));
    const polygons = filteredAreas.map((x) => {
      const coordinates = [
        { lat: x.min_lat, lng: x.min_lon },
        { lat: x.max_lat, lng: x.min_lon },
        { lat: x.max_lat, lng: x.max_lon },
        { lat: x.min_lat, lng: x.max_lon },
      ];
      let color = '#FEE744';
      if (x.Wednesday.noon > 1000) {
        color = '#FFBE37';
      }
      if (x.Wednesday.noon < 500) {
        color = '#6144FE';
      }
      if (x.Wednesday.noon > 2000) {
        color = '#CB227E';
      }
      return new this.state.googleMap.maps.Polygon({
        map: this.state.googleMap.map,
        paths: coordinates,
        strokeColor: color,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: color,
        fillOpacity: 0.25,
        draggable: false,
        editable: false,
        geodesic: false,
      });
    });
    this.setState({
      frames: polygons,
    });
  }
}

export default GraphPage;
