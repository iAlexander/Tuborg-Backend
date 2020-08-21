import {Body, Controller, Get, HttpException, Param, Post} from '@nestjs/common';
import {IdParamsDto} from './dto/id-params.dto';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {RoomService} from './room.service';
import {Response, RoomStatusEnum} from '../types';
import {NextQuestionDto} from "./dto/next-question.dto";
import {CorizoidService} from "../services/corizoid/corizoid.service";
import {EndGameDto} from "./dto/end-game.dto";
import {GetQuestionByIdDto} from "./dto/get-question-by-id.dto";
import {RoleDecorator} from "../core/decorators/roles.decorator";
import {Roles} from "../core/config";

@ApiTags('Rooms')
@Controller('rooms')
export class RoomController {
    constructor(
        private roomService: RoomService,
        private corizoidService: CorizoidService,
    ) {}

    @Get('/:id')
    @ApiResponse({
        schema: {
            example: {
                status: 'ok',
                response: {
                    "status": "ok",
                    "response": {
                        "id": 1,
                        "currentQuestion": 3,
                        "previousQuestion": 2,
                        "status": "ready_for_start"
                    }
                }
            }
        },
        status: 201,
    })
    getRoom(@Param() { id }: IdParamsDto): Response {
        const room = this.roomService.getRoomById(id);
        const question = this.roomService.getRoomQuestionById({
            id,
            questionId: room.currentQuestion
        });

        return Response.ok({
            ...room,
            questions: undefined,
            currentQuestion: question || null,
        });
    }

    @RoleDecorator(Roles.corizoid)
    @Post('/:id/ready')
    ready(@Param() { id }: IdParamsDto): Response {
        this.roomService.changeRoomStatus(id, RoomStatusEnum.READY_FOR_START);
        return Response.ok();
    }

    @Get('/:id/status')
    @ApiResponse({
        schema: {
            example: {
                status: 'ok',
                response: {
                    "status": 'game_started',
                }
            }
        },
        status: 201,
    })
    status(@Param() { id }: IdParamsDto): Response {
        const { status } = this.roomService.getRoomById(id);
        return Response.ok({ status });
    }

    @RoleDecorator(Roles.front)
    @Get('/:id/questions/categories/:category')
    @ApiResponse({
        schema: {
            example: {
                status: 'ok',
                response: {
                    "id": 0,
                    "questionSite": "Initial question / category 1",
                    "questionChat": "Initial question / category 1",
                    "category": "category_1",
                    "used": false,
                    "last": false
                }
            }
        },
        status: 201,
    })
    async nextQuestion(@Param() nextQuestionDto: NextQuestionDto): Promise<Response> {
        const { status } = this.roomService.getRoomById(nextQuestionDto.id);

        if (![RoomStatusEnum.READY_FOR_START, RoomStatusEnum.GAME_STARTED].includes(status)) {
            throw new HttpException('You can not get question from non ready room', 400);
        }

        const question = await this.roomService.getRandNextQuestion(nextQuestionDto);

        return Response.ok(question);
    }

    @Get('/:id/questions/:questionId')
    @ApiResponse({
        schema: {
            example: {
                status: 'ok',
                response: {
                    "id": 0,
                    "questionSite": "Initial question / category 1",
                    "questionChat": "Initial question / category 1",
                    "category": "category_1",
                    "used": false
                }
            }
        },
        status: 201,
    })
    async getQuestionById(@Param() getQuestionByIdDto: GetQuestionByIdDto): Promise<Response> {
        const question = this.roomService.getRoomQuestionById(getQuestionByIdDto);

        return Response.ok(question);
    }

    @Post('/:id/end')
    async endGame(
        @Param() { id }: IdParamsDto,
        @Body() { isFrontend }: EndGameDto,
    ): Promise<Response> {
        const { status } = this.roomService.getRoomById(id);

        if (status !== RoomStatusEnum.READY_FOR_START) {
            throw new HttpException('You can not end non started game', 400);
        }

        this.roomService.resetRoom(id);

        if (isFrontend) {
            await this.corizoidService.endGame(id);
        }

        return Response.ok();
    }
}
