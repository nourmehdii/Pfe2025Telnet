import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { User } from '../model/user.model'; 
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Activity } from '../model/activities.mosel';
import { Role } from '../model/Role.model';
import { Processus } from '../model/Processus.model';
import { Kpi } from '../model/Kpi.model';
import { Volet } from '../model/Volet.model';
import { Category } from '../model/Category.model';
import { Client } from '../model/Client.model';
import { Cadran } from '../model/cadran.model';
import { Project } from '../model/Project.model';
import { KpiHistory } from '../model/KpiHistory.model';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Pip } from '../model/Pip.model';
import { ResultsPip } from '../model/ResultsPip.model';
import { Analyse } from '../model/analyse.model';
import { Cause } from '../model/Cause.model';
import { Action } from '../model/Action.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  helper=new JwtHelperService();
  apiUrl = "http://localhost:8763";
//  private logoutUrl = 'http://localhost:8082/logout';

  constructor(private http: HttpClient) {}

  authenticate(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth-service/login`, user)
      .pipe(
        map(response => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
  
            // On stocke aussi l'utilisateur complet pour les composants
            const currentUser = {
              token: response.token,
              role: response.role,
              firstName: response.firstName,
              lastName: response.lastName,
              email: response.email,
              userId: response.userId,
              username: response.username, // peut être null
              activities: response.activities || [] // par sécurité
            };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
          }
          return response;
        }),
        catchError(this.handleError)
      );
  }
  
  
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  
  isLoggedIn(){

    let token = localStorage.getItem("token");

    if (token) {
      return true ;
    } else {
      return false;
    }
  
  }

  // getActivityList(): Observable<Activity[]> {
  //   return this.http.get<Activity[]>(`${this.apiUrl}/list`);
  // }
  // logout(): Observable<any> {
  //   return this.http.delete<any>(this.logoutUrl);
  // }


  getUserList(): Observable<User[]> {
    const headers = this.getHeaders();
    return this.http.get<User[]>(`${this.apiUrl}/auth-service/list`, { headers });

  }
  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth-service/register`, user);
  }
  
  getActivities(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/projet-service/activities`, { headers });
  }
  
  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/auth-service/roles`);
  }

 
  deleteActivity(activityId: number): Observable<string> {
    const url = `${this.apiUrl}/projet-service/activity/${activityId}`;
    const headers = this.getHeaders();
  
    return this.http.delete<any>(url, { headers, responseType: 'text' as 'json' });
  }
  
  deleteUser(userId: number): Observable<any> {
    const token = localStorage.getItem("token");
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/auth-service/${userId}`, { headers, responseType: 'text' });
  }

  getRoleByUserId(userId: number): Observable<Role> {
    const headers = this.getHeaders();
    return this.http.get<Role>(`${this.apiUrl}/auth-service/${userId}/role`, { headers });
  }
  
  getUserActivities(userId: number): Observable<Activity[]> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/projet-service/activity/${userId}`;
    return this.http.get<Activity[]>(url, { headers });
  }
  
  getActivitiesByUserId(userId: number): Observable<Activity[]> {
    const headers = this.getHeaders();
    return this.http.get<Activity[]>(`${this.apiUrl}/projet-service/user/activity/${userId}`, { headers });
  }

  createProcessuss(processus: Processus): Observable<Processus> {
    const token = localStorage.getItem('token');
    const headers = this.getHeaders();
    return this.http.post<Processus>(`${this.apiUrl}/projet-service/api/processus/addp`, processus, { headers });
  }
  
  // createProcessus(processus: Processus): Observable<Processus> {
  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  //   return this.http.post<Processus>(`${this.apiUrl}/add`, processus, { headers });
  // }



  getProcessusList(): Observable<Processus[]> {
    const headers = this.getHeaders();
    return this.http.get<Processus[]>(`${this.apiUrl}/projet-service/api/processus/list`, { headers });
  }

  createActivity(activity: Activity): Observable<Activity> {
    const headers = this.getHeaders();
    return this.http.post<Activity>(`${this.apiUrl}/projet-service/add`, activity, { headers });
  }
  

  updateUser(userId: number, user: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/auth-service/users/${userId}`, user, { headers }); // Ajout des en-têtes
  }

   // Méthode pour récupérer un utilisateur par son ID
   getUserById(userId: number): Observable<User> {
    const headers = this.getHeaders();
    
    // Envoyer la requête GET pour récupérer l'utilisateur par son ID
    return this.http.get<User>(`${this.apiUrl}/auth-service/users/${userId}`, { headers });
  }

  updateActivity(activityId: number, activityDetails: Activity): Observable<Activity> {
    // Récupération du token depuis le localStorage
    const headers = this.getHeaders();

    // URL de l'API
    const url = `${this.apiUrl}/projet-service/updateactivity/${activityId}`;

    // Envoi de la requête PUT avec les headers et le corps de la requête
    return this.http.put<Activity>(url, activityDetails, { headers });
  }
  getActivityById(id: number): Observable<Activity> {
    const headers = this.getHeaders();
    return this.http.get<Activity>(`${this.apiUrl}/projet-service/activity/${id}`, { headers });
  }
  
  getKpiList(): Observable<Kpi[]> {
    // Récupération du token depuis le localStorage
    const headers = this.getHeaders();

    // Ajout des en-têtes à la requête GET
    return this.http.get<Kpi[]>(`${this.apiUrl}/projet-service/api/kpi/list`, { headers });
  }

  deleteProcessus(processusId: number): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/projet-service/api/processus/processus/${processusId}`;
    return this.http.delete<any>(url, { headers });
}

