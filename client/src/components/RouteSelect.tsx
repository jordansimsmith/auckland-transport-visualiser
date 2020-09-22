import React from 'react';
import axios from 'axios';
import { TextField, Paper } from '@material-ui/core';

export const RouteSelect: React.FC<{}> = () => {
  const [routeShortName, setRouteShortName] = React.useState<string>();
  const [routes, setRoutes] = React.useState();

  React.useEffect(() => {
    if (!routeShortName) {
      return;
    }

    const url = `http://localhost:5000/routes?shortName=${routeShortName}`;
    axios
      .get(url)
      .then((response) => setRoutes(response.data.response))
      .catch((error) => console.error(error));
  }, [routeShortName]);

  return (
    <div>
      <Paper>
        <TextField
          variant="filled"
          label="Route Number"
          value={routeShortName}
          onChange={(e) => setRouteShortName(e.target.value)}
        />
      </Paper>
    </div>
  );
};
