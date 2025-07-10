import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnjeuxService {

  private baseUrl = 'http://localhost:8802/api/enjeux';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // ou 'access_token', selon ton backend
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getEnjeuxList(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(this.baseUrl, { headers });
  }


  addEnjeu(enjeu: any): Observable<any> {
  const headers = this.getHeaders();
  return this.http.post(`${this.baseUrl}`, enjeu, { headers });
}

}
