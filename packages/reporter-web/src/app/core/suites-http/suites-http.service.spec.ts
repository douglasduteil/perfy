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

  afterEach(inject([XHRBackend], (mockBackend: MockBackend) => {
    mockBackend.verifyNoPendingRequests();
  }));

  describe('#getSuites', () => {
    it('should return an array of suites', inject(
      [SuitesHttpService, XHRBackend],
      (service: SuitesHttpService, mockBackend: MockBackend) => {
        const mockResponse = [{foo: 'bar'}];
        const response = new Response(new ResponseOptions({body: JSON.stringify(mockResponse)}));
        mockBackend.connections
        .subscribe((c: MockConnection) => {
          expect(c.request.url).toEqual('api_url/suites.json');
          c.mockRespond(response);
        });

        const reponseCallback = jasmine.createSpy('reponseCallback');
        service.getSuites().first().subscribe(reponseCallback);

        expect(reponseCallback).toHaveBeenCalledWith(mockResponse);
      }
    ));
  });

  describe('#getSuite', () => {
    it('should return the suite foo', inject(
      [SuitesHttpService, XHRBackend],
      (service: SuitesHttpService, mockBackend: MockBackend) => {
        const mockResponse = {foo: 'bar'};
        const response = new Response(new ResponseOptions({body: JSON.stringify(mockResponse)}));
        mockBackend.connections
        .subscribe((c: MockConnection) => {
          expect(c.request.url).toEqual('api_url/suites/foo.json');
          c.mockRespond(response);
        });

        const reponseCallback = jasmine.createSpy('reponseCallback');
        service.getSuite('foo').first().subscribe(reponseCallback);

        expect(reponseCallback).toHaveBeenCalledWith(mockResponse);
      }
    ));
  });
});
