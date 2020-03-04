import { Message } from 'discord.js';

import pingCommand from './ping';
import tournamentCommand from './tournament';

import helpCommand from './help';

export interface ICommand {
  name: string;
  description: string;
  execute: (message: Message, args: string[]) => void;
  subcommands?: ICommand[];
};

export default [
  pingCommand,
  tournamentCommand,

  helpCommand,
];
