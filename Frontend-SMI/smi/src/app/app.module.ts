import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppMenuComponent } from './app-menu/app-menu.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListactivitesComponent } from './listactivites/listactivites.component';
import { VoletComponent } from './volet/volet.component';
import { ListuserComponent } from './listuser/listuser.component';
import { AjouteruserComponent } from './ajouteruser/ajouteruser.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ListProcessusComponent } from './list-processus/list-processus.component';
import { AjouteractiviteComponent } from './ajouteractivite/ajouteractivite.component';
import { ModifieractiviteComponent } from './modifieractivite/modifieractivite.component';
import { ListprocessusComponent } from './listprocessus/listprocessus.component';
import { AddProcessDialogComponentComponent } from './add-process-dialog-component/add-process-dialog-component.component';
import { UpdateProcessusComponent } from './update-processus/update-processus.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ListvoletComponent } from './listvolet/listvolet.component';
import { AjoutervoletComponent } from './ajoutervolet/ajoutervolet.component';
import { MatRadioModule } from '@angular/material/radio';
import { ModifiervoletComponent } from './modifiervolet/modifiervolet.component';
import { ListecategoriesComponent } from './listecategories/listecategories.component';
import { AjoutercategoriesComponent } from './ajoutercategories/ajoutercategories.component';
import { ModifiecategorieComponent } from './modifiecategorie/modifiecategorie.component';
import { ListclientComponent } from './listclient/listclient.component';
import { AjouterclientComponent } from './ajouterclient/ajouterclient.component';
import { ModifierclientComponent } from './modifierclient/modifierclient.component';
import { CommonModule } from '@angular/common';
import { MatriceswotComponent } from './matriceswot/matriceswot.component';
import { AjoutercadranComponent } from './ajoutercadran/ajoutercadran.component';
import { ModifiercadranComponent } from './modifiercadran/modifiercadran.component';
import { ListprojetComponent } from './listprojet/listprojet.component';
import { AjouterprojetComponent } from './ajouterprojet/ajouterprojet.component';
import { ModifierprojectComponent } from './modifierproject/modifierproject.component';
import { DetailsprojetComponent } from './detailsprojet/detailsprojet.component';
import { AjouterkpihistoryComponent } from './ajouterkpihistory/ajouterkpihistory.component';
import { ModifierkpihistoryComponent } from './modifierkpihistory/modifierkpihistory.component';
import { AnalysecausaleComponent } from './analysecausale/analysecausale.component';
import { ListepipComponent } from './listepip/listepip.component';
import { AjouterpipComponent } from './ajouterpip/ajouterpip.component';
import { ModifierpipComponent } from './modifierpip/modifierpip.component';
import { MatIconModule } from '@angular/material/icon';
import { ResultatpipComponent } from './resultatpip/resultatpip.component';
import { AjouterResultatpipComponent } from './ajouter-resultatpip/ajouter-resultatpip.component';
import { ModifierresultatpipComponent } from './modifierresultatpip/modifierresultatpip.component';
import { EvolutionkpiComponent } from './evolutionkpi/evolutionkpi.component';
import { PerformanceprocessusComponent } from './performanceprocessus/performanceprocessus.component';
import { UpdatelatesthistoryComponent } from './updatelatesthistory/updatelatesthistory.component';
import { LinechartComponent } from './linechart/linechart.component';
import { AjouterkpiComponent } from './ajouterkpi/ajouterkpi.component';
import { MatCardModule } from '@angular/material/card';
import { DetailsprocessusComponent } from './detailsprocessus/detailsprocessus.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DetailskpiComponent } from './Detailskpi/detailskpi.component';
import { AjouterresultatkpiComponent } from './ajouterresultatkpi/ajouterresultatkpi.component';
import { ModifierresultkpiComponent } from './modifierresultkpi/modifierresultkpi.component';
import { PlanifieractionComponent } from './planifieraction/planifieraction.component';
import { ModalcausesComponent } from './modalcauses/modalcauses.component';
import { ModifieractionComponent } from './modifieraction/modifieraction.component';
import { ModifieranalyseComponent } from './modifieranalyse/modifieranalyse.component';
import { AnalyseforkpiComponent } from './analyseforkpi/analyseforkpi.component';
import { ModalactionComponent } from './modalaction/modalaction.component';
import { EmailModalComponent } from './email-modal/email-modal.component';
import { PipsModalComponentComponent } from './pips-modal-component/pips-modal-component.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { CadranModalComponent } from './cadran-modal/cadran-modal.component';
import { ListenjeuxComponent } from './listenjeux/listenjeux.component';
import { AjouterenjeuxComponent } from './ajouterenjeux/ajouterenjeux.component';

