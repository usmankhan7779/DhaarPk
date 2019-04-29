import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreAllDetailsComponent } from './store-all-details.component';

describe('StoreAllDetailsComponent', () => {
  let component: StoreAllDetailsComponent;
  let fixture: ComponentFixture<StoreAllDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreAllDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreAllDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
