import {
  Message,

  TextChannel,
} from 'discord.js';

import { ITournament } from '../../../models/Tournament';
import tournamentController from '../../../controllers/tournament';

async function execute(message: Message, args: string[]): Promise<void> {
  let teamTournament = false;
  const channel: TextChannel = message.channel as TextChannel;

  // handle flag arguments and filter them out
  const params = args.filter((arg) => {
    if (arg.toLowerCase() === 'withsteamgroups') {
      teamTournament = true;
      return false;
    }

    return true;
  });

  const tournament: ITournament|null = await tournamentController.create({
    name: channel.name,
    displayName: params.length !== 0 ? params.join(' ') : channel.name,
    teams: teamTournament,
  });

  if (tournament === null) {
    let msg = 'A tournament with the same identification name is already opened for registration.';
    msg += ' Please close the registration of that tournament first in order to open a new one.';

    channel.send(msg);
    return;
  }

  await tournament.openRegistration();

  channel.send(`Registration for ${tournament.displayName} is open`);
}

export default {
  name: 'open',
  description: 'TOURNAMENT_OPEN_COMMAND_DESCRIPTION',
  execute,
}
