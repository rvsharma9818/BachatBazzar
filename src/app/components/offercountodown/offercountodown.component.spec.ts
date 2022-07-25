import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffercountodownComponent } from './offercountodown.component';

describe('OffercountodownComponent', () => {
  let component: OffercountodownComponent;
  let fixture: ComponentFixture<OffercountodownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffercountodownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffercountodownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
