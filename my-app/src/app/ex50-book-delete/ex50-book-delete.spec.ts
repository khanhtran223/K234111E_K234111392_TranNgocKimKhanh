import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex50BookDelete } from './ex50-book-delete';

describe('Ex50BookDelete', () => {
  let component: Ex50BookDelete;
  let fixture: ComponentFixture<Ex50BookDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex50BookDelete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex50BookDelete);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
