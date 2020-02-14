import Discord, { Message } from 'discord.js';

import ICommand from './commands/ICommand';

export interface Options {
  prefix: string;
  token: string;
  commands: ICommand[];
}

export class Alokin {
  private prefix: string;
  private commands: Discord.Collection<string, ICommand>;
  private client: Discord.Client;
  private token: string;

  constructor(opts: Options) {
    this.token = opts.token;
    this.prefix = opts.prefix;

    this.client = new Discord.Client();
    this.commands = new Discord.Collection<string, ICommand>();

    opts.commands.forEach((command) => {
      this.commands.set(command.name, command);
    });

    this.setupListener();
  }

  private setupListener(): void {
    this.client.on('message', (message: Message) => {
      if (!message.content.startsWith(this.prefix) || message.author.bot) {
        return;
      }

      const args = message.content.slice(this.prefix.length).split(/ +/);
      const command = args.shift();

      if (command === undefined) {
        return;
      }


      if (!this.commands.has(command)) {
        return;
      }

      try {
        this.commands.get(command)!.execute(message);
      } catch (err) {
        console.error(err);
        message.reply('There was an error while trying to execute this command. Plese check the logs.');
      }
    });
  }

  public start(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.client.once('ready', () => {
        resolve();
      });
      this.client.login(this.token);
    });
  }

  public stop(): Promise<void> {
    return this.client.destroy()
  }
}
