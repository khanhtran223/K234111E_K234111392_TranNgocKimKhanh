import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProductImageDetails } from './service-product-image-details';

describe('ServiceProductImageDetails', () => {
  let component: ServiceProductImageDetails;
  let fixture: ComponentFixture<ServiceProductImageDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceProductImageDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceProductImageDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
