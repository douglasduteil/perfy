import { IPerfySuite } from '@perfyjs/types';

export type ISuiteResponse = IPerfySuite;
export interface ISuiteNameResponse {
  [id: string]: {name: string};
}
