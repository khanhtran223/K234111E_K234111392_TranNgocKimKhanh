import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionClient58 } from './fashion-client58';

describe('FashionClient58', () => {
  let component: FashionClient58;
  let fixture: ComponentFixture<FashionClient58>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FashionClient58]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FashionClient58);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
