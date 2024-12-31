import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-calendar-modal',
    standalone: false,
    templateUrl: './calendar-modal.component.html',
    styleUrl: './calendar-modal.component.scss'
})
export class CalendarModalComponent {
    form: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<CalendarModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, // Injecte les données de la modale (optionnel)
        private fb: FormBuilder // Service FormBuilder pour créer le formulaire
    ) {
        // Création du formulaire avec un objet contenant des champs
        this.form = this.fb.group({
            topic: [data?.topic || '', Validators.required]
        });
    }

    closeModal() {
        if (this.form.valid) {
            this.dialogRef.close(this.form.value); // Retourne les données du formulaire
        } else {
            alert('Formulaire invalide');
        }
    }
}
