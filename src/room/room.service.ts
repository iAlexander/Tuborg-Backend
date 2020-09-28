import {Injectable} from '@nestjs/common';
import {CorizoidService} from '../services/corizoid/corizoid.service';
import {QuestionCategoryEnum, Room, RoomQuestion, RoomStatusEnum} from "../types";
import {Config, configInstance} from "../core/config";
import {NextQuestionDto} from "./dto/next-question.dto";
import {GetQuestionByIdDto} from "./dto/get-question-by-id.dto";

@Injectable()
export class RoomService {
  private readonly rooms: Room[];

  constructor(
      private corizoidService: CorizoidService,
      private config: Config,
  ) {
    this.rooms = [
      this.setUpRoom(1),
      this.setUpRoom(2),
      this.setUpRoom(3),
      this.setUpRoom(4),
      this.setUpRoom(5),
    ];
  }

  private setUpRoom(id: number): Room {
    return {
      id,
      currentQuestion: null,
      previousQuestion: null,
      currentQuestions: {
        [QuestionCategoryEnum.CATEGORY_1]: null,
        [QuestionCategoryEnum.CATEGORY_2]: null,
        [QuestionCategoryEnum.CATEGORY_3]: null,
        [QuestionCategoryEnum.CATEGORY_4]: null,
      },
      status: RoomStatusEnum.WAIT_FOR_START,
      questions: this.config.questions.map(i => ({ ...i })),
    }
  }

  getRoomById(id: number): Room {
    return this.rooms[id - 1];
  }

  getRoomQuestionById({ id, questionId }: GetQuestionByIdDto): RoomQuestion {
    return this.rooms[id - 1].questions.find(item => item.id === questionId);
  }

  async getRandNextQuestion({ category, id }: NextQuestionDto): Promise<any> {
    const { currentQuestion } = this.rooms[id - 1];

    if (currentQuestion !== null) {
      this.rooms[id - 1].previousQuestion = currentQuestion;

      const index = this.rooms[id - 1].questions.findIndex(item => item.id === currentQuestion);

      this.rooms[id - 1].questions[index].used = true;
    }

    const categoryQuestions = this.rooms[id - 1].questions.filter(item => item.category === category);

    const unUsedQuestions = categoryQuestions.filter(item => item.used === false);

    if (!unUsedQuestions.length) {
      return null;
    }
    else {
      const question = RoomService.findRandomQuestion(unUsedQuestions);

      await this.corizoidService.questionCommand(id, question);

      this.rooms[id - 1].currentQuestion = question.id;

      this.rooms[id - 1].currentQuestions[category] = {
        ...question,
        used: unUsedQuestions.length === 1 ? true : question.used,
        last: unUsedQuestions.length === 1,
      };

      return {
        ...question,
        last: unUsedQuestions.length === 1,
        used: false,
      };
    }
  }

  changeRoomStatus(id: number, status: RoomStatusEnum): void {
    this.rooms[id - 1].status = status;
  }

  resetRoom(id: number): void {
    this.rooms[id - 1] = this.setUpRoom(id);
  }

  private static findRandomQuestion(arr: RoomQuestion[]): RoomQuestion {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}
