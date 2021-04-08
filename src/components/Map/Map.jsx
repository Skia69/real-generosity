import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const mapStyles = {
  height: '400px',
  width: '100%',
};

const Map = ({ currentPosition, setCurrentPosition }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const render = React.useRef(0);
  console.log('Map.jsx has re-rendered: ', render.current++);

  // const [clickedLatLng, setClickedLatLng] = useState(null);
  const [center, setCenter] = useState({ lat: 34.4346, lng: 35.8362 });

  useEffect(() => {
    const success = () => {
      setCurrentPosition(center);
    };
    navigator.geolocation.getCurrentPosition(success);
  }, [center, setCurrentPosition]);

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={11}
        center={center}
        onClick={(e) => {
          // setClickedLatLng(e.latLng.toJSON());
          setCenter(e.latLng.toJSON());
        }}
      >
        {currentPosition.lat ? (
          <Marker position={currentPosition} draggable={true} />
        ) : null}
      </GoogleMap>
      {/* {currentPosition && (
        <h3>
          Current Position: {currentPosition.lat}, {currentPosition.lng}
        </h3>
      )} */}
    </>
  ) : (
    <>map is loading...</>
  );
};

export default React.memo(Map);
