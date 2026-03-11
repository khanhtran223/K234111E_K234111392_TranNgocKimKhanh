import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCustomer3 } from './list-customer3';

describe('ListCustomer3', () => {
  let component: ListCustomer3;
  let fixture: ComponentFixture<ListCustomer3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListCustomer3]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCustomer3);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
