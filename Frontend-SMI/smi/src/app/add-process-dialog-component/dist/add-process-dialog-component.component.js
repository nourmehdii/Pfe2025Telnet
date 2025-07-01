"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddProcessDialogComponentComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2"); // Importer Swal depuis sweetalert2
var AddProcessDialogComponentComponent = /** @class */ (function () {
    function AddProcessDialogComponentComponent(processusService, dialogRef // Injecter MatDialogRef
    ) {
        this.processusService = processusService;
        this.dialogRef = dialogRef;
        this.newProcess = { id: 0, name: '', description: '', kpis: [] };
        this.selectedKPIs = [];
        this.kpiList = [];
    }
    AddProcessDialogComponentComponent.prototype.ngOnInit = function () {
        this.loadKPIs();
    };
    AddProcessDialogComponentComponent.prototype.loadKPIs = function () {
        var _this = this;
        this.processusService.getKpiList().subscribe(function (kpis) {
            _this.kpiList = kpis;
        }, function (error) {
            console.error('Une erreur est survenue lors du chargement des KPIs :', error);
        });
    };
    AddProcessDialogComponentComponent.prototype.addProcess = function () {
        var _this = this;
        // Convertir les identifiants des KPI sélectionnés en objets Kpi
        var selectedKpis = this.selectedKPIs.map(function (id) { return _this.kpiList.find(function (kpi) { return kpi.id === id; }); }).filter(function (kpi) { return kpi !== undefined; });
        // Assurez-vous que tous les KPI sélectionnés ont été trouvés
        if (selectedKpis.length !== this.selectedKPIs.length) {
            sweetalert2_1["default"].fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Certains KPI sélectionnés n\'ont pas été trouvés'
            });
            return;
        }
        // Attribuer les KPI sélectionnés au processus
        this.newProcess.kpis = selectedKpis;
        // Appelez la méthode de service pour créer le processus
        this.processusService.createProcessuss(this.newProcess).subscribe(function (response) {
            sweetalert2_1["default"].fire({
                icon: 'success',
                title: 'Succès',
                text: 'Le processus a été ajouté avec succès'
            });
            // Fermer la fenêtre modale
            _this.dialogRef.close();
            // Réinitialisez les valeurs après l'ajout réussi du processus
            _this.newProcess = { id: 0, name: '', description: '', kpis: [] };
            _this.selectedKPIs = [];
        }, function (error) {
            console.error('Une erreur est survenue lors de l\'ajout du processus :', error);
            sweetalert2_1["default"].fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Une erreur est survenue lors de l\'ajout du processus'
            });
        });
    };
    AddProcessDialogComponentComponent = __decorate([
        core_1.Component({
            selector: 'app-add-process-dialog-component',
            templateUrl: './add-process-dialog-component.component.html',
            styleUrls: ['./add-process-dialog-component.component.css']
        })
    ], AddProcessDialogComponentComponent);
    return AddProcessDialogComponentComponent;
}());
exports.AddProcessDialogComponentComponent = AddProcessDialogComponentComponent;
