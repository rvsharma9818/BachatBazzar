import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommdedComponent } from './recommded.component';

describe('RecommdedComponent', () => {
  let component: RecommdedComponent;
  let fixture: ComponentFixture<RecommdedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommdedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommdedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
