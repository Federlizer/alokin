import Discord, {
  Message,
  Collection,
  DMChannel,
  TextChannel,
  GroupDMChannel,
} from 'discord.js';
import { ICommand } from '../../commands';

import openCommand from './open';
import closeCommand from './close';
import registerCommand from './register';

const subCommands = new Collection<string, ICommand>();

subCommands.set(openCommand.name, openCommand);
subCommands.set(closeCommand.name, closeCommand);
subCommands.set(registerCommand.name, registerCommand);

async function execute(message: Message, args: string[]): Promise<void> {
  const channel: (DMChannel|TextChannel|GroupDMChannel) = message.channel;

  if (!(channel instanceof TextChannel)) {
    return;
  }

  if (args.length === 0) {
    message.channel.send('SEND_TOURNAMENT_HELP_MSG');
    return;
  }

  let [subCmd, ...restArgs] = args;
  const subCommand: ICommand|undefined = subCommands.get(subCmd);

  if (subCommand === undefined) {
    message.channel.send('SEND_TOURNAMENT_HELP_MSG');
    return;
  }

  return subCommand.execute(message, restArgs);
}

export default {
  name: 'tournament',
  description: 'TOURNAMENT_COMMAND_DESCRIPTION',
  execute,
}
