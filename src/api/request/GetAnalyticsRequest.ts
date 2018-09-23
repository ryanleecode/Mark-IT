import * as Express from 'express';
import { IncomingHttpHeaders } from 'http';

export default interface GetAnalyticsRequest extends Express.Request {
  headers: IncomingHttpHeaders & {
    lat: number;
    lng: number;
  };
}
