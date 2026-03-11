import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionEdit58 } from './fashion-edit58';

describe('FashionEdit58', () => {
  let component: FashionEdit58;
  let fixture: ComponentFixture<FashionEdit58>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FashionEdit58]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FashionEdit58);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
