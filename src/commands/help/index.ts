import {
  Message,
  RichEmbed,

  TextChannel,
  DMChannel,
  GroupDMChannel,
} from 'discord.js';

import commands, { ICommand } from '../../commands';

function constructHelpMessage(commands: ICommand[]): string {
  const commandCellLength = commands
    .reduce((longest, command) => command.name.length > longest ? command.name.length : longest, 0);

  const descriptionCellLength = 100;
  const cellMargin = 4;


  let helpMsg = commands.map((command) => {
    const commandText = command.name.padEnd(commandCellLength);


    const descriptionWords = command.description.split(' ');
    let descriptionText = '';
    let descriptionLineLength = 0;

    descriptionWords.forEach((word) => {
      if (descriptionLineLength + word.length + 1 > descriptionCellLength) {
        descriptionText += `\n${' '.repeat(commandCellLength + cellMargin)}`;
        descriptionLineLength = 0;
      }

      descriptionText += `${word} `;
      descriptionLineLength += word.length + 1;
    });

    return commandText +
      ' '.repeat(cellMargin) +
      descriptionText;
  }).join('\n\n\n');

  helpMsg = '```\n' + helpMsg + '```';

  return helpMsg;
}

async function execute(message: Message, _: string[]) {
  const channel: (TextChannel|DMChannel|GroupDMChannel) = message.channel;

  const msg: string = constructHelpMessage(commands);

  channel.send(msg);
}

export default {
  name: 'help',
  description: 'Sends a help message for all commands',
  execute,
}
