import { TestBed, inject } from '@angular/core/testing';

import { StoredetailsService } from './storedetails.service';

describe('StoredetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoredetailsService]
    });
  });

  it('should be created', inject([StoredetailsService], (service: StoredetailsService) => {
    expect(service).toBeTruthy();
  }));
});
