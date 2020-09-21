import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

import { RouteResponse, TripResponse, LocationResponse } from './types/types';

dotenv.config();

const port = process.env.PORT || 5000;
const apiKey = process.env.AT_API_KEY;

const app = express();
app.use(cors());

app.get('/routes', async (req, res) => {
  const { shortName } = req.query;
  if (!shortName) {
    return res.status(400).send({ error: 'shortName query parameter missing' });
  }

  const url = `https://api.at.govt.nz/v2/gtfs/routes/routeShortName/${shortName}`;
  try {
    const response = await axios.get(url, {
      headers: {
        'Ocp-Apim-Subscription-Key': apiKey,
      },
    });
    const routeData = response.data as RouteResponse;

    return res.status(200).send(routeData);
  } catch (e) {
    return res.status(502).send({ error: e.message });
  }
});

app.get('/locations', async (req, res) => {
  const { routeId } = req.query;
  if (!routeId) {
    return res.status(400).send({ error: 'routeId query parameter missing' });
  }

  try {
    const tripUrl = `https://api.at.govt.nz/v2/gtfs/trips/routeid/${routeId}`;
    const tripResponse = await axios.get(tripUrl, {
      headers: {
        'Ocp-Apim-Subscription-Key': apiKey,
      },
    });
    const tripData = tripResponse.data as TripResponse;

    const tripIds = new Set<string>();
    tripData.response.forEach((trip) => tripIds.add(trip.trip_id));

    const locationsUrl = `https://api.at.govt.nz/v2/public/realtime/vehiclelocations`;
    const locationsReponse = await axios.get(locationsUrl, {
      headers: {
        'Ocp-Apim-Subscription-Key': apiKey,
      },
    });
    const locationsData = locationsReponse.data as LocationResponse;

    locationsData.response.entity = locationsData.response.entity.filter(
      (entity) => tripIds.has(entity.vehicle?.trip?.trip_id)
    );

    return res.status(200).send(locationsData);
  } catch (e) {
    return res.status(502).send({ error: e.message });
  }
});

app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});