import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { EnjeuDetailModalComponent } from './enjeu-detail-modal/enjeu-detail-modal.component';
import { EnjeuHistoryComponent } from './enjeu-history/enjeu-history.component';
import { MatTableModule } from '@angular/material/table';
import { AdminListeEnjeuxComponent } from './admin-liste-enjeux/admin-liste-enjeux.component';
import { FilterBySearchPipe } from './pipes/filter-by-search.pipe';
import { AnalyseRoListComponent } from './ro-list/ro-list.component';
import { AjouterRoComponent } from './ajouter-ro/ajouter-ro.component';
import { HighlighterrPipe } from './pipes/highlighterr.pipe';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AppMenuComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ListactivitesComponent,
    VoletComponent,
    ListuserComponent,
    AjouteruserComponent,
    UpdateuserComponent,
    ListProcessusComponent,
    AjouteractiviteComponent,
    ModifieractiviteComponent,
    ListprocessusComponent,
    AddProcessDialogComponentComponent,
    UpdateProcessusComponent,
    ListvoletComponent,
    AjoutervoletComponent,
    ModifiervoletComponent,
    ListecategoriesComponent,
    AjoutercategoriesComponent,
    ModifiecategorieComponent,
    ListclientComponent,
    AjouterclientComponent,
    ModifierclientComponent,
    MatriceswotComponent,
    AjoutercadranComponent,
    ModifiercadranComponent,
    ListprojetComponent,
    AjouterprojetComponent,
    ModifierprojectComponent,
    DetailsprojetComponent,
    AjouterkpihistoryComponent,
    ModifierkpihistoryComponent,
    AnalysecausaleComponent,
    ListepipComponent,
    AjouterpipComponent,
    ModifierpipComponent,
    ResultatpipComponent,
    AjouterResultatpipComponent,
    ModifierresultatpipComponent,
    EvolutionkpiComponent,
    PerformanceprocessusComponent,
    UpdatelatesthistoryComponent,
    LinechartComponent,
    AjouterkpiComponent,
    DetailsprocessusComponent,
    DetailskpiComponent,
    AjouterresultatkpiComponent,
    ModifierresultkpiComponent,
    PlanifieractionComponent,
    ModalcausesComponent,
    ModifieractionComponent,
    ModifieranalyseComponent,
    AnalyseforkpiComponent,
    ModalactionComponent,
    EmailModalComponent,
    PipsModalComponentComponent,
    ClientDetailsComponent,
    CadranModalComponent,
    ListenjeuxComponent,
    AjouterenjeuxComponent,
    EnjeuDetailModalComponent,
    EnjeuHistoryComponent,
    AdminListeEnjeuxComponent,
    FilterBySearchPipe,
    AnalyseRoListComponent,
    AjouterRoComponent,
    HighlighterrPipe,
    //InteractionFilterPipe
   
  
  
  ],
  imports: [

BrowserModule,
  BrowserAnimationsModule,
  AppRoutingModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  CommonModule,
  // Angular Material modules
  MatDialogModule,
  MatSelectModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatRadioModule,
  MatIconModule,
  MatCardModule,
  MatStepperModule,
  MatButtonModule,
  NgxPaginationModule,
  MatTableModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
