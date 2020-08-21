import {HttpException, Injectable} from '@nestjs/common';
import {CorizoidService} from "../services/corizoid/corizoid.service";
import {Config} from "../core/config";
import {CacheService} from "../services/cache+/cache.service";

@Injectable()
export class PromoCodeService {
  constructor(
      private cacheService: CacheService,
      private config: Config,
  ) {}

  async generate(): Promise<string> {
    const code = Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6);

    await this.cacheService.set(code, code, this.config.promoCodeLiveTime);

    console.log(code);
    return code;
  }

  async use(code: string): Promise<void> {
    const cacheCode = await this.cacheService.get(code);

    if (!cacheCode) {
      throw new HttpException('Invalid code', 400);
    }

    await this.cacheService.del(code);
  }
}
