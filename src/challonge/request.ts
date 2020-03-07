import { IncomingMessage, ClientRequest } from 'http';
import https from 'https';

export interface Response extends IncomingMessage {
  body: string;
}

export default function request(url: string, options: object): Promise<Response> {
  return new Promise<Response>((resolve, reject) => {
    let responseBody: string = '';

    const request: ClientRequest = https.request(url, options, (res: IncomingMessage) => {
      res.setEncoding('utf8');
      res.on('error', (err: Error) => reject(err));

      res.on('data', (data: string) => {
        responseBody += data;
      });

      res.on('end', () => {
        const response: Response = Object.assign({}, res, { body: responseBody });
        resolve(response);
      });
    });

    request.on('error', (err: Error) => reject(err));
    request.end();
  });
}
