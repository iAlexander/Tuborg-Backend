import { Injectable } from '@nestjs/common';
import { Config } from '../../core/config';
import axios from 'axios';
import { RoomQuestion } from "../../types";

@Injectable()
export class CorizoidService {
  constructor(
      private config: Config,
  ) {}

  async questionCommand(roomId: number, question: RoomQuestion): Promise<void> {
    await axios.post(this.config.corizoidUrl, {
      command: 'question',
      roomId,
      question,
    });
  }

  async endGame(roomId: number): Promise<void> {
    await axios.post(this.config.corizoidUrl, {
      command: 'end',
      roomId,
    });
  }
}
