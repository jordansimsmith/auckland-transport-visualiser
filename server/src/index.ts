import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 5000;
const apiKey = process.env.AT_API_KEY;

const app = express();

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

app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});
