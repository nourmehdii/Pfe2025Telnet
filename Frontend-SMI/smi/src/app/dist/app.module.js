"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var app_menu_component_1 = require("./app-menu/app-menu.component");
var header_component_1 = require("./header/header.component");
var footer_component_1 = require("./footer/footer.component");
var login_component_1 = require("./login/login.component");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var listactivites_component_1 = require("./listactivites/listactivites.component");
var volet_component_1 = require("./volet/volet.component");
var listuser_component_1 = require("./listuser/listuser.component");
var ajouteruser_component_1 = require("./ajouteruser/ajouteruser.component");
var updateuser_component_1 = require("./updateuser/updateuser.component");
var dialog_1 = require("@angular/material/dialog");
var animations_1 = require("@angular/platform-browser/animations");
var select_1 = require("@angular/material/select");
var form_field_1 = require("@angular/material/form-field");
var input_1 = require("@angular/material/input");
var checkbox_1 = require("@angular/material/checkbox");
var list_processus_component_1 = require("./list-processus/list-processus.component");
var ajouteractivite_component_1 = require("./ajouteractivite/ajouteractivite.component");
var modifieractivite_component_1 = require("./modifieractivite/modifieractivite.component");
var listprocessus_component_1 = require("./listprocessus/listprocessus.component");
var add_process_dialog_component_component_1 = require("./add-process-dialog-component/add-process-dialog-component.component");
var update_processus_component_1 = require("./update-processus/update-processus.component");
var snack_bar_1 = require("@angular/material/snack-bar");
var listvolet_component_1 = require("./listvolet/listvolet.component");
var ajoutervolet_component_1 = require("./ajoutervolet/ajoutervolet.component");
var radio_1 = require("@angular/material/radio");
var modifiervolet_component_1 = require("./modifiervolet/modifiervolet.component");
var listecategories_component_1 = require("./listecategories/listecategories.component");
var ajoutercategories_component_1 = require("./ajoutercategories/ajoutercategories.component");
var modifiecategorie_component_1 = require("./modifiecategorie/modifiecategorie.component");
var listclient_component_1 = require("./listclient/listclient.component");
var ajouterclient_component_1 = require("./ajouterclient/ajouterclient.component");
var modifierclient_component_1 = require("./modifierclient/modifierclient.component");
var common_1 = require("@angular/common");
var matriceswot_component_1 = require("./matriceswot/matriceswot.component");
var ajoutercadran_component_1 = require("./ajoutercadran/ajoutercadran.component");
var modifiercadran_component_1 = require("./modifiercadran/modifiercadran.component");
var listprojet_component_1 = require("./listprojet/listprojet.component");
var ajouterprojet_component_1 = require("./ajouterprojet/ajouterprojet.component");
var modifierproject_component_1 = require("./modifierproject/modifierproject.component");
var detailsprojet_component_1 = require("./detailsprojet/detailsprojet.component");
var ajouterkpihistory_component_1 = require("./ajouterkpihistory/ajouterkpihistory.component");
var modifierkpihistory_component_1 = require("./modifierkpihistory/modifierkpihistory.component");
var analysecausale_component_1 = require("./analysecausale/analysecausale.component");
var listepip_component_1 = require("./listepip/listepip.component");
var ajouterpip_component_1 = require("./ajouterpip/ajouterpip.component");
var modifierpip_component_1 = require("./modifierpip/modifierpip.component");
var icon_1 = require("@angular/material/icon");
var resultatpip_component_1 = require("./resultatpip/resultatpip.component");
var ajouter_resultatpip_component_1 = require("./ajouter-resultatpip/ajouter-resultatpip.component");
var modifierresultatpip_component_1 = require("./modifierresultatpip/modifierresultatpip.component");
var evolutionkpi_component_1 = require("./evolutionkpi/evolutionkpi.component");
var performanceprocessus_component_1 = require("./performanceprocessus/performanceprocessus.component");
var updatelatesthistory_component_1 = require("./updatelatesthistory/updatelatesthistory.component");
var linechart_component_1 = require("./linechart/linechart.component");
var ajouterkpi_component_1 = require("./ajouterkpi/ajouterkpi.component");
var card_1 = require("@angular/material/card");
var detailsprocessus_component_1 = require("./detailsprocessus/detailsprocessus.component");
var ngx_pagination_1 = require("ngx-pagination");
var detailskpi_component_1 = require("./Detailskpi/detailskpi.component");
var ajouterresultatkpi_component_1 = require("./ajouterresultatkpi/ajouterresultatkpi.component");
var modifierresultkpi_component_1 = require("./modifierresultkpi/modifierresultkpi.component");
var planifieraction_component_1 = require("./planifieraction/planifieraction.component");
var modalcauses_component_1 = require("./modalcauses/modalcauses.component");
var modifieraction_component_1 = require("./modifieraction/modifieraction.component");
var modifieranalyse_component_1 = require("./modifieranalyse/modifieranalyse.component");
var analyseforkpi_component_1 = require("./analyseforkpi/analyseforkpi.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                dashboard_component_1.DashboardComponent,
                app_menu_component_1.AppMenuComponent,
                header_component_1.HeaderComponent,
                footer_component_1.FooterComponent,
                login_component_1.LoginComponent,
                listactivites_component_1.ListactivitesComponent,
                volet_component_1.VoletComponent,
                listuser_component_1.ListuserComponent,
                ajouteruser_component_1.AjouteruserComponent,
                updateuser_component_1.UpdateuserComponent,
                list_processus_component_1.ListProcessusComponent,
                ajouteractivite_component_1.AjouteractiviteComponent,
                modifieractivite_component_1.ModifieractiviteComponent,
                listprocessus_component_1.ListprocessusComponent,
                add_process_dialog_component_component_1.AddProcessDialogComponentComponent,
                update_processus_component_1.UpdateProcessusComponent,
                listvolet_component_1.ListvoletComponent,
                ajoutervolet_component_1.AjoutervoletComponent,
                modifiervolet_component_1.ModifiervoletComponent,
                listecategories_component_1.ListecategoriesComponent,
                ajoutercategories_component_1.AjoutercategoriesComponent,
                modifiecategorie_component_1.ModifiecategorieComponent,
                listclient_component_1.ListclientComponent,
                ajouterclient_component_1.AjouterclientComponent,
                modifierclient_component_1.ModifierclientComponent,
                matriceswot_component_1.MatriceswotComponent,
                ajoutercadran_component_1.AjoutercadranComponent,
                modifiercadran_component_1.ModifiercadranComponent,
                listprojet_component_1.ListprojetComponent,
                ajouterprojet_component_1.AjouterprojetComponent,
                modifierproject_component_1.ModifierprojectComponent,
                detailsprojet_component_1.DetailsprojetComponent,
                ajouterkpihistory_component_1.AjouterkpihistoryComponent,
                modifierkpihistory_component_1.ModifierkpihistoryComponent,
                analysecausale_component_1.AnalysecausaleComponent,
                listepip_component_1.ListepipComponent,
                ajouterpip_component_1.AjouterpipComponent,
                modifierpip_component_1.ModifierpipComponent,
                resultatpip_component_1.ResultatpipComponent,
                ajouter_resultatpip_component_1.AjouterResultatpipComponent,
                modifierresultatpip_component_1.ModifierresultatpipComponent,
                evolutionkpi_component_1.EvolutionkpiComponent,
                performanceprocessus_component_1.PerformanceprocessusComponent,
                updatelatesthistory_component_1.UpdatelatesthistoryComponent,
                linechart_component_1.LinechartComponent,
                ajouterkpi_component_1.AjouterkpiComponent,
                detailsprocessus_component_1.DetailsprocessusComponent,
                detailskpi_component_1.DetailskpiComponent,
                ajouterresultatkpi_component_1.AjouterresultatkpiComponent,
                modifierresultkpi_component_1.ModifierresultkpiComponent,
                planifieraction_component_1.PlanifieractionComponent,
                modalcauses_component_1.ModalcausesComponent,
                modifieraction_component_1.ModifieractionComponent,
                modifieranalyse_component_1.ModifieranalyseComponent,
                analyseforkpi_component_1.AnalyseforkpiComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpClientModule,
                app_routing_module_1.AppRoutingModule,
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule,
                dialog_1.MatDialogModule,
                animations_1.BrowserAnimationsModule,
                forms_1.ReactiveFormsModule,
                select_1.MatSelectModule,
                form_field_1.MatFormFieldModule,
                dialog_1.MatDialogModule,
                input_1.MatInputModule,
                checkbox_1.MatCheckboxModule,
                form_field_1.MatFormFieldModule,
                snack_bar_1.MatSnackBarModule,
                radio_1.MatRadioModule,
                common_1.CommonModule,
                icon_1.MatIconModule,
                card_1.MatCardModule,
                ngx_pagination_1.NgxPaginationModule,
                common_1.CommonModule
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
