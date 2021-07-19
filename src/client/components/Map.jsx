import React, { useState, useMemo, useEffect } from 'react';
import { GoogleMap, OverlayView, useLoadScript } from '@react-google-maps/api';
import styled from 'styled-components';
import MapMarkerPin from './MapMarkerPin';

const Title = styled.h3`
  text-align: center;
`;

const DEFAULT_CENTER = {
  lat: -32.9269165,
  lng: 151.7607144,
};

const Map = ({ data, date, numRides }) => {
  const [mapInstance, setMapInstance] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: '',
  });
  const title = useMemo(() => {
    return date && numRides !== undefined ? `${date} ${numRides}` : 'No Data';
  }, [date, numRides]);

  useEffect(() => {
    if (title && title !== 'No Data') {
      document.title = title;
    }
  }, [title]);

  const onMapLoad = (map) => {
    setMapInstance(map);
  };

  return (
    <>
      <Title>{title}</Title>
      {isLoaded && (
        <GoogleMap
          center={DEFAULT_CENTER}
          onLoad={onMapLoad}
          mapContainerStyle={{
            height: '400px',
            width: '800px',
          }}
          zoom={16}
        >
          {data &&
            data.length &&
            data.map((trip) => (
              <OverlayView
                key={`${trip.id}_${trip.stop.id}`}
                position={{
                  lat: trip.stop.address.latitude,
                  lng: trip.stop.address.longitude,
                }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <MapMarkerPin type={trip.stop.type} />
              </OverlayView>
            ))}
        </GoogleMap>
      )}
    </>
  );
};

export default Map;
