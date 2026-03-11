import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnDirective } from './learn-directive';

describe('LearnDirective', () => {
  let component: LearnDirective;
  let fixture: ComponentFixture<LearnDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnDirective]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnDirective);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
