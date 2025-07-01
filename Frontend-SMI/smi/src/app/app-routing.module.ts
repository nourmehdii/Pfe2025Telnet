import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ListactivitesComponent } from './listactivites/listactivites.component';
import { VoletComponent } from './volet/volet.component';
import { ListuserComponent } from './listuser/listuser.component';
import { AjouteruserComponent } from './ajouteruser/ajouteruser.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { ListProcessusComponent } from './list-processus/list-processus.component';
import { ListvoletComponent } from './listvolet/listvolet.component';
import { ListecategoriesComponent } from './listecategories/listecategories.component';
import { ListclientComponent } from './listclient/listclient.component';
import { MatriceswotComponent } from './matriceswot/matriceswot.component';
import { ListprojetComponent } from './listprojet/listprojet.component';
import { DetailsprojetComponent } from './detailsprojet/detailsprojet.component';
import { AnalysecausaleComponent } from './analysecausale/analysecausale.component';
import { ListepipComponent } from './listepip/listepip.component';
import { ResultatpipComponent } from './resultatpip/resultatpip.component';
import { EvolutionkpiComponent } from './evolutionkpi/evolutionkpi.component';
import { PerformanceprocessusComponent } from './performanceprocessus/performanceprocessus.component';
import { LinechartComponent } from './linechart/linechart.component';
import { AnalyseforkpiComponent } from './analyseforkpi/analyseforkpi.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  // Routes accessibles sans authentification
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // avec auth
  { path: 'home', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'listactivites', component: ListactivitesComponent, canActivate: [AuthGuard] },
  { path: 'listuser', component: ListuserComponent, canActivate: [AuthGuard] },
  { path: 'matrice', component: VoletComponent, canActivate: [AuthGuard] },
  { path: 'adduser', component: AjouteruserComponent, canActivate: [AuthGuard] },
  { path: 'update/:id', component: UpdateuserComponent, canActivate: [AuthGuard] },
  { path: 'ficheprocessus', component: ListProcessusComponent, canActivate: [AuthGuard] },
  { path: 'listvolet', component: ListvoletComponent, canActivate: [AuthGuard] },
  { path: 'categorie', component: ListecategoriesComponent, canActivate: [AuthGuard] },
  { path: 'client', component: ListclientComponent, canActivate: [AuthGuard] },
  { path: 'matriceswot', component: MatriceswotComponent, canActivate: [AuthGuard] },
  { path: 'projets', component: ListprojetComponent, canActivate: [AuthGuard] },
  { path: 'projetsdetails/:id', component: DetailsprojetComponent, canActivate: [AuthGuard] },
  { path: 'analyse/:projectId', component: AnalysecausaleComponent, canActivate: [AuthGuard] },
  { path: 'listepip', component: ListepipComponent, canActivate: [AuthGuard] },
  { path: 'Attentespip', component: ResultatpipComponent, canActivate: [AuthGuard] },
  { path: 'evolutionkpi/:id', component: EvolutionkpiComponent, canActivate: [AuthGuard] },
  { path: 'performanceprocessus', component: PerformanceprocessusComponent, canActivate: [AuthGuard] },
  { path: 'linechart/:id', component: LinechartComponent, canActivate: [AuthGuard] },
  { path: 'analysecausale/:kpiId', component: AnalyseforkpiComponent, canActivate: [AuthGuard] },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
