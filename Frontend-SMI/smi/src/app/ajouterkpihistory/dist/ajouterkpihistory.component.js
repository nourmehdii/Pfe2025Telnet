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
exports.AjouterkpihistoryComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var sweetalert2_1 = require("sweetalert2");
var AjouterkpihistoryComponent = /** @class */ (function () {
    function AjouterkpihistoryComponent(data, dialogRef, formBuilder, apiService) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.formBuilder = formBuilder;
        this.apiService = apiService;
    }
    AjouterkpihistoryComponent.prototype.ngOnInit = function () {
        this.projectId = this.data.projectId;
        this.kpiId = this.data.kpiId;
        // Initialisez le formulaire avec les valeurs des champs objectif et valeur
        this.historyForm = this.formBuilder.group({
            startDateP: [''],
            endDateP: [''],
            value: [this.data.valeur],
            kpi_objectif: [this.data.objectif] // Utilisez la valeur fournie ou laissez vide si elle est nulle
        });
    };
    AjouterkpihistoryComponent.prototype.submitHistory = function () {
        var _this = this;
        var historyData = this.historyForm.value;
        // Traitez l'ajout de l'historique KPI ici
        this.apiService.createKpiHistory(this.kpiId, this.projectId, historyData).subscribe(function (response) {
            console.log('Historique KPI créé avec succès:', response);
            sweetalert2_1["default"].fire({
                icon: 'success',
                title: 'Succès!',
                text: 'Historique KPI créé avec succès.',
                confirmButtonText: 'OK'
            }).then(function (result) {
                if (result.isConfirmed) {
                    _this.dialogRef.close();
                }
            });
        }, function (error) {
            console.error('Erreur lors de la création de l\'historique KPI:', error);
            // Gérer l'erreur ici
        });
    };
    AjouterkpihistoryComponent.prototype.closeDialog = function () {
        this.dialogRef.close();
    };
    AjouterkpihistoryComponent = __decorate([
        core_1.Component({
            selector: 'app-ajouterkpihistory',
            templateUrl: './ajouterkpihistory.component.html',
            styleUrls: ['./ajouterkpihistory.component.css']
        }),
        __param(0, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], AjouterkpihistoryComponent);
    return AjouterkpihistoryComponent;
}());
exports.AjouterkpihistoryComponent = AjouterkpihistoryComponent;
