import express from 'express';

const PORT = 5000;

const app = express();

app.get('/', (_req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`);
});
