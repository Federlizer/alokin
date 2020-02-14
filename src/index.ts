import { Alokin } from './Alokin';
import commands from './commands';
import config from './config';

const alokin = new Alokin({
  prefix: config.prefix,
  commands,
});


alokin.start(config.token)
  .then(() => console.log('Aloking has been setup'))
  .catch((err) => console.error(err));

function gracefulShutdown() {
  alokin.stop()
    .then(() => console.log('Successful shutdown'))
    .catch((err) => console.error(err));
}

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
