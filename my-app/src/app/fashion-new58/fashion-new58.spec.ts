import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionNew58 } from './fashion-new58';

describe('FashionNew58', () => {
  let component: FashionNew58;
  let fixture: ComponentFixture<FashionNew58>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FashionNew58]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FashionNew58);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
