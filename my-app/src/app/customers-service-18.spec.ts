import { TestBed } from '@angular/core/testing';

import { CustomersService18 } from './customers-service-18';

describe('CustomersService18', () => {
  let service: CustomersService18;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomersService18);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
