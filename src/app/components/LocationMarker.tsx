import * as React from 'react';

interface Props {
  lat: number;
  lng: number;
}

class LocationMarker extends React.Component<Props> {
  public render() {
    return (
      <div>
        <img
          src={'location_marker.png'}
          style={{
            width: '24px',
            height: '24px',
            left: '-12px',
            top: '-12px',
            position: 'relative',
          }}
        />
      </div>
    );
  }
}

export default LocationMarker;
