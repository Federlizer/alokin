import { Message } from 'discord.js';

function ping(message: Message, _: string[]) {
  message.reply('Pong!');
}

export default {
  name: 'ping',
  description: 'Pings Alokin, he\'ll try to Pong! back.',
  execute: ping,
}
