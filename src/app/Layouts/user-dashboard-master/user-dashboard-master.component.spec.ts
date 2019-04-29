import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardMasterComponent } from './user-dashboard-master.component';

describe('UserDashboardMasterComponent', () => {
  let component: UserDashboardMasterComponent;
  let fixture: ComponentFixture<UserDashboardMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashboardMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
