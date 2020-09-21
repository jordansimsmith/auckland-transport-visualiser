export interface RouteResponse {
  response: Route[];
}

interface Route {
  route_id: string;
  route_short_name: string;
  route_long_name: string;
}

export interface TripResponse {
  response: Trip[];
}

interface Trip {
  route_id: string;
  trip_id: string;
  trip_headsign: string;
}

export interface LocationResponse {
  response: {
    entity: Entity[];
  };
}

interface Entity {
  id: string;
  vehicle: {
    trip: {
      trip_id: string;
      route_id: string;
    };
  };
}
