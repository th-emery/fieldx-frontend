import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-calendar-modal-view',
    standalone: false,
    templateUrl: './calendar-modal-view.component.html',
    styleUrl: './calendar-modal-view.component.scss'
})
export class CalendarModalViewComponent {
    constructor(
        public dialogRef: MatDialogRef<CalendarModalViewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    closeModal() {
        this.dialogRef.close(this.data.event.extendedProps.zoomId);
    }
}
