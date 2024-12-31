import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarModalViewComponent } from './calendar-modal-view.component';

describe('CalendarModalViewComponent', () => {
  let component: CalendarModalViewComponent;
  let fixture: ComponentFixture<CalendarModalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarModalViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarModalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
