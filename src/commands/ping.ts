import { Message } from 'discord.js';

function ping(message: Message) {
  message.reply('Pong!');
}

export default {
  name: 'ping',
  description: 'Ping!',
  execute: ping,
}
