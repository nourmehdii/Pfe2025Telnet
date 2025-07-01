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
exports.AjouterresultatkpiComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var sweetalert2_1 = require("sweetalert2");
var AjouterresultatkpiComponent = /** @class */ (function () {
    function AjouterresultatkpiComponent(data, kpiService) {
        this.data = data;
        this.kpiService = kpiService;
    } // Injection du service KpiService
    AjouterresultatkpiComponent.prototype.ngOnInit = function () {
    };
    AjouterresultatkpiComponent.prototype.onSubmit = function () {
        // Créer un objet requestBody avec les valeurs du formulaire
        var requestBody = {
            startDateP: this.startDate,
            endDateP: this.endDate,
            value: this.value
        };
        // Appeler la méthode createResult avec les valeurs du formulaire et kpiId
        this.createResult(this.data.kpiId, requestBody);
    };
    AjouterresultatkpiComponent.prototype.createResult = function (kpiId, requestBody) {
        this.kpiService.createResult(kpiId, requestBody)
            .subscribe(function (result) {
            // Gérer la réponse de l'API ici
            console.log('Résultat KPI créé : ', result);
            // Afficher une alerte de succès avec Swal
            sweetalert2_1["default"].fire({
                icon: 'success',
                title: 'Succès',
                text: 'Le résultat KPI a été créé avec succès.'
            });
        }, function (error) {
            // Gérer les erreurs ici
            console.error('Erreur lors de la création du résultat KPI : ', error);
            // Afficher une alerte d'erreur avec Swal
            sweetalert2_1["default"].fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Une erreur s\'est produite lors de la création du résultat KPI.'
            });
        });
    };
    AjouterresultatkpiComponent = __decorate([
        core_1.Component({
            selector: 'app-ajouterresultatkpi',
            templateUrl: './ajouterresultatkpi.component.html',
            styleUrls: ['./ajouterresultatkpi.component.css']
        }),
        __param(0, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], AjouterresultatkpiComponent);
    return AjouterresultatkpiComponent;
}());
exports.AjouterresultatkpiComponent = AjouterresultatkpiComponent;
