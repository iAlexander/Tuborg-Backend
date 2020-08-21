import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const RoleDecorator = (...args: string[]):CustomDecorator => SetMetadata('roles', args);
