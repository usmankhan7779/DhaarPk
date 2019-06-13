import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerOnDhaarComponent } from './seller-on-dhaar.component';

describe('SellerOnDhaarComponent', () => {
  let component: SellerOnDhaarComponent;
  let fixture: ComponentFixture<SellerOnDhaarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerOnDhaarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerOnDhaarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
