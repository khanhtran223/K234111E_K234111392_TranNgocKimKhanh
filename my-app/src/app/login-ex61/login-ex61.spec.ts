import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEx61 } from './login-ex61';

describe('LoginEx61', () => {
  let component: LoginEx61;
  let fixture: ComponentFixture<LoginEx61>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginEx61]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginEx61);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
