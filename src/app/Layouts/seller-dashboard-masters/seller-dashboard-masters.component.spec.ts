import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDashboardMastersComponent } from './seller-dashboard-masters.component';

describe('SellerDashboardMastersComponent', () => {
  let component: SellerDashboardMastersComponent;
  let fixture: ComponentFixture<SellerDashboardMastersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerDashboardMastersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerDashboardMastersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
