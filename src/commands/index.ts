import { Message } from 'discord.js';

import pingCommand from './ping';
import signupCommand from './signup';
import openCommand from './open';

export interface ICommand {
  name: string;
  description: string;
  execute: (message: Message, args: string[]) => void;
};

export default [
  pingCommand,
  signupCommand,
  openCommand,
];
