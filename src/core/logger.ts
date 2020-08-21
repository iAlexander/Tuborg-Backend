import * as pino from 'pino';
import { Config } from './config';
import * as moment from 'moment';

export class Logger {
  info: pino.LogFn;
  debug: pino.LogFn;
  error: pino.LogFn;
  warn: pino.LogFn;
}

export function createLogger({ logger: { timeFormat, name } }: Config): Logger {
  const baseSettings = {
    name: name,
    timestamp: () => `,"time":"${moment().format(timeFormat)}"`,
  };

  return pino({
    ...baseSettings,
    level: 'debug',
    prettyPrint: {
      colorize: true,
    } as any,
  });
}
