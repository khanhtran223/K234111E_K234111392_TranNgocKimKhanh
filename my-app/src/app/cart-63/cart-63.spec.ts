import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cart63 } from './cart-63';

describe('Cart63', () => {
  let component: Cart63;
  let fixture: ComponentFixture<Cart63>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Cart63]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cart63);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
