"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserserviceService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var angular_jwt_1 = require("@auth0/angular-jwt");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var httpOptions = {
    headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' })
};
var UserserviceService = /** @class */ (function () {
    //  private logoutUrl = 'http://localhost:8082/logout';
    function UserserviceService(http) {
        this.http = http;
        this.helper = new angular_jwt_1.JwtHelperService();
        this.apiUrl = "https://localhost:8763";
    }
    UserserviceService.prototype.authenticate = function (user) {
        return this.http.post(this.apiUrl + "/auth-service/login", user)
            .pipe(operators_1.map(function (response) {
            if (response && response.token) {
                localStorage.setItem('token', response.token);
            }
            return response;
        }), operators_1.catchError(this.handleError));
    };
    UserserviceService.prototype.handleError = function (error) {
        var errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Erreur côté client
            errorMessage = "Error: " + error.error.message;
        }
        else {
            // Erreur côté serveur
            errorMessage = "Error Code: " + error.status + "\nMessage: " + error.message;
        }
        return rxjs_1.throwError(errorMessage);
    };
    UserserviceService.prototype.getHeaders = function () {
        var token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token not found');
        }
        return new http_1.HttpHeaders({
            'Authorization': "Bearer " + token,
            'Content-Type': 'application/json'
        });
    };
    UserserviceService.prototype.isLoggedIn = function () {
        var token = localStorage.getItem("token");
        if (token) {
            return true;
        }
        else {
            return false;
        }
    };
    // getActivityList(): Observable<Activity[]> {
    //   return this.http.get<Activity[]>(`${this.apiUrl}/list`);
    // }
    // logout(): Observable<any> {
    //   return this.http.delete<any>(this.logoutUrl);
    // }
    UserserviceService.prototype.getUserList = function () {
        var headers = this.getHeaders();
        return this.http.get(this.apiUrl + "/auth-service/list", { headers: headers });
    };
    UserserviceService.prototype.register = function (user) {
        return this.http.post(this.apiUrl + "/auth-service/register", user);
    };
    UserserviceService.prototype.getActivities = function () {
        var headers = this.getHeaders();
        return this.http.get(this.apiUrl + "/projet-service/activities", { headers: headers });
    };
    UserserviceService.prototype.getRoles = function () {
        return this.http.get(this.apiUrl + "/auth-service/roles");
    };
    UserserviceService.prototype.deleteActivity = function (activityId) {
        var url = this.apiUrl + "/projet-service/activity/" + activityId;
        var headers = this.getHeaders();
        return this.http["delete"](url, { headers: headers, responseType: 'text' });
    };
    UserserviceService.prototype.deleteUser = function (userId) {
        var token = localStorage.getItem("token");
        var headers = this.getHeaders();
        return this.http["delete"](this.apiUrl + "/auth-service/" + userId, { headers: headers, responseType: 'text' });
    };
    UserserviceService.prototype.getRoleByUserId = function (userId) {
        var headers = this.getHeaders();
        return this.http.get(this.apiUrl + "/auth-service/" + userId + "/role", { headers: headers });
    };
    UserserviceService.prototype.getUserActivities = function (userId) {
        var headers = this.getHeaders();
        var url = this.apiUrl + "/projet-service/activity/" + userId;
        return this.http.get(url, { headers: headers });
    };
    UserserviceService.prototype.getActivitiesByUserId = function (userId) {
        var headers = this.getHeaders();
        return this.http.get(this.apiUrl + "/projet-service/user/activity/" + userId, { headers: headers });
    };
    UserserviceService.prototype.createProcessuss = function (processus) {
        var token = localStorage.getItem('token');
        var headers = this.getHeaders();
        return this.http.post(this.apiUrl + "/projet-service/api/processus/addp", processus, { headers: headers });
    };
    // createProcessus(processus: Processus): Observable<Processus> {
    //   const token = localStorage.getItem('token');
    //   const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    //   return this.http.post<Processus>(`${this.apiUrl}/add`, processus, { headers });
    // }
    UserserviceService.prototype.getProcessusList = function () {
        var headers = this.getHeaders();
        return this.http.get(this.apiUrl + "/projet-service/api/processus/list", { headers: headers });
    };
    UserserviceService.prototype.createActivity = function (activity) {
        var headers = this.getHeaders();
        return this.http.post(this.apiUrl + "/projet-service/add", activity, { headers: headers });
    };
    UserserviceService.prototype.updateUser = function (userId, user) {
        var headers = this.getHeaders();
        return this.http.put(this.apiUrl + "/auth-service/users/" + userId, user, { headers: headers }); // Ajout des en-têtes
    };
    // Méthode pour récupérer un utilisateur par son ID
    UserserviceService.prototype.getUserById = function (userId) {
        var headers = this.getHeaders();
        // Envoyer la requête GET pour récupérer l'utilisateur par son ID
        return this.http.get(this.apiUrl + "/auth-service/users/" + userId, { headers: headers });
    };
    UserserviceService.prototype.updateActivity = function (activityId, activityDetails) {
        // Récupération du token depuis le localStorage
        var headers = this.getHeaders();
        // URL de l'API
        var url = this.apiUrl + "/projet-service/updateactivity/" + activityId;
        // Envoi de la requête PUT avec les headers et le corps de la requête
        return this.http.put(url, activityDetails, { headers: headers });
    };
    UserserviceService.prototype.getActivityById = function (id) {
        var headers = this.getHeaders();
        return this.http.get(this.apiUrl + "/projet-service/activity/" + id, { headers: headers });
    };
    UserserviceService.prototype.getKpiList = function () {
        // Récupération du token depuis le localStorage
        var headers = this.getHeaders();
        // Ajout des en-têtes à la requête GET
        return this.http.get(this.apiUrl + "/projet-service/api/kpi/list", { headers: headers });
    };
    UserserviceService.prototype.deleteProcessus = function (processusId) {
        var headers = this.getHeaders();
        var url = this.apiUrl + "/projet-service/api/processus/processus/" + processusId;
        return this.http["delete"](url, { headers: headers });
    };
    UserserviceService.prototype.updateProcessus = function (processusId, updatedProcessus) {
        var headers = this.getHeaders();
        var url = this.apiUrl + "/projet-service/api/processus/update/" + processusId; // URL de l'API pour la mise à jour du processus
        return this.http.put(url, updatedProcessus, { headers: headers }); // Envoi de la requête PUT avec les en-têtes
    };
    UserserviceService.prototype.getProcessusById = function (processusId) {
        var headers = this.getHeaders();
        return this.http.get(this.apiUrl + "/projet-service/api/processus/processus/" + processusId, { headers: headers });
    };
    UserserviceService.prototype.createVolet = function (volet) {
        var headers = this.getHeaders();
        var url = this.apiUrl + "/volet-service/api/volet/add"; // URL de l'API pour ajouter un volet
        return this.http.post(url, volet, { headers: headers });
    };
    UserserviceService.prototype.getVoletList = function () {
        var headers = this.getHeaders();
        var url = this.apiUrl + "/volet-service/api/volet/list"; // URL de l'API pour récupérer la liste des volets
        return this.http.get(url, { headers: headers });
    };
    UserserviceService.prototype.deleteVolet = function (voletId) {
        var url = this.apiUrl + "/volet-service/api/volet/" + voletId;
        var headers = this.getHeaders();
        return this.http["delete"](url, { headers: headers });
    };
    UserserviceService.prototype.updateVolet = function (voletId, voletDetails) {
        var url = this.apiUrl + "/volet-service/api/volet/" + voletId;
        var token = localStorage.getItem('token');
        var headers = this.getHeaders();
        return this.http.put(url, voletDetails, { headers: headers });
    };
    UserserviceService.prototype.getVoletById = function (voletId) {
        // Récupération du token depuis le localStorage
        var token = localStorage.getItem('token');
        // Définition des en-têtes avec le token d'authentification
        var headers = this.getHeaders();
        // URL de l'API pour récupérer un volet par son ID
        var url = this.apiUrl + "/volet-service/api/volet/" + voletId;
        // Envoi de la requête GET avec les en-têtes
        return this.http.get(url, { headers: headers });
    };
    UserserviceService.prototype.getCategoryList = function () {
        var headers = this.getHeaders();
        return this.http.get(this.apiUrl + "/pip-service/api/category/list", { headers: headers });
    };
    UserserviceService.prototype.getCategoryById = function (id) {
        var headers = this.getHeaders();
        return this.http.get(this.apiUrl + "/pip-service/api/category/" + id, { headers: headers });
    };
    UserserviceService.prototype.createCategory = function (category) {
        var headers = this.getHeaders();
        return this.http.post(this.apiUrl + "/pip-service/api/category/add", category, { headers: headers });
    };
    UserserviceService.prototype.updateCategory = function (categoryId, categoryDetails) {
        var headers = this.getHeaders();
        return this.http.put(this.apiUrl + "/pip-service/api/category/" + categoryId, categoryDetails, { headers: headers });
    };
    UserserviceService.prototype.deleteCategory = function (categoryId) {
        var headers = this.getHeaders();
        return this.http["delete"](this.apiUrl + "/pip-service/api/category/" + categoryId, { headers: headers });
    };
    UserserviceService.prototype.getAllClients = function () {
        var headers = this.getHeaders();
        return this.http.get(this.apiUrl + "/projet-service/clients/allclients", { headers: headers });
    };
    UserserviceService.prototype.getClientById = function (id) {
        var headers = this.getHeaders();
        return this.http.get(this.apiUrl + "/projet-service/Client/getby/" + id, { headers: headers });
    };
    UserserviceService.prototype.addClient = function (client) {
        var headers = this.getHeaders();
        return this.http.post(this.apiUrl + "/projet-service/clients/addclient", client, { headers: headers });
    };
    UserserviceService.prototype.deleteClient = function (id) {
        var headers = this.getHeaders();
        var url = this.apiUrl + "/projet-service/clients/delete/" + id;
        return this.http["delete"](url, { headers: headers });
    };
    UserserviceService.prototype.updateClient = function (id, updatedClient) {
        var headers = this.getHeaders();
        // Envoyez la requête HTTP PUT avec le token Bearer dans les en-têtes
        var url = this.apiUrl + "/projet-service/clients/" + id;
        return this.http.put(url, updatedClient, { headers: headers });
    };
    UserserviceService.prototype.ajouterCadran = function (voletId, cadran) {
        var headers = this.getHeaders();
        return this.http.post("https://localhost:8763/volet-service/api/cadran/volet/" + voletId, cadran, { headers: headers });
    };
    UserserviceService.prototype.getCadranListByTypeS = function () {
        var headers = this.getHeaders();
        // Envoyez la requête HTTP GET avec le token Bearer dans les en-têtes
        return this.http.get(this.apiUrl + "/volet-service/api/cadran/list/strength", { headers: headers });
    };
    UserserviceService.prototype.getCadranListByTypeW = function () {
        var headers = this.getHeaders();
        // Envoyez la requête HTTP GET avec le token Bearer dans les en-têtes
        return this.http.get(this.apiUrl + "/volet-service/api/cadran/list/weakness", { headers: headers });
    };
    UserserviceService.prototype.getCadranListByTypeO = function () {
        var headers = this.getHeaders();
        // Envoyez la requête HTTP GET avec le token Bearer dans les en-têtes
        return this.http.get(this.apiUrl + "/volet-service/api/cadran/list/opportunity", { headers: headers });
    };
    UserserviceService.prototype.getCadranListByTypeT = function () {
        var headers = this.getHeaders();
        // Envoyez la requête HTTP GET avec le token Bearer dans les en-têtes
        return this.http.get(this.apiUrl + "/volet-service/api/cadran/list/threat", { headers: headers });
    };
    UserserviceService.prototype.deleteCadran = function (cadranId) {
        var headers = this.getHeaders();
        return this.http["delete"](this.apiUrl + "/volet-service/api/cadran/" + cadranId, { headers: headers });
    };
    UserserviceService.prototype.getCadranById = function (cadranId) {
        var headers = this.getHeaders();
        return this.http.get(this.apiUrl + "/volet-service/api/cadran/" + cadranId, { headers: headers });
    };
    UserserviceService.prototype.updateCadran = function (cadranId, cadranDetails) {
        var headers = this.getHeaders();
        return this.http.put(this.apiUrl + "/volet-service/api/cadran/" + cadranId, cadranDetails, { headers: headers });
    };
    UserserviceService.prototype.createProject = function (project) {
        var headers = this.getHeaders();
        return this.http.post(this.apiUrl + "/projet-service/api/projects/create-project", project, { headers: headers });
    };
    UserserviceService.prototype.getProcessusByActivityId = function (activityId) {
        var url = this.apiUrl + "/projet-service/api/projects/activities/" + activityId + "/processus";
        var headers = this.getHeaders();
        return this.http.get(url, { headers: headers });
    };
    UserserviceService.prototype.getKpisByProcessusIds = function (processusIds) {
        var url = this.apiUrl + "/projet-service/api/kpi/processus/" + processusIds;
        var headers = this.getHeaders();
        return this.http.get(url, { headers: headers });
    };
    // getKpisByProcessusId(processusId: number[]): Observable<Kpi[]> {
    //   const url = `${this.apiUrl}/projet-service/api/kpi/processuskpi/${processusId}`;
    //   const headers = this.getHeaders();
    //   return this.http.get<Kpi[]>(url, { headers });
    // }
    UserserviceService.prototype.getKpisByP = function (processusId) {
        var url = this.apiUrl + "/projet-service/api/kpi/processuskpi/" + processusId;
        var headers = this.getHeaders();
        return this.http.get(url, { headers: headers });
    };
    UserserviceService.prototype.getKpiValueById = function (kpiId) {
        var headers = this.getHeaders();
        var url = this.apiUrl + "/projet-service/api/kpi/api/kpi/" + kpiId + "/value"; // Corrigez le format de l'URL
        return this.http.get(url, { headers: headers });
    };
    UserserviceService.prototype.getProjectList = function () {
        var url = this.apiUrl + "/projet-service/api/projects/listp";
        var headers = this.getHeaders();
        return this.http.get(url, { headers: headers });
    };
    UserserviceService.prototype.deleteProject = function (projectId) {
        var url = this.apiUrl + "/projet-service/api/projects/delete/" + projectId;
        var headers = this.getHeaders();
        return this.http["delete"](url, { headers: headers });
    };
    UserserviceService.prototype.updateProject = function (id, project) {
        var headers = this.getHeaders();
        return this.http.put(this.apiUrl + "/projet-service/api/projects/updateproject/" + id, project, { headers: headers });
    };
    UserserviceService.prototype.getProcessusByProjectId = function (projectId) {
        var url = this.apiUrl + "/projet-service/api/projects/" + projectId + "/processus";
        var headers = this.getHeaders();
        return this.http.get(url, { headers: headers });
    };
    UserserviceService.prototype.getProjectById = function (projectId) {
        var url = this.apiUrl + "/projet-service/api/projects/" + projectId;
        var headers = this.getHeaders();
        return this.http.get(url, { headers: headers });
    };
    UserserviceService.prototype.getProjectDetails = function (id) {
        var url = this.apiUrl + "/projet-service/api/projects/projetDetails/" + id;
        var headers = this.getHeaders();
        return this.http.get(url, { headers: headers });
    };
    UserserviceService.prototype.getProcessusAndKpi = function (projectId) {
        var url = this.apiUrl + "/projet-service/api/projects/" + projectId + "/processusAndKpi";
        var headers = this.getHeaders();
        return this.http.get(url, { headers: headers });
    };
    UserserviceService.prototype.createKpiHistory = function (kpiId, projectId, requestBody) {
        var url = this.apiUrl + "/projet-service/api/kpi/save/" + kpiId + "/history?projectId=" + projectId; // Correction ici
        var headers = this.getHeaders();
        return this.http.post(url, requestBody, { headers: headers });
    };
    UserserviceService.prototype.getKpiHistoryByProjectAndKpiId = function (projectId, kpiId) {
        var url = this.apiUrl + "/projet-service/api/kpi/projects/" + projectId + "/kpis/" + kpiId + "/history";
        var headers = this.getHeaders();
        return this.http.get(url, { headers: headers });
    };
    UserserviceService.prototype.getActivitiesByProjectId = function (projectId) {
        var url = this.apiUrl + "/projet-service/project/" + projectId + "/activities";
        var headers = this.getHeaders();
        return this.http.get(url, { headers: headers });
    };
    UserserviceService.prototype.getKpisByActivityId = function (activityId) {
        var url = this.apiUrl + "/projet-service/api/kpi/activity/" + activityId + "/kpis";
        var headers = this.getHeaders();
        return this.http.get(url, { headers: headers });
    };
    UserserviceService.prototype.getKpiHistoryByProjectId = function (projectId) {
        var url = this.apiUrl + "/projet-service/api/kpi/projects/" + projectId + "/kpis/history";
        var headers = this.getHeaders();
        return this.http.get(url, { headers: headers });
    };
    UserserviceService.prototype.uploadFile = function (file, problem, cause, action, kpiId) {
        var formData = new FormData();
        formData.append('file', file);
        formData.append('problem', problem);
        formData.append('cause', cause);
        formData.append('action', action);
        // Récupérer le jeton d'authentification depuis le localStorage
        var token = localStorage.getItem('token');
        // Créer les en-têtes avec le jeton d'authentification si disponible
        var headers = new http_1.HttpHeaders();
        if (token) {
            headers = headers.set('Authorization', "Bearer " + token);
        }
        // Envoyer la requête POST avec les données et les en-têtes
        return this.http.post(this.apiUrl + "/analyse-service/api/analyse/upload/" + kpiId, formData, { headers: headers, observe: 'response' }).pipe(operators_1.map(function (response) { return response.body; }), operators_1.catchError(function (error) {
            return rxjs_1.throwError(error);
        }));
    };
    UserserviceService.prototype.getKpiHistoryById = function (historyId) {
        var url = this.apiUrl + "/projet-service/api/kpi/history/" + historyId;
        var headers = this.getHeaders();
        return this.http.get(url, { headers: headers });
    };
    UserserviceService.prototype.updateKpiHistory = function (historyId, requestBody) {
        var url = this.apiUrl + "/projet-service/api/kpi/update/" + historyId;
        var headers = this.getHeaders();
        return this.http.post(url, requestBody, { headers: headers });
    };
    UserserviceService.prototype.createPip = function (categoryId, pip) {
        var url = this.apiUrl + "/pip-service/api/pip/add/category/" + categoryId;
        var headers = this.getHeaders();
        return this.http.post(url, pip, { headers: headers });
    };
    UserserviceService.prototype.getPipList = function () {
        var url = this.apiUrl + "/pip-service/api/pip/list"; // Endpoint pour récupérer la liste de Pip
        var headers = this.getHeaders();
        return this.http.get(url, { headers: headers });
    };
    UserserviceService.prototype.updatePip = function (pipId, categoryId, pipDetails) {
        var url = this.apiUrl + "/pip-service/api/pip/" + pipId + "/" + categoryId;
        var headers = this.getHeaders();
        return this.http.put(url, pipDetails, { headers: headers });
    };
    UserserviceService.prototype.getPipById = function (pipId) {
        var url = this.apiUrl + "/pip-service/api/pip/" + pipId;
        var headers = this.getHeaders();
        return this.http.get(url, { headers: headers });
    };
    UserserviceService.prototype.deletePip = function (pipId) {
        var url = this.apiUrl + "/pip-service/api/pip/" + pipId; // Endpoint pour supprimer un Pip
        var headers = this.getHeaders();
        return this.http["delete"](url, { headers: headers });
    };
    UserserviceService.prototype.getResultsPipList = function () {
        var headers = this.getHeaders();
        return this.http.get(this.apiUrl + "/pip-service/api/resultspip/list", { headers: headers });
    };
    UserserviceService.prototype.getResultsPipById = function (id) {
        var headers = this.getHeaders();
        return this.http.get(this.apiUrl + "/pip-service/api/resultspip/" + id, { headers: headers });
    };
    UserserviceService.prototype.createResultsPip = function (pipId, resultsPip) {
        var headers = this.getHeaders();
        return this.http.post(this.apiUrl + "/pip-service/api/resultspip/add/" + pipId, resultsPip, { headers: headers });
    };
    UserserviceService.prototype.updateResultsPip = function (resultsPipId, pipId, resultsPipDetails) {
        var headers = this.getHeaders();
        return this.http.put(this.apiUrl + "/pip-service/api/resultspip/" + resultsPipId + "/" + pipId, resultsPipDetails, { headers: headers });
    };
    UserserviceService.prototype.deleteResultsPip = function (resultsPipId) {
        var headers = this.getHeaders();
        return this.http["delete"](this.apiUrl + "/pip-service/api/resultspip/" + resultsPipId, { headers: headers });
    };
    UserserviceService.prototype.getKpiHistoryByKpiId = function (kpiId) {
        var url = this.apiUrl + "/projet-service/api/kpi/kpis/" + kpiId + "/history";
        var headers = this.getHeaders();
        return this.http.get(url, { headers: headers });
    };
    UserserviceService.prototype.getKpiObjectifById = function (kpiId) {
        var url = this.apiUrl + "/projet-service/api/kpi/" + kpiId + "/objectif";
        var headers = this.getHeaders();
        return this.http.get(url, { headers: headers });
    };
    UserserviceService.prototype.getListByAxe = function (axe) {
        var url = this.apiUrl + "/volet-service/api/volet/list/" + axe;
        var headers = this.getHeaders();
        return this.http.get(url, { headers: headers });
    };
    UserserviceService.prototype.getLatestKpiHistory = function (kpiId) {
        var headers = this.getHeaders();
        return this.http.get(this.apiUrl + "/projet-service/api/kpi/" + kpiId + "/latest-history", { headers: headers });
    };
    UserserviceService.prototype.getHistoryIdByValue = function (kpiId, value) {
        var headers = this.getHeaders();
        return this.http.get(this.apiUrl + "/projet-service/api/kpi/kpis/" + kpiId + "/history/" + value, { headers: headers });
    };
    UserserviceService.prototype.updateKpiHistoryvalue = function (historyId, updatedHistory) {
        var headers = this.getHeaders();
        return this.http.put(this.apiUrl + "/projet-service/api/kpi/kpihistories/" + historyId, updatedHistory, { headers: headers });
    };
    UserserviceService.prototype.getKpiHistoryidByKpiId = function (kpiId) {
        var url = this.apiUrl + "/projet-service/api/kpi/historyId/" + kpiId;
        var headers = this.getHeaders();
        return this.http.get(url, { headers: headers });
    };
    UserserviceService.prototype.getKpiById = function (id) {
        var url = this.apiUrl + "/projet-service/api/kpi/getkpi/" + id;
        var headers = this.getHeaders();
        return this.http.get(url, { headers: headers });
    };
    UserserviceService.prototype.getProjectsByActivity = function (activityId, token) {
        var url = this.apiUrl + "/projet-service/api/projects/" + activityId + "/list";
        var headers = this.getHeaders();
        return this.http.get(url, { headers: headers });
    };
    UserserviceService.prototype.getProjectsByDate = function (startDate, endDate) {
        var headers = this.getHeaders();
        var url = this.apiUrl + "/projet-service/api/projects/projects-by-date?startDate=" + startDate + "&endDate=" + endDate;
        return this.http.get(url, { headers: headers });
    };
    UserserviceService.prototype.getCadransByVoletId = function (voletId) {
        var headers = this.getHeaders();
        var url = this.apiUrl + "/volet-service/api/cadran/volet/" + voletId + "/cadrans"; // URL de l'API pour récupérer les cadrans par volet ID
        return this.http.get(url, { headers: headers });
    };
    UserserviceService.prototype.getVoletNameByCadranName = function (cadranName) {
        var headers = this.getHeaders();
        var url = this.apiUrl + "/volet-service/api/volet/voletNameByCadranName/" + cadranName;
        return this.http.get(url);
    };
    UserserviceService.prototype.addKpiToProcessus = function (processusId, kpi) {
        var headers = this.getHeaders();
        return this.http.post(this.apiUrl + "/projet-service/api/kpi/addKpiToProcessus/" + processusId, kpi, { headers: headers });
    };
    UserserviceService.prototype.getProjectCountByType = function (type) {
        var headers = this.getHeaders();
        var url = this.apiUrl + "/projet-service/api/projects/count/type/" + type;
        return this.http.get(url, { headers: headers });
    };
    UserserviceService.prototype.getLatestKpiNamesBetweenDates = function (startDate, endDate) {
        var headers = this.getHeaders();
        // Convertir les dates en format ISO
        var formattedStartDate = startDate.toISOString().split('T')[0];
        var formattedEndDate = endDate.toISOString().split('T')[0];
        // Construire les paramètres de la requête HTTP
        var params = new http_1.HttpParams()
            .set('startDate', formattedStartDate)
            .set('endDate', formattedEndDate);
        // Construire l'URL de l'API
        var url = 'https://localhost:8763/projet-service/api/kpi/kpis/between-dates';
        // Envoyer la requête HTTP GET avec les paramètres et les en-têtes
        return this.http.get(url, { headers: headers, params: params });
    };
    UserserviceService.prototype.createResult = function (kpiId, requestBody) {
        var url = this.apiUrl + "/projet-service/api/kpi/result/" + kpiId + "/history";
        var headers = this.getHeaders();
        return this.http.post(url, requestBody, { headers: headers });
    };
    UserserviceService.prototype.updateResult = function (kpiId, historyId, requestBody) {
        var url = this.apiUrl + "/projet-service/api/kpi/result/" + kpiId + "/history/" + historyId;
        var headers = this.getHeaders();
        return this.http.put(url, requestBody, { headers: headers });
    };
    UserserviceService.prototype.ajouterAnalyseCausale = function (projectId, analyse) {
        var url = this.apiUrl + "/projet-service/api/analyse/projets/" + projectId + "/analyses";
        var headers = this.getHeaders();
        return this.http.post(url, analyse, { headers: headers });
    };
    UserserviceService.prototype.getCurrentUser = function () {
        var url = this.apiUrl + "/auth-service/usercurrent"; // L'URL du service REST exposé par votre backend
        var headers = this.getHeaders();
        return this.http.get(url, { headers: headers });
    };
    UserserviceService.prototype.getEmailById = function (userId) {
        var headers = this.getHeaders();
        return this.http.get(this.apiUrl + "/auth-service/useremail/" + userId, { headers: headers });
    };
    UserserviceService.prototype.getAnalysesForProject = function (projectId) {
        var url = this.apiUrl + "/projet-service/api/analyse/analysesp/" + projectId; // Assurez-vous que le chemin d'accès correspond à votre API
        var headers = this.getHeaders();
        return this.http.get(url, { headers: headers });
    };
    UserserviceService.prototype.getCausesForAnalyse = function (analyseId) {
        var url = this.apiUrl + "/projet-service/api/analyse/analyses/" + analyseId + "/causes";
        var headers = this.getHeaders();
        return this.http.get(url, { headers: headers });
    };
    UserserviceService.prototype.getActionsByCauseId = function (causeId) {
        var url = this.apiUrl + "/projet-service/api/action/cause/" + causeId + "/actions";
        var headers = this.getHeaders();
        return this.http.get(url, { headers: headers }).pipe(operators_1.catchError(function (error) {
            console.error('Erreur lors de la récupération des actions pour cette cause:', error);
            throw error;
        }));
    };
    UserserviceService.prototype.planifierAction = function (causeId, action) {
        var url = this.apiUrl + "/projet-service/api/action/planifier/" + causeId;
        var headers = this.getHeaders();
        return this.http.post(url, action, { headers: headers });
    };
    UserserviceService.prototype.modifierAction = function (actionId, action) {
        var url = this.apiUrl + "/projet-service/api/action/modifier/" + actionId;
        var headers = this.getHeaders();
        return this.http.put(url, action, { headers: headers });
    };
    UserserviceService.prototype.supprimerAction = function (actionId) {
        var url = this.apiUrl + "/projet-service/api/action/supprimer/" + actionId;
        var headers = this.getHeaders();
        return this.http["delete"](url, { headers: headers });
    };
    UserserviceService.prototype.getActionById = function (actionId) {
        var url = this.apiUrl + "/projet-service/api/action/details/" + actionId;
        var headers = this.getHeaders();
        return this.http.get(url, { headers: headers }).pipe(operators_1.catchError(function (error) {
            throw 'Erreur lors de la récupération des détails de l\'action: ' + error;
        }));
    };
    UserserviceService.prototype.deleteAnalyseCausale = function (analyseId) {
        var url = this.apiUrl + "/projet-service/api/analyse/analyses/" + analyseId;
        var headers = this.getHeaders();
        return this.http["delete"](url, { headers: headers }).pipe(operators_1.catchError(function (error) {
            throw 'Erreur lors de la suppression de l\'analyse: ' + error;
        }));
    };
    UserserviceService.prototype.getAnalyseById = function (analyseId) {
        var url = this.apiUrl + "/projet-service/api/analyse/analyses/" + analyseId;
        var headers = this.getHeaders();
        return this.http.get(url, { headers: headers }).pipe(operators_1.catchError(function (error) {
            throw 'Erreur lors de la récupération de l\'analyse: ' + error;
        }));
    };
    UserserviceService.prototype.modifierAnalyseCausale = function (analyseId, analyse) {
        var url = this.apiUrl + "/projet-service/api/analyse/analyses/" + analyseId;
        var headers = this.getHeaders();
        return this.http.put(url, analyse, { headers: headers }).pipe(operators_1.catchError(function (error) {
            throw 'Erreur lors de la modification de l\'analyse: ' + error;
        }));
    };
    UserserviceService.prototype.getProjectsByKpi = function (kpiId) {
        var url = this.apiUrl + "/projet-service/api/projects/projetDetailsByKpi/" + kpiId;
        var headers = this.getHeaders();
        return this.http.get(url, { headers: headers });
    };
    UserserviceService.prototype.ajouterAnalyseByKpiId = function (kpiId, analyseRequest) {
        var url = this.apiUrl + "/projet-service/api/analyse/kpis/" + kpiId + "/analyses";
        var headers = this.getHeaders();
        return this.http.post(url, analyseRequest, { headers: headers });
    };
    UserserviceService.prototype.getAnalysesForKpi = function (kpiId) {
        var url = this.apiUrl + "/projet-service/api/analyse/analyseslist/kpis/" + kpiId;
        var headers = this.getHeaders();
        return this.http.get(url, { headers: headers });
    };
    UserserviceService.prototype.getPipsByCategory = function (categoryId) {
        var headers = this.getHeaders();
        return this.http.get(this.apiUrl + "/pip-service/api/pip/byCategory/" + categoryId, { headers: headers });
    };
    UserserviceService.prototype.getPipsByCategoryName = function (categoryName) {
        var headers = this.getHeaders();
        var url = this.apiUrl + "/projet-service/api/pip/byCategoryName/" + encodeURIComponent(categoryName);
        return this.http.get(url, { headers: headers });
    };
    UserserviceService.prototype.updateCause = function (id, updatedCause) {
        var headers = this.getHeaders();
        return this.http.put(this.apiUrl + "/projet-service/api/analyse/cause/" + id, updatedCause, { headers: headers });
    };
    UserserviceService.prototype.deleteCause = function (id) {
        var headers = this.getHeaders();
        return this.http["delete"](this.apiUrl + "/projet-service/api/analyse/cause/" + id, { headers: headers });
    };
    UserserviceService.prototype.getTotalProjetsParClient = function () {
        var headers = this.getHeaders();
        var url = this.apiUrl + "/projet-service/api/projects/total-projets-par-client";
        return this.http.get(url, { headers: headers });
    };
    UserserviceService.prototype.countAnalysesForProject = function (projectId) {
        var headers = this.getHeaders();
        return this.http.get(this.apiUrl + "/projet-service/api/analyse/analysesp/count/" + projectId, { headers: headers });
    };
    UserserviceService.prototype.sendEmail = function (to, subject, body) {
        var headers = this.getHeaders();
        var emailRequest = { to: to, subject: subject, body: body };
        return this.http.post(this.apiUrl + "/projet-service/api/send-email", emailRequest, { headers: headers });
        // Assurez-vous que `${this.apiUrl}/api/send-email` est correctement formé
    };
    UserserviceService.prototype.sendRappelSms = function (causeId) {
        var headers = this.getHeaders();
        return this.http.get(this.apiUrl + "/projet-service/api/action/rappel/" + causeId, { headers: headers });
    };
    UserserviceService.prototype.updateKpi = function (id, kpi) {
        var url = this.apiUrl + "/projet-service/api/kpi/updatekpi/" + id;
        var headers = this.getHeaders();
        return this.http.put(url, kpi, { headers: headers });
    };
    UserserviceService.prototype.deleteKpi = function (id) {
        var url = this.apiUrl + "/projet-service/api/kpi/delete/" + id;
        var headers = this.getHeaders();
        return this.http["delete"](url, { headers: headers });
    };
    UserserviceService.prototype.getTotalProjetsParType = function () {
        var url = this.apiUrl + "/projet-service/api/projects/count/by-type";
        var headers = this.getHeaders();
        return this.http.get(url, { headers: headers });
    };
    UserserviceService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserserviceService);
    return UserserviceService;
}());
exports.UserserviceService = UserserviceService;
