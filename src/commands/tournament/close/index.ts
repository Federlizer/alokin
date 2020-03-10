import {
  Message,
  TextChannel,
} from 'discord.js';

import config from '../../../config';
import challonge from '../../../challonge';
import ChallongeTournament from '../../../challonge/ITournament';

import Tournament, { ITournament } from '../../../models/Tournament';

async function execute(message: Message, args: string[]): Promise<void> {
  const channel: TextChannel = message.channel as TextChannel;

  const tournament: ITournament|null = await Tournament.findOne({ name: channel.name })

  if (tournament === null) return;

  await tournament.closeRegistration();

  const challongeClient = challonge.createClient({ apiKey: config.challonge.apiKey });

  const challongeTournament: ChallongeTournament = await challongeClient.createTournament({
    name: tournament.displayName,
    type: 'double elimination',
  });

  await challongeClient.insertParticipants({
    tournamentId: challongeTournament.id,
    participants: tournament.registered,
  });

  await channel.send(`Tournament registration has been closed. Tournament link is ${challongeTournament.full_challonge_url}`);
}

export default {
  name: 'close',
  description: 'TOURNAMENT_CLOSE_COMMAND_DESCRIPTION',
  execute,
}
