import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';  // Importer le module principal où CalendarComponent est déclaré
import { CalendarComponent } from './calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],  // Importer le module qui déclare CalendarComponent
    })
        .compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
