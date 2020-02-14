import { Message } from 'discord.js';

import pingCommand from './ping';

export interface ICommand {
  name: string;
  description: string;
  execute: (message: Message) => void;
};

export default [
  pingCommand,
];
