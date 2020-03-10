import { v4 as uuid } from 'uuid';
import request, { Response } from './request';

import ITournament from './ITournament';

export default class Challonge {
  private path: string = 'https://api.challonge.com/v1/';
  private apiKey: string;

  public constructor(args: { apiKey: string }) {
    const { apiKey } = args;

    this.apiKey = apiKey;
  }

  /**
   * Creates a tournament.
   * @param {string} name: the name of the tournament
   * @param {('single elimination|'double elimination')} type: the type of the tournament
   *
   * @returns {number} the id of the newly created tournament
   */
  public async createTournament(
    args: {
      name: string,
      type: ('single elimination'|'double elimination'),
    }
  ): Promise<ITournament> {
    let url = `${this.path}/tournaments?`;
    url += `api_key=${this.apiKey}&`;
    url += `tournament[open_signup]=false&`;
    url += `tournament[name]=${args.name}&`;
    url += `tournament[tournament_type]=${args.type}&`;
    url += `tournament[url]=${uuid().replace(/-/g, '_')}`;

    const response = await request(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (response.statusCode !== 200) {
      throw new Error(response.body);
    }

    const { tournament } = JSON.parse(response.body);
    return tournament;
  }

  /**
   * Inserts participants in bulk in a tournament that's not yet started.
   * @param {number} tournamentId: The ID of the tournament (or its url_id)
   * @param {string[]} particpants: An array full of participant names that are to be added
   *
   * @returns {Promise<void}
   */
  public async insertParticipants(
    args: {
      tournamentId: number,
      participants: string[],
    }
  ): Promise<void> {
    let url = `${this.path}/tournaments/${args.tournamentId}/participants/bulk_add?`;
    url += `api_key=${this.apiKey}&`;

    url += args.participants
      .map((participant) => `participants[][name]=${encodeURIComponent(participant)}`).join('&');

    const response: Response = await request(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (response.statusCode !== 200) {
      throw new Error(response.body);
    }
  }
};
