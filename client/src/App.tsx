import React from 'react';
import { VehicleMap } from './components/VehicleMap';
import { Header } from './components/Header';

const App: React.FC<{}> = () => {
  return (
    <div>
      <Header />
      <VehicleMap />
    </div>
  );
};

export default App;
