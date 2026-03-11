import { TestBed } from '@angular/core/testing';

import { Ex50Bookapi } from './ex50-bookapi';

describe('Ex50Bookapi', () => {
  let service: Ex50Bookapi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ex50Bookapi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
