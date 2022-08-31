import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaileproductComponent } from './detaileproduct.component';

describe('DetaileproductComponent', () => {
  let component: DetaileproductComponent;
  let fixture: ComponentFixture<DetaileproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetaileproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaileproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
