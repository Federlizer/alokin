import {
  TextChannel,
  DMChannel,
  GroupDMChannel,

  Message,
  User,
} from 'discord.js';

import tournamentNames from './tournamentNames';

import Tournament, { ITournament } from '../../models/Tournament';

async function execute(message: Message, _: string[]) {
  const channel: (TextChannel|DMChannel|GroupDMChannel) = message.channel;

  if (!(channel instanceof TextChannel)) {
    console.error('Someone tried to sign up from a non \'TextChannel\'');
    return;
  }

  const user: User = message.author;
  const channelName = channel.name;

  let tournament: ITournament|null = await Tournament.findOne({ name: channelName });
  if (tournament === null) return;

  const userDMChannel: DMChannel = await user.createDM();

  // don't sign up twice
  const signedUp = tournament.participants.find((p) => p === user.tag);
  if (signedUp) {
    const msg = 'Your tag is already registered for this tournament. If you haven\'t actually registered, please contact the tournament organizer for a resolution.';
    userDMChannel.send(msg);
    return;
  }

  // register participant
  tournament.participants = [...tournament.participants, user.tag];
  tournament = await tournament.save();

  const msg = 'You have been signed up for the ${TOURNAMENT_DISPLAY_NAME} tournament.';
  userDMChannel.send(msg)
}

export default {
  name: 'signup',
  description: 'Sign up for an event/tournament that\'s been created by the channel',
  execute,
}
