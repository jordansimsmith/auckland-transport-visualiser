import React from 'react';

interface RouteContextValue {
  route: string;
  setRoute(route: string): void;
}

export const RouteContext = React.createContext<Partial<RouteContextValue>>({});