updateProcessus(processusId: number, updatedProcessus: Processus): Observable<Processus> {
  const headers = this.getHeaders();
  const url = `${this.apiUrl}/projet-service/api/processus/update/${processusId}`; // URL de l'API pour la mise à jour du processus
  return this.http.put<Processus>(url, updatedProcessus, { headers }); // Envoi de la requête PUT avec les en-têtes
}


getProcessusById(processusId: number): Observable<Processus> {
  const headers = this.getHeaders();
  return this.http.get<Processus>(`${this.apiUrl}/projet-service/api/processus/processus/${processusId}`, { headers });
}

createVolet(volet: Volet): Observable<Volet> {
  const headers = this.getHeaders();
  const url = `${this.apiUrl}/volet-service/api/volet/add`; // URL de l'API pour ajouter un volet
  return this.http.post<Volet>(url, volet, { headers });
}

getVoletList(): Observable<Volet[]> {
  const headers = this.getHeaders();
  //const url = `${this.apiUrl}/volet-service/api/volet/list`; // URL de l'API pour récupérer la liste des volets
  //return this.http.get<Volet[]>(url, { headers });
  return this.http.get<Volet[]>('http://localhost:8800/api/volet/list', { headers });
}

deleteVolet(voletId: number): Observable<any> {
  const url = `${this.apiUrl}/volet-service/api/volet/${voletId}`;
  const headers = this.getHeaders();

  return this.http.delete<any>(url, { headers });
}
  
updateVolet(voletId: number, voletDetails: Volet): Observable<Volet> {
  const url = `${this.apiUrl}/volet-service/api/volet/${voletId}`;
  const token = localStorage.getItem('token');
  const headers = this.getHeaders();

  return this.http.put<Volet>(url, voletDetails, { headers });
}

getVoletById(voletId: number): Observable<Volet> {
  // Récupération du token depuis le localStorage
  const token = localStorage.getItem('token');
  
  // Définition des en-têtes avec le token d'authentification
  const headers = this.getHeaders();

  // URL de l'API pour récupérer un volet par son ID
  const url = `${this.apiUrl}/volet-service/api/volet/${voletId}`;

  // Envoi de la requête GET avec les en-têtes
  return this.http.get<Volet>(url, { headers });
}

getCategoryList(): Observable<Category[]> {
  const headers = this.getHeaders();
  return this.http.get<Category[]>(`${this.apiUrl}/pip-service/api/category/list`, { headers });
}

getCategoryById(id: number): Observable<Category> {
  const headers = this.getHeaders();
  return this.http.get<Category>(`${this.apiUrl}/pip-service/api/category/${id}`, { headers });
}
createCategory(category: Category): Observable<Category> {
  const headers = this.getHeaders();
  return this.http.post<Category>(`${this.apiUrl}/pip-service/api/category/add`, category, { headers });
}

