import path from 'path';
import fs from 'fs';

const data: string = fs.readFileSync(path.resolve(__dirname, '../config.json'), 'utf8');

const config = JSON.parse(data);

export default config;
