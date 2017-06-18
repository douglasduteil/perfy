import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SuitesHttpService } from 'app/core/suites-http/suites-http.service';

import { of } from 'rxjs/observable/of';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  const MockSuitesHttpService: jasmine.SpyObj<SuitesHttpService> = jasmine
    .createSpyObj('MockSuitesHttpService', [
      'getSuites'
    ]
  );
  MockSuitesHttpService.getSuites.and.returnValue(of({
    foo: {name: 'Foo'},
    bar: {name: 'Bar'}
  }));

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        NoopTestComponent,

        HomeComponent
      ],
      imports: [RouterTestingModule.withRoutes([
        { path: 'board/:id', component: NoopTestComponent }
      ])],
      providers: [
        { provide: SuitesHttpService, useValue: MockSuitesHttpService}
      ]
    })
    .compileComponents();
  }));

  it('should be created', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should list the suite links', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.suiteNames).toEqual(['foo', 'bar']);
    const el: HTMLElement = fixture.debugElement.nativeElement;
    const linkEls = Array.from(el.querySelectorAll('[href]'));
    const links = linkEls.map((e) => e.getAttribute('href'));
    expect(links).toEqual([
      '/suite/foo',
      '/suite/bar'
    ]);
  });
});

@Component({selector: 'perfy-noop', template: ''})
class NoopTestComponent {}
