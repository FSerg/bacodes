import 'babel-polyfill';
//import * as path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config/config';

import BarcodeRoutes from './routes/BarcodeRoutes';

import log from './services/Logging';

mongoose.Promise = global.Promise;
mongoose.connect(
  config.mongoURI,
  { useMongoClient: true },
  err => {
    if (err) log.error(err);
    else {
      console.log('MongoDB connected!');
    }
  }
);

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// BACKEND
// ROUTES
app.use('/api/barcode', BarcodeRoutes);

// test route
app.get('/test', (req, res) => {
  res.status(200).send({ result: 'GET: /test' });
});

// FRONTEND
// app.use(express.static('client/build'));
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// });

app.listen(config.port, () => {
  return console.log(`Server running (port: ${config.port})`);
});
