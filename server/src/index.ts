import express from 'express';

const port = process.env.PORT || 5000;

const app = express();

app.get('/', (_req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});
