import { TestBed } from '@angular/core/testing';

import { Ex50MyService } from './ex50-my-service';

describe('Ex50MyService', () => {
  let service: Ex50MyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ex50MyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
