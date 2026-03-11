import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex50BookDetails } from './ex50-book-details';

describe('Ex50BookDetails', () => {
  let component: Ex50BookDetails;
  let fixture: ComponentFixture<Ex50BookDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex50BookDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex50BookDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
