import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionDetail58 } from './fashion-detail58';

describe('FashionDetail58', () => {
  let component: FashionDetail58;
  let fixture: ComponentFixture<FashionDetail58>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FashionDetail58]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FashionDetail58);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
