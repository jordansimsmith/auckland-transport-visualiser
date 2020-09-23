import React from 'react';
import DeckGL from 'deck.gl';
import axios from 'axios';
import { StaticMap } from 'react-map-gl';
import { RouteContext } from '../common/contexts/RouteContext';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const INITIAL_VIEW_STATE = {
  longitude: 174.76,
  latitude: -36.85,
  zoom: 13,
  pitch: 45,
  bearing: 0,
};

export const VehicleMap: React.FC<{}> = () => {
  const { route } = React.useContext(RouteContext);

  const [_locations, setLocations] = React.useState<any[]>([]); // TODO: typing
  React.useEffect(() => {
    if (!route) {
      return;
    }

    // TODO: api url environment variable
    const url = `http://localhost:5000/locations?routeId=${route}`;
    axios
      .get(url)
      .then((response) => setLocations(response.data.response.entity))
      .catch((error) => console.error(error));
  }, [route]);

  return (
    <DeckGL controller={true} initialViewState={INITIAL_VIEW_STATE}>
      <StaticMap
        reuseMaps={true}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        preventStyleDiffing={true}
      />
    </DeckGL>
  );
};
