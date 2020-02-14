import { Alokin } from './Alokin';
import commands from './commands';
import config from './config.json';


const alokin = new Alokin({
  token: config.token,
  prefix: config.prefix,
  commands,
});


alokin.start()
  .then(() => console.log('Aloking has been setup'))
  .catch((err) => console.error(err));

function gracefulShutdown() {
  alokin.stop()
    .then(() => console.log('Successful shutdown'))
    .catch((err) => console.error(err));
}

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
