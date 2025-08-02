import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpportuniteService {

  private baseUrl = 'http://localhost:8802/api/opportunites';

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

  // 🌐 Liste des opportunités
  getOpportunites(role: 'user' | 'admin' = 'user'): Observable<any[]> {
    const headers = this.getHeaders(role);
    return this.http.get<any[]>(this.baseUrl, { headers });
  }

  // ➕ Ajouter une opportunité
  addOpportunite(opportunite: any, role: 'user' | 'admin' = 'user'): Observable<any> {
    const headers = this.getHeaders(role);
    return this.http.post<any>(this.baseUrl, opportunite, { headers });
  }

  // 🗑️ Supprimer une opportunité
  deleteOpportunite(id: number, role: 'user' | 'admin' = 'user'): Observable<void> {
    const headers = this.getHeaders(role);
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers });
  }

  // 🔍 Récupérer une opportunité par ID
  getOpportuniteById(id: number, role: 'user' | 'admin' = 'user'): Observable<any> {
    const headers = this.getHeaders(role);
    return this.http.get<any>(`${this.baseUrl}/${id}`, { headers });
  }
}
