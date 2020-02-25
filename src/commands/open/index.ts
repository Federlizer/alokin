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

  const name = channel.name;
  const displayName = args.length !== 0
    ? args.join(' ')
    : channel.name;

  let tournament = new Tournament({ name, displayName });

  tournament = await tournament.save();

  const msg = `Registration for ${tournament.displayName} is open`;
  channel.send(msg);
}

export default {
  name: 'open',
  description: 'Open registration for a tournament',
  execute,
}
