import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatter',
  standalone: false
})
export class DateFormatterPipe implements PipeTransform {

  transform(value: string | Date): string {
    if (!value) return '';

    const date = new Date(value);
    const day = ('0' + date.getDate()).slice(-2); // Ajouter un zéro devant si nécessaire
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Les mois commencent à partir de 0
    const year = date.getFullYear();
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    // Retourner la date formatée comme "31/12/2024 à 05:00"
    return `${day}/${month}/${year} à ${hours}:${minutes}`;
  }
}

