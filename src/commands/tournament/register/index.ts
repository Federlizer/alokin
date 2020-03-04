import { Message, TextChannel, DMChannel } from 'discord.js';

import Tournament, { ITournament } from '../../../models/Tournament';

async function execute(message: Message, args: string[]): Promise<void> {
  const channel: TextChannel = message.channel as TextChannel;

  const tournament: ITournament|null = await Tournament.findOne({ name: channel.name });

  if (tournament === null) {
    const msg = 'A tournament doesn\'t exist for this channel yet.';
    channel.send(msg);
    return;
  }

  if (!tournament.registrationOpen) {
    const msg = 'Registration for this tournament has been closed.';
    channel.send(msg);
    return;
  }

  if (tournament.teams && args.length === 0) {
    let msg = 'You need to provide a link to your Steam Group in order to register for this tournament.';
    msg += 'The link you provide must be a valid one, or your registration won\'t be accepted at the start of the tournament!';

    channel.send(msg);
    return;
  }

  const replyChannel: DMChannel = await message.author.createDM();
  const participantString = args[0] ?? message.author.tag;
  const success = await tournament.registerParticipant(participantString);

  if (!success) {
    let msg = tournament.teams ? 'Your team has' : 'Your tag is';
    msg += ' already registered for this tournament. If you haven\'t actually registered, please contact the tournament organizer for a resolution.';
    replyChannel.send(msg);
    return;
  }

  const msg = `You have been registered for the ${tournament.displayName} tournament.`;
  replyChannel.send(msg);
}

export default {
  name: 'register',
  description: 'TOURNAMENT_REGISTER_COMMAND_DESCRIPTION',
  execute,
}
