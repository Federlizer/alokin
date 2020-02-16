import { Message } from 'discord.js';

import pingCommand from './ping';
import signupCommand from './signup';

export interface ICommand {
  name: string;
  description: string;
  execute: (message: Message, args: string[]) => void;
};

export default [
  pingCommand,
  signupCommand,
];
