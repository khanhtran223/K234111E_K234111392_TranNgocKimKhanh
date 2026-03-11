import { TestBed } from '@angular/core/testing';

import { AuthenticationLogin } from './authentication-login';

describe('AuthenticationLogin', () => {
  let service: AuthenticationLogin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationLogin);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
