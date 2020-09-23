import React from 'react';

import { VehicleMap } from './components/VehicleMap';
import { Header } from './components/Header';
import { RouteContext } from './common/contexts/RouteContext';

const App: React.FC<{}> = () => {
  const [route, setRoute] = React.useState<string>('');

  return (
    <RouteContext.Provider value={{ route, setRoute }}>
      <Header />
      <VehicleMap />
    </RouteContext.Provider>
  );
};

export default App;
