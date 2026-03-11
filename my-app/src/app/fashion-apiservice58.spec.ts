import { TestBed } from '@angular/core/testing';

import { FashionAPIService58 } from './fashion-apiservice58';

describe('FashionAPIService58', () => {
  let service: FashionAPIService58;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FashionAPIService58);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
