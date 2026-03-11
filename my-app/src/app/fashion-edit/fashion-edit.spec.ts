import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FashionEditComponent } from './fashion-edit';


describe('FashionEdit', () => {
  let component: FashionEditComponent;
  let fixture: ComponentFixture<FashionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FashionEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FashionEditComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
