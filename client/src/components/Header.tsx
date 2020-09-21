import React from 'react';
import { AppBar, Toolbar, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export const Header: React.FC<{}> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Auckland Transport Visualiser
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
