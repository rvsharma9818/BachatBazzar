import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoumaylikeusComponent } from './youmaylikeus.component';

describe('YoumaylikeusComponent', () => {
  let component: YoumaylikeusComponent;
  let fixture: ComponentFixture<YoumaylikeusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoumaylikeusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YoumaylikeusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
