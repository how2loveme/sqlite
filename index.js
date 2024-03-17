const express = require('express');
const apiRouter = require('./routes/api');
// const pageRouter = require('./routes/page');
const app = express();
const cors = require('cors');
const port = 3000;
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({extended: true}));
// app.use(express.text());

app.get('/', function (req, res) {
  res.status(200).json('kowaine');
});

app.use('/api', apiRouter);
// app.use('/page', pageRouter);

app.listen(port, () => {
  console.log(`:::listening at ${port}`);
});