import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis'

@Injectable()
export class CacheService {
  constructor(@Inject('Redis') private redis: Redis) {}

  async set(
    key: string,
    value: string,
    lifetimeInMillis: number,
    expiryMode = 'PX',
  ): Promise<boolean> {
    const reply = await this.redis.set(
      key,
      value,
      expiryMode,
      lifetimeInMillis,
    );

    return reply === 'OK';
  }

  async get(key: string): Promise<string> {
    return this.redis.get(key);
  }

  async del(key: string): Promise<boolean> {
    return this.redis.del(key);
  }
}
