import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FildUpload } from './fild-upload';

describe('FildUpload', () => {
  let component: FildUpload;
  let fixture: ComponentFixture<FildUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FildUpload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FildUpload);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
