import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Listproduct19 } from './listproduct19';

describe('Listproduct19', () => {
  let component: Listproduct19;
  let fixture: ComponentFixture<Listproduct19>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Listproduct19]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Listproduct19);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
