import { Alokin } from './Alokin';
import commands from './commands';
import config from './config';

import mongoose from 'mongoose';

const { db } = config;
const connectionString = `mongodb://${db.user}:${db.password}@${db.hostname}/${db.database}`;

mongoose.connect( connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((err) => {
    throw err;
  });

const alokin = new Alokin({
  prefix: config.prefix,
  commands,
});


alokin.start(config.token)
  .then(() => console.log('Aloking has been setup'))
  .catch((err) => console.error(err));

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
