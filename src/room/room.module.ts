import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { CoreModule } from '../core/core.module';
import { CorizoidService } from '../services/corizoid/corizoid.service';

@Module({
  imports: [CoreModule],
  controllers: [RoomController],
  providers: [RoomService, CorizoidService],
})
export class RoomModule {}