updateCategory(categoryId: number, categoryDetails: Category): Observable<Category> {
  const headers = this.getHeaders();
  return this.http.put<Category>(`${this.apiUrl}/pip-service/api/category/${categoryId}`, categoryDetails, { headers });
}

deleteCategory(categoryId: number): Observable<any> {
  const headers = this.getHeaders();
  return this.http.delete<any>(`${this.apiUrl}/pip-service/api/category/${categoryId}`, { headers });
}

getAllClients(): Observable<Client[]> {
  const headers = this.getHeaders();
  return this.http.get<Client[]>(`${this.apiUrl}/projet-service/clients/allclients`, { headers });
}

getClientById(id: number): Observable<Client> {
  const headers = this.getHeaders();
  return this.http.get<Client>(`${this.apiUrl}/projet-service/Client/getby/${id}`, { headers });
}

addClient(client: Client): Observable<Client> {
  const headers = this.getHeaders();

  return this.http.post<Client>(`${this.apiUrl}/projet-service/clients/addclient`, client, { headers });
}

deleteClient(id: number): Observable<void> {
  const headers = this.getHeaders();
  
  const url = `${this.apiUrl}/projet-service/clients/delete/${id}`;
  return this.http.delete<void>(url, { headers });
}

updateClient(id: number, updatedClient: Client): Observable<Client> {
  const headers = this.getHeaders();

  // Envoyez la requête HTTP PUT avec le token Bearer dans les en-têtes
  const url = `${this.apiUrl}/projet-service/clients/${id}`;
  return this.http.put<Client>(url, updatedClient, { headers });
}



createProject(project: Project): Observable<Project> {
  const headers = this.getHeaders();

  return this.http.post<Project>(`${this.apiUrl}/projet-service/api/projects/create-project`, project, { headers });
}

getProcessusByActivityId(activityId: number): Observable<Processus[]> {
  const url = `${this.apiUrl}/projet-service/api/projects/activities/${activityId}/processus`;
  const headers = this.getHeaders();
  return this.http.get<Processus[]>(url, { headers });
}

getKpisByProcessusIds(processusIds: number[]): Observable<Kpi[]> {
  const url = `${this.apiUrl}/projet-service/api/kpi/processus/${processusIds}`;
  const headers = this.getHeaders();
  return this.http.get<Kpi[]>(url, { headers });
}

// getKpisByProcessusId(processusId: number[]): Observable<Kpi[]> {
//   const url = `${this.apiUrl}/projet-service/api/kpi/processuskpi/${processusId}`;
//   const headers = this.getHeaders();
//   return this.http.get<Kpi[]>(url, { headers });
// }

getKpisByP(processusId: number): Observable<Kpi[]> {
  const url = `${this.apiUrl}/projet-service/api/kpi/processuskpi/${processusId}`;
  const headers = this.getHeaders();
  return this.http.get<Kpi[]>(url, { headers});
}

getKpiValueById(kpiId: number): Observable<number> {
  const headers = this.getHeaders();
  const url = `${this.apiUrl}/projet-service/api/kpi/api/kpi/${kpiId}/value`; // Corrigez le format de l'URL
  return this.http.get<number>(url, { headers });
}

getProjectList(): Observable<Project[]> {
  const url = `${this.apiUrl}/projet-service/api/projects/listp`;
  const headers = this.getHeaders();
  return this.http.get<Project[]>(url, { headers });
}



deleteProject(projectId: number): Observable<any> {
  const url = `${this.apiUrl}/projet-service/api/projects/delete/${projectId}`;
  const headers = this.getHeaders();
  return this.http.delete(url, { headers });
}

updateProject(id: number, project: Project): Observable<Project> {
  const headers = this.getHeaders();
  return this.http.put<Project>(`${this.apiUrl}/projet-service/api/projects/updateproject/${id}`, project, { headers });
}


getProcessusByProjectId(projectId: number): Observable<any> {
  const url = `${this.apiUrl}/projet-service/api/projects/${projectId}/processus`;
  const headers = this.getHeaders();

  return this.http.get(url, { headers });
}
getProjectById(projectId: number): Observable<Project> {
  const url = `${this.apiUrl}/projet-service/api/projects/${projectId}`;
  const headers = this.getHeaders();
  return this.http.get<Project>(url, { headers });
}

