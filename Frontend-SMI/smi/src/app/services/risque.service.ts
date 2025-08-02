import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RisqueService {

  private baseUrl = 'http://localhost:8802/api/risques';

  constructor(private http: HttpClient) {}

  // 🔁 Headers dynamiques avec rôle
  private getHeaders(role: 'user' | 'admin' = 'user'): HttpHeaders {
    const tokenKey = role === 'admin' ? 'admin_token' : 'token';
    const token = localStorage.getItem(tokenKey);

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // 🌐 Liste des risques
  getRisques(role: 'user' | 'admin' = 'user'): Observable<any[]> {
    const headers = this.getHeaders(role);
    return this.http.get<any[]>(this.baseUrl, { headers });
  }

  // ➕ Ajouter un risque
  addRisque(risque: any, role: 'user' | 'admin' = 'user'): Observable<any> {
    const headers = this.getHeaders(role);
    return this.http.post<any>(this.baseUrl, risque, { headers });
  }

  // 🗑️ Supprimer un risque
  deleteRisque(id: number, role: 'user' | 'admin' = 'user'): Observable<void> {
    const headers = this.getHeaders(role);
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers });
  }

  // 🔍 Récupérer un risque par ID
  getRisqueById(id: number, role: 'user' | 'admin' = 'user'): Observable<any> {
    const headers = this.getHeaders(role);
    return this.http.get<any>(`${this.baseUrl}/${id}`, { headers });
  }
}
