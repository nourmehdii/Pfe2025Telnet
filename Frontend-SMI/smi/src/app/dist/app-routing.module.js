"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var login_component_1 = require("./login/login.component");
var listactivites_component_1 = require("./listactivites/listactivites.component");
var volet_component_1 = require("./volet/volet.component");
var listuser_component_1 = require("./listuser/listuser.component");
var ajouteruser_component_1 = require("./ajouteruser/ajouteruser.component");
var updateuser_component_1 = require("./updateuser/updateuser.component");
var list_processus_component_1 = require("./list-processus/list-processus.component");
var listvolet_component_1 = require("./listvolet/listvolet.component");
var listecategories_component_1 = require("./listecategories/listecategories.component");
var listclient_component_1 = require("./listclient/listclient.component");
var matriceswot_component_1 = require("./matriceswot/matriceswot.component");
var listprojet_component_1 = require("./listprojet/listprojet.component");
var detailsprojet_component_1 = require("./detailsprojet/detailsprojet.component");
var analysecausale_component_1 = require("./analysecausale/analysecausale.component");
var listepip_component_1 = require("./listepip/listepip.component");
var resultatpip_component_1 = require("./resultatpip/resultatpip.component");
var evolutionkpi_component_1 = require("./evolutionkpi/evolutionkpi.component");
var performanceprocessus_component_1 = require("./performanceprocessus/performanceprocessus.component");
var linechart_component_1 = require("./linechart/linechart.component");
var analyseforkpi_component_1 = require("./analyseforkpi/analyseforkpi.component");
var auth_guard_1 = require("./auth.guard");

//var enjeuxstrategique_1 = require("./listenjeux/listenjeux.component");

var routes = [
    { path: 'home', component: dashboard_component_1.DashboardComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'listactivites', component: listactivites_component_1.ListactivitesComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'listuser', component: listuser_component_1.ListuserComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'matrice', component: volet_component_1.VoletComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'adduser', component: ajouteruser_component_1.AjouteruserComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'update/:id', component: updateuser_component_1.UpdateuserComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'ficheprocessus', component: list_processus_component_1.ListProcessusComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'listvolet', component: listvolet_component_1.ListvoletComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'categorie', component: listecategories_component_1.ListecategoriesComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'client', component: listclient_component_1.ListclientComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'matriceswot', component: matriceswot_component_1.MatriceswotComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'projets', component: listprojet_component_1.ListprojetComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'projetsdetails/:id', component: detailsprojet_component_1.DetailsprojetComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'analyse/:projectId', component: analysecausale_component_1.AnalysecausaleComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'listepip', component: listepip_component_1.ListepipComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'Attentespip', component: resultatpip_component_1.ResultatpipComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'evolutionkpi/:id', component: evolutionkpi_component_1.EvolutionkpiComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'performanceprocessus', component: performanceprocessus_component_1.PerformanceprocessusComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'linechart/:id', component: linechart_component_1.LinechartComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'analysecausale/:kpiId', component: analyseforkpi_component_1.AnalyseforkpiComponent, canActivate: [auth_guard_1.AuthGuard] },
    
    //{ path: 'enjeuxstrategique', component: enjeuxstrategique_1.ListenjeuxComponent, canActivate: [auth_guard_1.AuthGuard] },

    // Route sans AuthGuard
    { path: 'login', component: login_component_1.LoginComponent },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
