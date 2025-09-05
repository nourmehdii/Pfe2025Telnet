import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnjeuHistory } from '../model/EnjeuHistory';
import { Enjeu } from '../model/Enjeu.model';

@Injectable({
  providedIn: 'root'
})
export class EnjeuxService {

  private baseUrl = 'http://localhost:8802/api/enjeux';

  constructor(private http: HttpClient) {}

  // 🔁 Nouvelle version : on peut alterner entre 'user' ou 'admin'
  private getHeaders(role: 'user' | 'admin' = 'user'): HttpHeaders {
    const tokenKey = role === 'admin' ? 'admin_token' : 'token';
    const token = localStorage.getItem(tokenKey);

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // 🌐 Liste des enjeux (user ou admin)
  getEnjeuxList(role: 'user' | 'admin' = 'user'): Observable<Enjeu[]> {
    const headers = this.getHeaders(role);
    return this.http.get<Enjeu[]>(this.baseUrl, { headers });
  }

  // ➕ Ajouter un enjeu
  addEnjeu(enjeu: Enjeu, role: 'user' | 'admin' = 'user'): Observable<Enjeu> {
    const headers = this.getHeaders(role);
    return this.http.post<Enjeu>(`${this.baseUrl}/add`, enjeu, { headers });
  }

  // 🔄 Modifier un enjeu avec commentaire
  updateEnjeu(id: number, enjeu: Enjeu, commentaire: string, role: 'user' | 'admin' = 'user'): Observable<Enjeu> {
  const headers = this.getHeaders(role);
  const requestBody = { enjeu, commentaire }; // ✅ le payload doit avoir l’id inclus
  return this.http.put<Enjeu>(`${this.baseUrl}/${id}`, requestBody, { headers });
}


  // 🗑️ Supprimer un enjeu
  deleteEnjeu(id: number, role: 'user' | 'admin' = 'user'): Observable<void> {
    const headers = this.getHeaders(role);
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers });
  }

  // 🔍 Récupérer un enjeu par ID
  getEnjeuById(id: number, role: 'user' | 'admin' = 'user'): Observable<Enjeu> {
    const headers = this.getHeaders(role);
    return this.http.get<Enjeu>(`${this.baseUrl}/${id}`, { headers });
  }

  // 📜 Récupérer l'historique d'un enjeu
  getHistoryByEnjeuId(enjeuId: number, role: 'user' | 'admin' = 'user'): Observable<EnjeuHistory[]> {
    const headers = this.getHeaders(role);
    return this.http.get<EnjeuHistory[]>(`${this.baseUrl}/${enjeuId}/history`, { headers });
  }
}
