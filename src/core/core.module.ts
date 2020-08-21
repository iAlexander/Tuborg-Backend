import { Module } from '@nestjs/common';
import { Config, configInstance } from './config';
import { createLogger, Logger } from './logger';
import * as Redis from 'ioredis';

const customProviders = [
  {
    provide: Config,
    useValue: configInstance,
  },
  {
    provide: 'Redis',
    useFactory: (config: Config) => {
      const { host, port } = config.redis;
      return new Redis(port, host);
    },
    inject: [Config],
  },
  {
    provide: Logger,
    useFactory: (config: Config) => createLogger(config),
    inject: [Config],
  },
];

@Module({
  providers: [...customProviders],
  exports: [...customProviders],
})
export class CoreModule {}
