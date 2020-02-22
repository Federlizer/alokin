import {
  Message,
  User,

  TextChannel,
  DMChannel,
  GroupDMChannel,
} from 'discord.js';

import Tournament from '../../models/Tournament';

async function execute(message: Message, args: string[]) {
  const channel: (TextChannel|DMChannel|GroupDMChannel) = message.channel;

  if (!(channel instanceof TextChannel)) {
    message.reply('You can\'t open up registration from this channel');
    return;
  }

  let tournament = new Tournament({
    name: args[0] ?? channel.name,
  });

  tournament = await tournament.save();

  const msg = `Registration for ${tournament.name} is open`;
  channel.send(msg);
}

export default {
  name: 'open',
  description: 'Open registration for a tournament',
  execute,
}
