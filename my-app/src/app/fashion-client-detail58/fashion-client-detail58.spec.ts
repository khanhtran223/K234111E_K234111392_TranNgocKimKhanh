import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionClientDetail58 } from './fashion-client-detail58';

describe('FashionClientDetail58', () => {
  let component: FashionClientDetail58;
  let fixture: ComponentFixture<FashionClientDetail58>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FashionClientDetail58]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FashionClientDetail58);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
