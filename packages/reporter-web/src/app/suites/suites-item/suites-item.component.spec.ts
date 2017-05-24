import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitesItemComponent } from './suites-item.component';

xdescribe('SuitesItemComponent', () => {
  let component: SuitesItemComponent;
  let fixture: ComponentFixture<SuitesItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuitesItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuitesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
