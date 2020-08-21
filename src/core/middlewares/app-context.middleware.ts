import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';

interface AppContextPayload {
  id: string;
  email: string;
  role: string;
}

interface AppContext {
  account?: AppContextPayload;
}

export interface RequestWithAppContext extends Request {
  appContext: AppContext;
}

@Injectable()
export class AppContextMiddleware implements NestMiddleware {
  use(req: RequestWithAppContext, res: Response, next: Function) {
    req.appContext = req.appContext || {};
    next();
  };
}
