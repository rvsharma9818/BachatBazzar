import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridViewsComponent } from './grid-views.component';

describe('GridViewsComponent', () => {
  let component: GridViewsComponent;
  let fixture: ComponentFixture<GridViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridViewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
