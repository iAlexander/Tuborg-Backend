import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import {APP_FILTER, APP_GUARD} from '@nestjs/core';

import { CoreModule } from './core/core.module';
import { RoomModule } from './room/room.module';
import { AppContextMiddleware } from './core/middlewares/app-context.middleware';
import { ExceptionFilterFilter } from './core/filters/exception-filter.filter';
import {PromoCodeModule} from "./promo-code/promo-code.module";
import {AuthGuard} from "./core/guards/auth.guard";

@Module({
  imports: [ CoreModule, RoomModule, PromoCodeModule ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionFilterFilter,
    }
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AppContextMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}