getProjectDetails(id: number): Observable<Project> {
  const url = `${this.apiUrl}/projet-service/api/projects/projetDetails/${id}`;
  const headers = this.getHeaders();
  return this.http.get<Project>(url, { headers });
}

getProcessusAndKpi(projectId: number): Observable<Map<string, string[]>> {
  const url = `${this.apiUrl}/projet-service/api/projects/${projectId}/processusAndKpi`;
  const headers = this.getHeaders();

  return this.http.get<Map<string, string[]>>(url, { headers });
}

createKpiHistory(kpiId: number, projectId: number, requestBody: any): Observable<KpiHistory> {
  const url = `${this.apiUrl}/projet-service/api/kpi/save/${kpiId}/history?projectId=${projectId}`; // Correction ici
  const headers = this.getHeaders();

  return this.http.post<KpiHistory>(url, requestBody, { headers });
}

getKpiHistoryByProjectAndKpiId(projectId: number, kpiId: number): Observable<KpiHistory[]> {
  const url = `${this.apiUrl}/projet-service/api/kpi/projects/${projectId}/kpis/${kpiId}/history`;
  const headers = this.getHeaders();
  return this.http.get<KpiHistory[]>(url, { headers });
}

getActivitiesByProjectId(projectId: number): Observable<string[]> {
  const url = `${this.apiUrl}/projet-service/project/${projectId}/activities`;
  const headers = this.getHeaders();
  return this.http.get<string[]>(url, { headers });
}

getKpisByActivityId(activityId: number): Observable<Kpi[]> {
  const url = `${this.apiUrl}/projet-service/api/kpi/activity/${activityId}/kpis`;
  const headers = this.getHeaders();
  return this.http.get<Kpi[]>(url, { headers });
}


getKpiHistoryByProjectId(projectId: number): Observable<KpiHistory[]> {
  const url = `${this.apiUrl}/projet-service/api/kpi/projects/${projectId}/kpis/history`;
  const headers = this.getHeaders();
  return this.http.get<KpiHistory[]>(url, { headers });
}

uploadFile(file: File, problem: string, cause: string, action: string, kpiId: number): Observable<any> {
  const formData: FormData = new FormData();
  formData.append('file', file);
  formData.append('problem', problem);
  formData.append('cause', cause);
  formData.append('action', action);

  // Récupérer le jeton d'authentification depuis le localStorage
  const token = localStorage.getItem('token');

  // Créer les en-têtes avec le jeton d'authentification si disponible
  let headers = new HttpHeaders();
  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  // Envoyer la requête POST avec les données et les en-têtes
  return this.http.post<any>(`${this.apiUrl}/analyse-service/api/analyse/upload/${kpiId}`, formData, { headers: headers, observe: 'response' }).pipe(
    map(response => response.body),
    catchError(error => {
      return throwError(error);
    })
  );
}

getKpiHistoryById(historyId: number): Observable<KpiHistory> {
  const url = `${this.apiUrl}/projet-service/api/kpi/history/${historyId}`;
  const headers = this.getHeaders();
  return this.http.get<KpiHistory>(url, { headers });
}


updateKpiHistory(historyId: number, requestBody: any): Observable<KpiHistory> {
  const url = `${this.apiUrl}/projet-service/api/kpi/update/${historyId}`;
  const headers = this.getHeaders();
  return this.http.post<KpiHistory>(url, requestBody, { headers });
}

createPip(categoryId: number, pip: Pip): Observable<Pip> {
  const url = `${this.apiUrl}/pip-service/api/pip/add/category/${categoryId}`;
  const headers = this.getHeaders();

  return this.http.post<Pip>(url, pip, { headers });
}

getPipList(): Observable<Pip[]> {
  const url = `${this.apiUrl}/pip-service/api/pip/list`; // Endpoint pour récupérer la liste de Pip
  const headers = this.getHeaders();
  return this.http.get<Pip[]>(url, { headers });
}

updatePip(pipId: number, categoryId: number, pipDetails: Pip): Observable<Pip> {
  const url = `${this.apiUrl}/pip-service/api/pip/${pipId}/${categoryId}`;
  const headers = this.getHeaders();

  return this.http.put<Pip>(url, pipDetails, { headers });
}

getPipById(pipId: number): Observable<Pip> {
  const url = `${this.apiUrl}/pip-service/api/pip/${pipId}`;
  const headers = this.getHeaders();

  return this.http.get<Pip>(url, { headers });
}

