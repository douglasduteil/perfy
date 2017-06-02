import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

import { SUITES_API_URL } from './config';
import { ISuiteResponse } from './interfaces';

@Injectable()
export class SuitesHttpService {
  constructor(
    @Inject(SUITES_API_URL)
    private apiUrl: string,
    private http: Http
  ) {}

  getSuites() {
    return this.http.get(`${this.apiUrl}/suites.json`)
      .map((res) => res.json() as ISuiteResponse[]);
  }

  getSuite(id: string) {
    return this.http.get(`${this.apiUrl}/suites/${id}.json`)
      .map((res) => res.json() as ISuiteResponse);
  }
}
