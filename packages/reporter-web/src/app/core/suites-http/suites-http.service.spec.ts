import { inject, TestBed } from '@angular/core/testing';
import { HttpModule, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import 'rxjs/add/operator/first';

import { SUITES_API_URL } from './config';
import { SuitesHttpService } from './suites-http.service';

describe('SuitesHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        { provide: XHRBackend, useClass: MockBackend },
        //
        {provide: SUITES_API_URL, useValue: 'api_url'},
        //
        SuitesHttpService
      ]
    });
  });

  describe('#getSuites', () => {
    it('should ...', inject(
      [SuitesHttpService, XHRBackend],
      (service: SuitesHttpService, mockBackend: MockBackend) => {
        const response = new Response(new ResponseOptions({body: 'sdf'}));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

        const reponseCallback = jasmine.createSpy('reponseCallback');
        service.getSuites().first().subscribe(reponseCallback);

        expect(reponseCallback).toHaveBeenCalledWith();
      }
    ));
  });

  describe('#getSuite', () => {
    it('should return one suite', inject(
      [SuitesHttpService],
      (service: SuitesHttpService) => {

        service.getSuite('foo');

        expect(service).toBeTruthy();
      }
    ));
  });
});
