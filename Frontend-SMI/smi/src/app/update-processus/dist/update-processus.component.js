"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.UpdateProcessusComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var UpdateProcessusComponent = /** @class */ (function () {
    function UpdateProcessusComponent(formBuilder, processusService, dialogRef, data, // Injection des données passées depuis la modal
    snackBar) {
        this.formBuilder = formBuilder;
        this.processusService = processusService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.snackBar = snackBar;
        this.kpis = [];
    }
    UpdateProcessusComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Créer une instance de FormGroup et initialiser le formulaire
        this.updateProcessusForm = this.formBuilder.group({
            name: ['', forms_1.Validators.required],
            description: ['', forms_1.Validators.required],
            kpis: [[]]
        });
        // Récupération de l'ID du processus depuis les données passées
        var processusId = this.data.processusId;
        this.loadKPIs();
        // Charger les détails du processus en fonction de son ID
        this.processusService.getProcessusById(processusId).subscribe(function (processus) {
            _this.processus = processus;
            // Remplir le formulaire avec les détails du processus récupérés
            _this.updateProcessusForm.patchValue({
                name: _this.processus.name,
                description: _this.processus.description,
                kpis: _this.processus.kpis.map(function (kpi) { return kpi.id; })
            });
        }, function (error) {
            console.error('Une erreur est survenue lors du chargement du processus :', error);
            _this.snackBar.open('Une erreur est survenue lors du chargement du processus', 'Fermer', {
                duration: 5000
            });
        });
    };
    // Méthode pour charger la liste des KPIs
    UpdateProcessusComponent.prototype.loadKPIs = function () {
        var _this = this;
        this.processusService.getKpiList().subscribe(function (kpis) {
            _this.kpiList = kpis;
        }, function (error) {
            console.error('Une erreur est survenue lors du chargement des KPIs :', error);
            _this.snackBar.open('Une erreur est survenue lors du chargement des KPIs', 'Fermer', {
                duration: 5000
            });
        });
    };
    // Méthode pour mettre à jour le processus
    UpdateProcessusComponent.prototype.updateProcessus = function () {
        var _this = this;
        if (this.updateProcessusForm.valid) {
            var updatedProcessus = {
                id: this.processus.id,
                name: this.updateProcessusForm.value.name,
                description: this.updateProcessusForm.value.description,
                kpis: this.updateProcessusForm.value.kpis.map(function (kpiId) {
                    return _this.kpiList.find(function (kpi) { return kpi.id === kpiId; });
                })
            };
            this.processusService.updateProcessus(this.processus.id, updatedProcessus).subscribe(function (response) {
                _this.snackBar.open('Le processus a été mis à jour avec succès', 'Fermer', {
                    duration: 5000
                });
                _this.dialogRef.close();
            }, function (error) {
                console.error('Une erreur est survenue lors de la mise à jour du processus :', error);
                _this.snackBar.open('Une erreur est survenue lors de la mise à jour du processus', 'Fermer', {
                    duration: 5000
                });
            });
        }
    };
    UpdateProcessusComponent = __decorate([
        core_1.Component({
            selector: 'app-update-processus',
            templateUrl: './update-processus.component.html',
            styleUrls: ['./update-processus.component.css']
        }),
        __param(3, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], UpdateProcessusComponent);
    return UpdateProcessusComponent;
}());
exports.UpdateProcessusComponent = UpdateProcessusComponent;
