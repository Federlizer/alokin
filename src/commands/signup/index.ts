import {
  TextChannel,
  DMChannel,
  GroupDMChannel,

  Message,
  User,
} from 'discord.js';

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

  const msg = `You have been signed up for the ${tournament.displayName} tournament.`;
  userDMChannel.send(msg)
}

export default {
  name: 'signup',
  description: 'Signs up (registers) the user for a tournament ' +
    '(the registration has to be open for that tournament) using ' +
    'their Tag as an identification. One has to register on ' +
    'the specific channel that the tournament has been opened on.',
  execute,
}
