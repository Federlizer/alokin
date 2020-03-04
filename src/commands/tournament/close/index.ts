import {
  Message,
  TextChannel,
} from 'discord.js';

import Tournament, { ITournament } from '../../../models/Tournament';

async function execute(message: Message, args: string[]): Promise<void> {
  const channel: TextChannel = message.channel as TextChannel;

  const tournament: ITournament|null = await Tournament.findOne({ name: channel.name })

  if (tournament === null) return;

  console.log(tournament);
  await tournament.closeRegistration();

  await channel.send('Tournament registration has been closed');
}

export default {
  name: 'close',
  description: 'TOURNAMENT_CLOSE_COMMAND_DESCRIPTION',
  execute,
}
