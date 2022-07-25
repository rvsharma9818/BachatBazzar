import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidearComponent } from './slidear.component';

describe('SlidearComponent', () => {
  let component: SlidearComponent;
  let fixture: ComponentFixture<SlidearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlidearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
