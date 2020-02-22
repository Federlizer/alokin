import {
  Message,
  User,

  TextChannel,
  DMChannel,
  GroupDMChannel,
} from 'discord.js';

import Tournament from '../../models/Tournament';

function execute(message: Message, args: string[]) {
  const channel: (TextChannel|DMChannel|GroupDMChannel) = message.channel;

  if (!(channel instanceof TextChannel)) {
    message.reply('You can\'t open up registration from this channel');
    return;
  }

  const tournament = new Tournament({
    name: args[0] ?? channel.name,
  });

  tournament.save()
    .then((data) => {
      console.log(data);
      const msg = 'Registration for TOURNAMENT_NAME is open';
      channel.send(msg);
    })
    .catch((err) => console.error(err));
}

export default {
  name: 'open',
  description: 'Open registration for a tournament',
  execute,
}
