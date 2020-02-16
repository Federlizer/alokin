import Discord, { Message } from 'discord.js';

import { ICommand } from './commands';

export interface Options {
  prefix: string;
  commands: ICommand[];
}

export class Alokin {
  private client: Discord.Client;
  private commands: Discord.Collection<string, ICommand>;

  private prefix: string;

  constructor(opts: Options) {
    this.prefix = opts.prefix;

    this.client = new Discord.Client();
    this.commands = new Discord.Collection<string, ICommand>();

    opts.commands.forEach((command) => {
      this.commands.set(command.name, command);
    });

    this.setupListener();
  }


  /**
   * Sets up the command executor
   */
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
        this.commands.get(command)!.execute(message, args);
      } catch (err) {
        console.error(err);
        message.reply('There was an error while trying to execute this command. Plese check the logs.');
      }
    });
  }

  /**
   * Starts Alokin (logs him in)
   */
  public async start(token: string): Promise<string> {
    return this.client.login(token)
  }

  /**
   * Gracefully shuts down Alokin
   */
  public stop(): Promise<void> {
    return this.client.destroy()
  }
}
