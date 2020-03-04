import { Alokin } from './Alokin';
import commands from './commands';
import config from './config';

import mongoose from 'mongoose';

const { db } = config;
const connectionString = `mongodb://${db.user}:${db.password}@${db.hostname}/${db.database}`;

const alokin = new Alokin({
  prefix: config.prefix,
  commands,
});

mongoose.connect( connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('DB connected');
    return alokin.start(config.token)
  })
  .then(() => {
    console.log('Alokin has been setup');
  })
  .catch((err) => {
    console.error(err);
  });


function gracefulShutdown() {
  alokin.stop()
    .then(() => {
      console.log('Alokin has shutdown');
      return mongoose.disconnect()
    })
    .then(() => {
      console.log('DB connection closed');
    })
    .catch((err) => console.error(err));
}

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
