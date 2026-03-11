import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductList63 } from './product-list-63';

describe('ProductList63', () => {
  let component: ProductList63;
  let fixture: ComponentFixture<ProductList63>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductList63]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductList63);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
