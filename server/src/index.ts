import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

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
    const { data } = await axios.get(url, {
      headers: {
        'Ocp-Apim-Subscription-Key': apiKey,
      },
    });

    return res.status(200).send(data);
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
    const { data: tripData } = await axios.get(tripUrl, {
      headers: {
        'Ocp-Apim-Subscription-Key': apiKey,
      },
    });

    const tripIds = tripData.response.reduce(
      (set: Set<string>, trip: any) => set.add(trip.trip_id),
      new Set()
    );

    const locationsUrl = `https://api.at.govt.nz/v2/public/realtime/vehiclelocations`;
    const { data: locationsData } = await axios.get(locationsUrl, {
      headers: {
        'Ocp-Apim-Subscription-Key': apiKey,
      },
    });

    locationsData.response.entity = locationsData.response.entity.filter(
      (entity: any) => tripIds.has(entity.vehicle?.trip?.trip_id)
    );

    return res.status(200).send(locationsData);
  } catch (e) {
    return res.status(502).send({ error: e.message });
  }
});

app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});
