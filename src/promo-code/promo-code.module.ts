import { Module } from '@nestjs/common';
import { PromoCodeController } from './promo-code.controller';
import { PromoCodeService } from './promo-code.service';
import { CoreModule } from '../core/core.module';
import { CorizoidService } from '../services/corizoid/corizoid.service';
import { CacheService } from "../services/cache+/cache.service";

@Module({
  imports: [CoreModule],
  controllers: [PromoCodeController],
  providers: [PromoCodeService, CorizoidService, CacheService],
})
export class PromoCodeModule {}
