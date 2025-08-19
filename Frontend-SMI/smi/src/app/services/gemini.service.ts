import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{ text: string }>;
    };
  }>;
}

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private baseUrl = 'http://localhost:8802/api/enjeux/ask';

  constructor(private http: HttpClient) {}

  askGemini(message: string): Observable<string> {
    return this.http.post<GeminiResponse>(this.baseUrl, { message }).pipe(
      map(response => response.candidates[0].content.parts[0].text)
    );
  }
}
