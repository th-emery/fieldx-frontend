import {Component, signal, ChangeDetectorRef} from '@angular/core';
// FULLCALENDAR
import {CalendarOptions, DateSelectArg, EventClickArg, EventDropArg, EventApi} from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
// MATERIAL
import { MatDialog } from '@angular/material/dialog';
import { CalendarModalComponent } from '../calendar-modal/calendar-modal.component';
import { CalendarModalViewComponent } from "../calendar-modal-view/calendar-modal-view.component";
// SERVICES
import { ZoomService } from './zoom.service';

@Component({
    selector: 'app-calendar',
    standalone: false,
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
    calendarOptions = signal<CalendarOptions>({
        initialView: 'timeGridWeek',
        plugins: [timeGridPlugin, interactionPlugin],
        headerToolbar: {
            left: 'prev,next',
            center: 'title',
            right: 'timeGridWeek,timeGridDay' // user can switch between the two
        },
        initialEvents: [], // alternatively, use the `events` setting to fetch from a feed
        weekends: true,
        editable: false,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        validRange: {
            start: new Date().toISOString().split('T')[0], // AUJOURD'HUI
        },
        select: this.handleDateSelect.bind(this),
        eventClick: this.handleEventClick.bind(this),
        eventsSet: this.handleEvents.bind(this),
        eventDrop: this.handleEventDrop.bind(this)
    });

    currentEvents = signal<EventApi[]>([]);

    constructor(
        private changeDetector: ChangeDetectorRef,
        private dialog: MatDialog,
        private zoomService: ZoomService
    ) {}

    handleDateSelect(selectInfo: DateSelectArg) {
        const calendarApi = selectInfo.view.calendar;
        // SUPPRIMER LA SELECTION DE L'EVENT
        calendarApi.unselect();
        // VERIFICATION SI EVENT DANS LE PASSE
        if (selectInfo.start < new Date()) {
            alert('Vous ne pouvez pas cliquer dans le passé.');
        }
        else {
            const dialogRef = this.dialog.open(CalendarModalComponent, {
                data: {start: selectInfo.startStr, end: selectInfo.endStr}
            });
            // SOUSCRIRE A LA FERMETURE DE LA MODALE
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    const meetingData = {
                        topic: result.topic,
                        start_time: selectInfo.startStr,
                        duration: 30 // A AMELIORER POUR QUE CE SOIT DYNAMIQUE
                    };
                    this.zoomService.createZoomMeeting(meetingData).subscribe({
                        next: (response) => {
                            console.log('Meeting Zoom créé avec succès:', response);
                            // AFFICHER L'EVENT
                            calendarApi.addEvent({
                                id: Date.now().toString(),
                                title: result.topic,
                                start: selectInfo.startStr,
                                end: selectInfo.endStr,
                                allDay: selectInfo.allDay,
                                extendedProps: {
                                    zoomId: response.data.id,
                                    zoomStartUrl: response.data.start_url,
                                    zoomPwd: response.data.password
                                }
                            });
                        },
                        error: (error) => {
                            console.error('Erreur lors de la création du Meeting Zoom:', error);
                        }
                    });

                } else {
                    console.log('Aucune donnée retournée');
                }
            });
        }
    }

    handleEventClick(clickInfo: EventClickArg) {
        const event = clickInfo.event;
        const dialogRef = this.dialog.open(CalendarModalViewComponent, {
            data: { event }
        });
        // SOUSCRIRE A LA FERMETURE DE LA MODALE
        dialogRef.afterClosed().subscribe(response => {
            if (response) {
                const meetingData = {
                    zoomId: response
                }
                // SUPPRESSION DU MEETING ZOOM
                this.zoomService.deleteZoomMeeting(meetingData).subscribe({
                    next: (response) => {
                        console.log('Meeting Zoom supprimé avec succès:', response);
                        // SUPPRIMER L'EVENT SI IL EXISTE
                        if (event) {
                            event.remove();
                            console.log('Event supprimé');
                        } else {
                            console.log('Event non trouvé');
                        }
                    },
                    error: (error) => {
                        console.error('Erreur lors de la suppression du rendez-vous Zoom:', error);
                    }
                });
            }
        });
    }

    handleEventDrop(dropInfo: EventDropArg) {
        alert(JSON.stringify(dropInfo.event));
    }

    handleEvents(events: EventApi[]) {
        this.currentEvents.set(events);
        this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
    }
}
