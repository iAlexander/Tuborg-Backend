import {Body, Controller, Get, HttpException, Param, Post} from '@nestjs/common';
import { WithCode } from './dto/with-code.dto';
import { ApiTags} from '@nestjs/swagger';
import {PromoCodeService} from './promo-code.service';
import {Response} from '../types';
import {RoleDecorator} from "../core/decorators/roles.decorator";
import {Roles, RolesTokens} from "../core/config";

@ApiTags('Promo code')
@Controller('promo-code')
export class PromoCodeController {
  constructor(
    private promoCodeService: PromoCodeService,
  ) {}

  @RoleDecorator(Roles.corizoid)
  @Get('/generate')
  async generate(): Promise<Response> {
    const code = await this.promoCodeService.generate();
    return Response.ok(code);
  }

  @RoleDecorator(Roles.front)
  @Post('/use')
  async use(@Body() { code }: WithCode): Promise<Response> {
    await this.promoCodeService.use(code);
    return Response.ok();
  }
}