deletePip(pipId: number): Observable<any> {
  const url = `${this.apiUrl}/pip-service/api/pip/${pipId}`; // Endpoint pour supprimer un Pip
  const headers = this.getHeaders();

  return this.http.delete<any>(url, { headers });
}

getResultsPipList(): Observable<ResultsPip[]> {
  const headers = this.getHeaders();
  return this.http.get<ResultsPip[]>(`${this.apiUrl}/pip-service/api/resultspip/list`, { headers });
}

getResultsPipById(id: number): Observable<ResultsPip> {
  const headers = this.getHeaders();
  return this.http.get<ResultsPip>(`${this.apiUrl}/pip-service/api/resultspip/${id}`, { headers });
}

createResultsPip(pipId: number, resultsPip: ResultsPip): Observable<ResultsPip> {
  const headers = this.getHeaders();
  return this.http.post<ResultsPip>(`${this.apiUrl}/pip-service/api/resultspip/add/${pipId}`, resultsPip, { headers });
}

updateResultsPip(resultsPipId: number, pipId: number, resultsPipDetails: ResultsPip): Observable<ResultsPip> {
  const headers = this.getHeaders();
  return this.http.put<ResultsPip>(`${this.apiUrl}/pip-service/api/resultspip/${resultsPipId}/${pipId}`, resultsPipDetails, { headers });
}

deleteResultsPip(resultsPipId: number): Observable<any> {
  const headers = this.getHeaders();
  return this.http.delete<any>(`${this.apiUrl}/pip-service/api/resultspip/${resultsPipId}`, { headers });
}


getKpiHistoryByKpiId(kpiId: number): Observable<KpiHistory[]> {
  const url = `${this.apiUrl}/projet-service/api/kpi/kpis/${kpiId}/history`;
  const headers = this.getHeaders();
  return this.http.get<KpiHistory[]>(url, { headers });
}

getKpiObjectifById(kpiId: number): Observable<number> {
  const url = `${this.apiUrl}/projet-service/api/kpi/${kpiId}/objectif`;
  const headers = this.getHeaders();
  return this.http.get<number>(url, { headers });
}

getListByAxe(axe: string): Observable<Volet[]> {
  const url = `${this.apiUrl}/volet-service/api/volet/list/${axe}`;
  const headers = this.getHeaders();
  return this.http.get<Volet[]>(url, { headers });
}

getLatestKpiHistory(kpiId: number): Observable<KpiHistory> {
  const headers = this.getHeaders();
  return this.http.get<KpiHistory>(
    `${this.apiUrl}/projet-service/api/kpi/${kpiId}/latest-history`,
    { headers }
  );
}

getHistoryIdByValue(kpiId: number, value: number): Observable<number> {
  const headers = this.getHeaders();

  return this.http.get<number>(
    `${this.apiUrl}/projet-service/api/kpi/kpis/${kpiId}/history/${value}`,
    { headers }
  );
}

updateKpiHistoryvalue(historyId: number, updatedHistory: any): Observable<any> {
  const headers = this.getHeaders();

  return this.http.put<any>(
    `${this.apiUrl}/projet-service/api/kpi/kpihistories/${historyId}`,
    updatedHistory,
    { headers }
  );
}


getKpiHistoryidByKpiId(kpiId: number): Observable<KpiHistory[]> {
  const url = `${this.apiUrl}/projet-service/api/kpi/historyId/${kpiId}`;
  const headers = this.getHeaders();
  return this.http.get<KpiHistory[]>(url, { headers });
}

getKpiById(id: number): Observable<Kpi> {
  const url = `${this.apiUrl}/projet-service/api/kpi/getkpi/${id}`;
  const headers = this.getHeaders();
  return this.http.get<Kpi>(url,{headers});
}

getProjectsByActivity(activityId: number, token: string): Observable<Project[]> {
  const url = `${this.apiUrl}/projet-service/api/projects/${activityId}/list`;
  const headers = this.getHeaders();
  return this.http.get<Project[]>(url, { headers });
}
 /* --------------CadranServiceee ---------------- */
 
ajouterCadran(cadran: any): Observable<any> {
  const headers = this.getHeaders();

  return this.http.post<any>(`http://localhost:8800/api/cadran/new`, cadran, { headers });
}

