import React from 'react';
import DeckGL from 'deck.gl';
import { StaticMap } from 'react-map-gl';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const INITIAL_VIEW_STATE = {
  longitude: 174.76,
  latitude: -36.85,
  zoom: 13,
  pitch: 45,
  bearing: 0,
};

export const VehicleMap: React.FC<{}> = () => {
  return (
    <DeckGL controller={true} initialViewState={INITIAL_VIEW_STATE}>
      <StaticMap
        reuseMaps={true}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/dark-v9"
      />
    </DeckGL>
  );
};
