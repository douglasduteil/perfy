import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitesListComponent } from './suites-list.component';

describe('SuitesListComponent', () => {
  let component: SuitesListComponent;
  let fixture: ComponentFixture<SuitesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuitesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuitesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
