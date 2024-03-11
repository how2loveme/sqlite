const express = require('express');
const apiRouter = require('./routes/api');
const app = express();
const port = 3000;

app.get('/', function (req, res) {
  res.status(200).json('kowaine');
});

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`:::listening at ${port}`);
});