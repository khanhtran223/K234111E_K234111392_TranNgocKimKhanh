import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex50NewBook } from './ex50-new-book';

describe('Ex50NewBook', () => {
  let component: Ex50NewBook;
  let fixture: ComponentFixture<Ex50NewBook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex50NewBook]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex50NewBook);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
