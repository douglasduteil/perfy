import { inject, TestBed } from '@angular/core/testing';

import { SuitesHttpService } from './suites-http.service';

xdescribe('SuitesHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuitesHttpService]
    });
  });

  it('should ...', inject([SuitesHttpService], (service: SuitesHttpService) => {
    expect(service).toBeTruthy();
  }));
});
