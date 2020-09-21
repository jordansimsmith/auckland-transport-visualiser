import React from 'react';
import { VehicleMap } from './components/VehicleMap';

const App: React.FC<{}> = () => {
  return (
    <div>
      <h1>Auckland Transport Visualiser</h1>
      <VehicleMap />
    </div>
  );
};

export default App;
