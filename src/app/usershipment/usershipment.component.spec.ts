import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsershipmentComponent } from './usershipment.component';

describe('UsershipmentComponent', () => {
  let component: UsershipmentComponent;
  let fixture: ComponentFixture<UsershipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsershipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsershipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