getAllCadrans(): Observable<Cadran[]> {
  const headers = this.getHeaders();
  return this.http.get<Cadran[]>(`http://localhost:8800/api/cadran/list`, { headers });
}


getCadranListByTypeS(): Observable<Cadran[]> {
  const headers = this.getHeaders();

  // Envoyez la requête HTTP GET avec le token Bearer dans les en-têtes
  return this.http.get<Cadran[]>(`http://localhost:8800/api/cadran/list/strength`, { headers });
}

getCadranListByTypeW(): Observable<Cadran[]> {
  const headers = this.getHeaders();
console.log( headers)

  // Envoyez la requête HTTP GET avec le token Bearer dans les en-têtes
  return this.http.get<Cadran[]>('http://localhost:8800/api/cadran/list/weakness', { headers });
}

getCadranListByTypeO(): Observable<Cadran[]> {
  const headers = this.getHeaders();
console.log(headers)
  // Envoyez la requête HTTP GET avec le token Bearer dans les en-têtes
  return this.http.get<Cadran[]>(`http://localhost:8800/api/cadran/list/opportunity`, { headers });
}

getCadranListByTypeT(): Observable<Cadran[]> {
  const headers = this.getHeaders();

  // Envoyez la requête HTTP GET avec le token Bearer dans les en-têtes
  return this.http.get<Cadran[]>(`http://localhost:8800/api/cadran/list/threat`, { headers });
}


deleteCadran(cadranId: number): Observable<any> {
  const headers = this.getHeaders();

  return this.http.delete<any>(`${this.apiUrl}/volet-service/api/cadran/${cadranId}`, { headers });
}

getCadranById(cadranId: number): Observable<Cadran> {
  const headers = this.getHeaders();

  return this.http.get<Cadran>(`${this.apiUrl}/volet-service/api/cadran/${cadranId}`, { headers });
}

updateCadran(cadranId: number, cadranDetails: Cadran): Observable<Cadran> {
  const headers = this.getHeaders();

  return this.http.put<Cadran>(`${this.apiUrl}/volet-service/api/cadran/${cadranId}`, cadranDetails, { headers });
}


checkSelectedCadranCombination(selectedCadrans: Cadran[]) {
  const token = localStorage.getItem('token'); // ou sessionStorage
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  return this.http.post<any>(
    `${this.apiUrl}/volet-service/api/selected-collections/check`,
    { cadrans: selectedCadrans },
    { headers: headers }
  );
}

 /*----------------------------------------*/



getProjectsByDate(startDate: string, endDate: string): Observable<Project[]> {
  const headers = this.getHeaders();
  const url = `${this.apiUrl}/projet-service/api/projects/projects-by-date?startDate=${startDate}&endDate=${endDate}`;
  return this.http.get<Project[]>(url, { headers });
}

getCadransByVoletId(voletId: number): Observable<Cadran[]> {
  const headers = this.getHeaders();
  const url = `${this.apiUrl}/volet-service/api/cadran/volet/${voletId}/cadrans`; // URL de l'API pour récupérer les cadrans par volet ID
  return this.http.get<Cadran[]>(url, { headers });
}

getVoletNameByCadranName(cadranName: string): Observable<string> {
  const headers = this.getHeaders();
  const url = `${this.apiUrl}/volet-service/api/volet/voletNameByCadranName/${cadranName}`;
  return this.http.get<string>(url);
}


addKpiToProcessus(processusId: number, kpi: any): Observable<any> {
  const headers = this.getHeaders();

  return this.http.post<any>(`${this.apiUrl}/projet-service/api/kpi/addKpiToProcessus/${processusId}`, kpi, { headers });
}

getProjectCountByType(type: string): Observable<Map<string, number>> {
  const headers = this.getHeaders();

  const url = `${this.apiUrl}/projet-service/api/projects/count/type/${type}`;
  return this.http.get<Map<string, number>>(url, { headers });
}

