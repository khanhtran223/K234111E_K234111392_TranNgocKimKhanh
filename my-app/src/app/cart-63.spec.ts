import { TestBed } from '@angular/core/testing';

import { Cart63 } from './cart-63';

describe('Cart63', () => {
  let service: Cart63;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cart63);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
