import Challonge from './Challonge';

export function createClient(options: {apiKey: string}): Challonge {
  const client = new Challonge(options);

  return client;
}

export default {
  createClient,
}
