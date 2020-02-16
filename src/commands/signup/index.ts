import {
  TextChannel,
  DMChannel,
  GroupDMChannel,

  Message,
  User,
} from 'discord.js';

import tournamentNames from './tournamentNames';


function execute(message: Message, _: string[]) {
  const user: User = message.author;
  const channel: (TextChannel|DMChannel|GroupDMChannel) = message.channel;

  if (!(channel instanceof TextChannel)) {
    console.error('Someone tried to sign up from a non \'TextChannel\'');
    return;
  }

  const channelName = channel.name;

  user.createDM()
    .then((channel: DMChannel) => {
      return channel.send(`Hello, you just signed up for the ${tournamentNames[channelName]} tournament.`)
    })
    .catch((err) => console.error(err));
}

export default {
  name: 'signup',
  description: 'Sign up for an event/tournament that\'s been created by the channel',
  execute,
}