getLatestKpiNamesBetweenDates(startDate: Date, endDate: Date): Observable<string[]> {
  const headers = this.getHeaders();

  // Convertir les dates en format ISO
  const formattedStartDate = startDate.toISOString().split('T')[0];
  const formattedEndDate = endDate.toISOString().split('T')[0];

  // Construire les paramètres de la requête HTTP
  let params = new HttpParams()
    .set('startDate', formattedStartDate)
    .set('endDate', formattedEndDate);

  // Construire l'URL de l'API
  const url = 'http://localhost:8763/projet-service/api/kpi/kpis/between-dates';

  // Envoyer la requête HTTP GET avec les paramètres et les en-têtes
  return this.http.get<string[]>(url, { headers, params });
}


createResult(kpiId: number, requestBody: any): Observable<KpiHistory> {
  const url = `${this.apiUrl}/projet-service/api/kpi/result/${kpiId}/history`;
  const headers = this.getHeaders();
  return this.http.post<KpiHistory>(url, requestBody, { headers });
}


updateResult(kpiId: number, historyId: number, requestBody: any): Observable<KpiHistory> {
  const url = `${this.apiUrl}/projet-service/api/kpi/result/${kpiId}/history/${historyId}`;
  const headers = this.getHeaders();
  return this.http.put<KpiHistory>(url, requestBody, { headers });
}

ajouterAnalyseCausale(projectId: number, analyse: Analyse): Observable<Analyse> {
  const url = `${this.apiUrl}/projet-service/api/analyse/projets/${projectId}/analyses`;
  const headers = this.getHeaders();
  return this.http.post<Analyse>(url, analyse, { headers });
}

getCurrentUser() {
  const url = `${this.apiUrl}/auth-service/usercurrent`; // L'URL du service REST exposé par votre backend
  const headers = this.getHeaders();

  return this.http.get<string>(url, { headers });
}

getEmailById(userId: number) {
  const headers = this.getHeaders();
  return this.http.get<any>(`${this.apiUrl}/auth-service/useremail/${userId}`, { headers });
}
getAnalysesForProject(projectId: number): Observable<Analyse[]> {
  const url = `${this.apiUrl}/projet-service/api/analyse/analysesp/${projectId}`; // Assurez-vous que le chemin d'accès correspond à votre API
  const headers = this.getHeaders();
  return this.http.get<Analyse[]>(url, { headers });
}

getCausesForAnalyse(analyseId: number): Observable<Cause[]> {
  const url = `${this.apiUrl}/projet-service/api/analyse/analyses/${analyseId}/causes`;
  const headers = this.getHeaders();

  return this.http.get<Cause[]>(url, { headers });
}

getActionsByCauseId(causeId: number): Observable<Action[]> {
  const url = `${this.apiUrl}/projet-service/api/action/cause/${causeId}/actions`;
  const headers = this.getHeaders();

  return this.http.get<Action[]>(url, { headers }).pipe(
    catchError((error: any) => {
      console.error('Erreur lors de la récupération des actions pour cette cause:', error);
      throw error;
    })
  );
}

planifierAction(causeId: number, action: Action): Observable<any> {
  const url = `${this.apiUrl}/projet-service/api/action/planifier/${causeId}`;
  const headers = this.getHeaders();

  return this.http.post<any>(url, action, { headers });
}

modifierAction(actionId: number, action: Action): Observable<any> {
  const url = `${this.apiUrl}/projet-service/api/action/modifier/${actionId}`;
  const headers = this.getHeaders();

  return this.http.put<any>(url, action, { headers });
}

supprimerAction(actionId: number): Observable<any> {
  const url = `${this.apiUrl}/projet-service/api/action/supprimer/${actionId}`;
  const headers = this.getHeaders();

  return this.http.delete<any>(url, { headers });
}

getActionById(actionId: number): Observable<any> {
  const url = `${this.apiUrl}/projet-service/api/action/details/${actionId}`;
  const headers = this.getHeaders();

  return this.http.get<any>(url, { headers }).pipe(
    catchError(error => {
      throw 'Erreur lors de la récupération des détails de l\'action: ' + error;
    })
  );
}

deleteAnalyseCausale(analyseId: number): Observable<any> {
  const url = `${this.apiUrl}/projet-service/api/analyse/analyses/${analyseId}`;
  const headers = this.getHeaders();

  return this.http.delete<any>(url, { headers }).pipe(
    catchError(error => {
      throw 'Erreur lors de la suppression de l\'analyse: ' + error;
    })
  );
}



