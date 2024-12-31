// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from "./calendar/calendar.component";

// Définition des routes
const routes: Routes = [
    { path: '', component: CalendarComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)], // Importer et configurer le module de routage
    exports: [RouterModule] // Exporter RouterModule pour être utilisé dans le module principal
})
export class AppRoutingModule { }

