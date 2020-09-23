import React from 'react';
import DeckGL, { IconLayer } from 'deck.gl';
import axios from 'axios';
import useInterval from 'react-useinterval';
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

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
};

export const VehicleMap: React.FC<{}> = () => {
  const { route } = React.useContext(RouteContext);

  const [locations, setLocations] = React.useState<any[]>([]); // TODO: typing

  const fetchLocations = () => {
    if (!route) {
      return;
    }

    // TODO: api url environment variable
    const url = `http://localhost:5000/locations?routeId=${route}`;
    return axios
      .get(url)
      .then((response) => setLocations(response.data.response.entity))
      .catch((error) => console.error(error));
  };

  // fetch data on route change
  React.useEffect(() => {
    fetchLocations();
  }, [route]);

  // poll for updates every 30 seconds
  useInterval(fetchLocations, 30_000);

  const layers = [
    // TODO: more intelligent rendering of the icons
    new IconLayer({
      id: 'vehicle-locations',
      data: locations,
      getPosition: (d: any) => [
        d.vehicle.position.longitude,
        d.vehicle.position.latitude,
      ],
      iconAtlas:
        'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
      iconMapping: ICON_MAPPING,
      getIcon: (_d) => 'marker',
      sizeScale: 15,
      getSize: (_d) => 5,
      getColor: (_d) => [63, 81, 181],
    }),
  ];

  return (
    <DeckGL
      controller={true}
      initialViewState={INITIAL_VIEW_STATE}
      layers={layers}
    >
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