getAnalyseById(analyseId: number): Observable<any> {
  const url = `${this.apiUrl}/projet-service/api/analyse/analyses/${analyseId}`;
  const headers = this.getHeaders();

  return this.http.get<any>(url, { headers }).pipe(
    catchError(error => {
      throw 'Erreur lors de la récupération de l\'analyse: ' + error;
    })
  );
}

modifierAnalyseCausale(analyseId: number, analyse: Analyse): Observable<any> {
  const url = `${this.apiUrl}/projet-service/api/analyse/analyses/${analyseId}`;
  const headers = this.getHeaders();

  return this.http.put<any>(url, analyse, { headers }).pipe(
    catchError(error => {
      throw 'Erreur lors de la modification de l\'analyse: ' + error;
    })
  );
}

getProjectsByKpi(kpiId: number): Observable<Project[]> {
  const url = `${this.apiUrl}/projet-service/api/projects/projetDetailsByKpi/${kpiId}`;
  const headers = this.getHeaders();
  return this.http.get<Project[]>(url, { headers });
}

ajouterAnalyseByKpiId(kpiId: number, analyseRequest: any): Observable<any> {
  const url = `${this.apiUrl}/projet-service/api/analyse/kpis/${kpiId}/analyses`;
  const headers = this.getHeaders();

  return this.http.post<any>(url, analyseRequest, { headers });
}



getAnalysesForKpi(kpiId: number): Observable<Analyse[]> {
  const url = `${this.apiUrl}/projet-service/api/analyse/analyseslist/kpis/${kpiId}`;
  const headers = this.getHeaders();
  return this.http.get<Analyse[]>(url, { headers });
}


getPipsByCategory(categoryId: number): Observable<Pip[]> {
  const headers = this.getHeaders();
  return this.http.get<Pip[]>(`${this.apiUrl}/pip-service/api/pip/byCategory/${categoryId}`,{headers});
}

getPipsByCategoryName(categoryName: string): Observable<Pip[]> {
  const headers = this.getHeaders();

  const url = `${this.apiUrl}/projet-service/api/pip/byCategoryName/${encodeURIComponent(categoryName)}`;
  return this.http.get<Pip[]>(url, { headers });
}

updateCause(id: number, updatedCause: any): Observable<any> {
  const headers = this.getHeaders();
  return this.http.put(`${this.apiUrl}/projet-service/api/analyse/cause/${id}`, updatedCause,{ headers });
}

deleteCause(id: number): Observable<any> {
  const headers = this.getHeaders();
  return this.http.delete(`${this.apiUrl}/projet-service/api/analyse/cause/${id}`,{ headers });
}

getTotalProjetsParClient(): Observable<any[]> {
  const headers = this.getHeaders();
  const url = `${this.apiUrl}/projet-service/api/projects/total-projets-par-client`;
  return this.http.get<any[]>(url,{ headers });
}

countAnalysesForProject(projectId: number): Observable<number> {
  const headers = this.getHeaders();
  return this.http.get<number>(`${this.apiUrl}/projet-service/api/analyse/analysesp/count/${projectId}`,{ headers });
}

sendEmail(to: string, subject: string, body: string): Observable<void> {
  const headers = this.getHeaders();
  const emailRequest = { to, subject, body };
  return this.http.post<void>(`${this.apiUrl}/projet-service/api/send-email`, emailRequest, { headers });
  // Assurez-vous que `${this.apiUrl}/api/send-email` est correctement formé
}

sendRappelSms(causeId: number): Observable<string> {
  const headers = this.getHeaders();
  return this.http.get<string>(`${this.apiUrl}/projet-service/api/action/rappel/${causeId}`, { headers });
}

updateKpi(id: number, kpi: Kpi): Observable<Kpi> {
  const url = `${this.apiUrl}/projet-service/api/kpi/updatekpi/${id}`;
  const headers = this.getHeaders();
  return this.http.put<Kpi>(url, kpi, { headers });
}

deleteKpi(id: number): Observable<void> {
  const url = `${this.apiUrl}/projet-service/api/kpi/delete/${id}`;
  const headers = this.getHeaders();
  return this.http.delete<void>(url, { headers });
}

getTotalProjetsParType(): Observable<Map<string, number>> {
  const url = `${this.apiUrl}/projet-service/api/projects/count/by-type`;
  const headers = this.getHeaders();
  return this.http.get<Map<string, number>>(url, { headers });
}

}
