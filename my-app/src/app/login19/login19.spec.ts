import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login19 } from './login19';

describe('Login19', () => {
  let component: Login19;
  let fixture: ComponentFixture<Login19>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Login19]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Login19);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
