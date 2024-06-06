import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
  private apiKey  = "AIzaSyC_L958W5m-lKzjmHsBiUsg8vg0UuW78Ic";

  constructor(private http: HttpClient) {}

  generateContent(prompt: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('x-goog-api-key', this.apiKey);
    const body = {
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    };

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}
