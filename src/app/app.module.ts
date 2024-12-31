import { NgModule } from '@angular/core';
// MODULES
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
// COMPONENTS
import { AppComponent } from './app.component';
import { CalendarComponent } from "./calendar/calendar.component";
import { CalendarModalComponent } from "./calendar-modal/calendar-modal.component";
import { CalendarModalViewComponent } from "./calendar-modal-view/calendar-modal-view.component";
// FULLCALENDAR
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// MATERIAL
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
// PIPES
import { DateFormatterPipe } from './calendar-modal/date-formatter.pipe'; // Importer le pipe


@NgModule({
    declarations: [
        AppComponent,
        CalendarComponent,
        CalendarModalComponent,
        CalendarModalViewComponent,
        DateFormatterPipe
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FullCalendarModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule
    ],
    providers: [
    provideAnimationsAsync()
  ],
    bootstrap: [AppComponent]  // Spécifiez le composant de démarrage
})
export class AppModule {
    calendarOptions: CalendarOptions = {
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin]
    };
}