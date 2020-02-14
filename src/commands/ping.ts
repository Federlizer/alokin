import { Message } from 'discord.js';

function ping(message: Message) {
  const channel = message.channel;

  channel.send('Pong!');
}

export default {
  name: 'ping',
  description: 'Ping!',
  execute: ping,
}
