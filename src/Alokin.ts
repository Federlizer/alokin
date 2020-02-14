import Discord, { Message } from 'discord.js';

export interface Options {
  token: string;
}

export class Alokin {
  private client: Discord.Client;
  private token: string;

  constructor(opts: Options) {
    this.token = opts.token;
    this.client = new Discord.Client();

    this.setup();
  }

  private setup(): void {
    this.client.on('message', (message: Message) => {
      console.log(message.content);
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
