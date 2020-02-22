import {
  TextChannel,
  DMChannel,
  GroupDMChannel,

  Message,
  User,
} from 'discord.js';

import tournamentNames from './tournamentNames';

import Tournament, { ITournament } from '../../models/Tournament';

function execute(message: Message, _: string[]) {
  const channel: (TextChannel|DMChannel|GroupDMChannel) = message.channel;

  if (!(channel instanceof TextChannel)) {
    console.error('Someone tried to sign up from a non \'TextChannel\'');
    return;
  }

  const user: User = message.author;
  const channelName = channel.name;

  Tournament.findOne({ name: channelName })
    .then((tournament: ITournament|null) => {
      if (tournament === null ) return;

      const signedUp = tournament.participants.find((p) => p === user.tag);
      if (signedUp) {
        user.createDM()
          .then((channel: DMChannel) => {
            const msg = 'Your tag is already registered for this tournament. If you haven\'t actually registered, please contact the tournament organizer for a resolution.';
            return channel.send(msg);
          })
          .catch((err) => console.error(err));

          return;
      }

      tournament.participants = [...tournament.participants, user.tag];
      tournament.save()
      .then(() => {
        user.createDM()
          .then((channel: DMChannel) => {
            const msg = `You have been signed up for the ${tournamentNames[channelName]} tournament.`;
            return channel.send(msg)
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));

    })
    .catch((err) => console.error(err));
}

export default {
  name: 'signup',
  description: 'Sign up for an event/tournament that\'s been created by the channel',
  execute,
}
