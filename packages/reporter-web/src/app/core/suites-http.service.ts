import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SuitesHttpService {
  constructor(private http: Http) {}

  getSuites(): Promise<any[]> {
    return this.http.get('/api/suites')
      .toPromise()
      .then((body) => body.json())
  }

  getSuite(id: string): Promise<any> {
    return this.http.get(`/api/suites/${id}`)
      .toPromise()
      .then((body) => body.json())
  }
}
