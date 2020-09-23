import React from 'react';
import axios from 'axios';
import { TextField, Paper, makeStyles, Grid } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { RouteContext } from '../common/contexts/RouteContext';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
}));

export const RouteSelect: React.FC<{}> = () => {
  const [routeShortName, setRouteShortName] = React.useState<string>();
  const [routes, setRoutes] = React.useState<any[]>([]); // TODO: typings

  const { setRoute } = React.useContext(RouteContext);

  const classes = useStyles();

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
    <div className={classes.root}>
      <Grid container={true} spacing={1}>
        <Grid item={true} xs={4}>
          <Paper>
            <TextField
              variant="filled"
              label="Route Number"
              value={routeShortName}
              onChange={(e) => setRouteShortName(e.target.value)}
              fullWidth={true}
            />
          </Paper>
        </Grid>

        <Grid item={true} xs={8}>
          <Paper>
            <Autocomplete
              options={routes}
              getOptionLabel={(option) => option.route_long_name}
              onChange={(_e, value) => setRoute && setRoute(value.route_id)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Route Selector"
                  variant="filled"
                  fullWidth={true}
                />
              )}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
