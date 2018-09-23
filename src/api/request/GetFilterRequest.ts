import * as Express from 'express';
import { IncomingHttpHeaders } from 'http';

export default interface GetFilterRequest extends Express.Request {
  headers: IncomingHttpHeaders & {
    age: number;
  };
}
