import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonalSlidearComponent } from './testimonal-slidear.component';

describe('TestimonalSlidearComponent', () => {
  let component: TestimonalSlidearComponent;
  let fixture: ComponentFixture<TestimonalSlidearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestimonalSlidearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonalSlidearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
