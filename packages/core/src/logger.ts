
import { injectable } from 'inversify';

const noop = Function.prototype;

export const silentLog = {
  error: noop,
  warn: noop,
  info: noop,
  verbose: noop,
  silly: noop,
  http: noop,
  pause: noop,
  resume: noop
};

@injectable()
export abstract class Logger {
  abstract error(prefix: string | boolean, ...message: any[]): void;
  abstract warn(prefix: string | boolean, ...message: any[]): void;
  abstract info(prefix: string | boolean, ...message: any[]): void;
  abstract verbose(prefix: string | boolean, ...message: any[]): void;
  abstract silly(prefix: string | boolean, ...message: any[]): void;
  abstract http(prefix: string | boolean, ...message: any[]): void;
  abstract pause(prefix: string | boolean, ...message: any[]): void;
  abstract resume(prefix: string | boolean, ...message: any[]): void;
  abstract newItem(name: string): Logger;
}

@injectable()
// tslint:disable-next-line:max-classes-per-file
export class SilentLogger extends Logger {
  error(): void { }
  warn(): void { }
  info(): void { }
  verbose(): void { }
  silly(): void { }
  http(): void { }
  pause(): void { }
  resume(): void { }
  newItem(): Logger { return this; }
}
