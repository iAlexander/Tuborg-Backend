import { HttpStatus } from '@nestjs/common';

export class Response {
  status: 'ok' | 'error';

  response?: any;

  message?: string | string[];

  static ok<T extends Response, P>(response?: P): T {
    return this.createResponse<T, P>('ok', response);
  }

  static error<T extends Response, P, E>(
      message?: string | string[],
      statusCode?: HttpStatus | number,
      response?: P,
  ): T {
    return this.createResponse<T, P>('error', response, message);
  }

  private static createResponse<T extends Response, P>(
      status: 'ok' | 'error',
      response = {},
      message?: string | string[],
  ): any {
    return {
      status,
      response,
      message,
    };
  }
}

export enum RoomStatusEnum {
  WAIT_FOR_START= 'wait_for_start',
  READY_FOR_START= 'ready_for_start',
  GAME_STARTED= 'game_started',
}

export enum QuestionCategoryEnum {
  CATEGORY_1 = 'party',
  CATEGORY_2 = 'show',
  CATEGORY_3 = 'never',
  CATEGORY_4 = 'truth',
}

export interface RoomQuestion {
  id: number;
  questionSite: string;
  questionChat: string;
  category: QuestionCategoryEnum;
  used: boolean;
}

export interface RoomWithLast extends RoomQuestion {
  last: boolean;
}

export class Room {
  id: number;
  currentQuestion: number | null;
  previousQuestion: number | null;
  currentQuestions: {
    [QuestionCategoryEnum.CATEGORY_1]: null | RoomWithLast;
    [QuestionCategoryEnum.CATEGORY_2]: null | RoomWithLast;
    [QuestionCategoryEnum.CATEGORY_3]: null | RoomWithLast;
    [QuestionCategoryEnum.CATEGORY_4]: null | RoomWithLast;
  };
  status: RoomStatusEnum;
  questions: RoomQuestion[];
}

