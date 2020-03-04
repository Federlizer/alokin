import Tournament, { ITournament } from '../../models/Tournament';

async function create(opts: { name: string, displayName: string, teams: boolean }): Promise<ITournament|null> {
  // make sure to recreate the tournament
  // BUT ONLY if the registration isn't open
  const oldTournament: ITournament|null = await Tournament.findOne({ name: opts.name });

  if (oldTournament !== null) {
    if (oldTournament.registrationOpen) {
      return null;
    }
    await Tournament.deleteOne({ name: opts.name });
  }

  let tournament = new Tournament({
    name: opts.name,
    displayName: opts.displayName,
    registrationOpen: false,
    teams: opts.teams,
    registered: [],
  });

  return tournament.save();
}

export default {
  create,
}
