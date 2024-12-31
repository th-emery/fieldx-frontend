import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZoomService {

  private apiUrl = 'http://localhost:3000/api/zoom'; // URL de votre API

  constructor(private http: HttpClient) { }

  // CREER UN RDV ZOOM
  createZoomMeeting(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/createZoomMeeting`, data, { headers });
  }

  // SUPPRIMER UN RDV ZOOM
  deleteZoomMeeting(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/deleteZoomMeeting`, data, { headers });
  }
}
