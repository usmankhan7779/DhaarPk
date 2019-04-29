import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerReceiveOrderComponent } from './seller-receive-order.component';

describe('SellerReceiveOrderComponent', () => {
  let component: SellerReceiveOrderComponent;
  let fixture: ComponentFixture<SellerReceiveOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerReceiveOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerReceiveOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
