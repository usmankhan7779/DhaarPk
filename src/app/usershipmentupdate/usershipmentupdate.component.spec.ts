import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsershipmentupdateComponent } from './usershipmentupdate.component';

describe('UsershipmentupdateComponent', () => {
  let component: UsershipmentupdateComponent;
  let fixture: ComponentFixture<UsershipmentupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsershipmentupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsershipmentupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
