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
exports.ModifierresultkpiComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms"); // Importez le FormBuilder et FormGroup
var dialog_1 = require("@angular/material/dialog");
var sweetalert2_1 = require("sweetalert2");
var ModifierresultkpiComponent = /** @class */ (function () {
    function ModifierresultkpiComponent(data, kpiService, fb // Injectez le FormBuilder
    ) {
        this.data = data;
        this.kpiService = kpiService;
        this.fb = fb;
    }
    ModifierresultkpiComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.requestBodyForm = this.fb.group({
            startDateP: ['', forms_1.Validators.required],
            endDateP: ['', forms_1.Validators.required],
            value: ['', forms_1.Validators.required] // Contrôle pour value avec validation requise
        });
        console.log('Data from MAT_DIALOG_DATA:', this.data); // Vérifiez les données transmises via MAT_DIALOG_DATA
        this.kpiId = this.data.kpiId;
        // Initialiser les valeurs du formulaire si nécessaire
        if (this.data && this.data.kpiId) {
            this.kpiId = this.data.kpiId;
            this.kpiService.getKpiHistoryByKpiId(this.kpiId).subscribe(function (kpiHistories) {
                if (kpiHistories.length > 0) {
                    _this.historyId = kpiHistories[0].id;
                    // Mettre à jour les valeurs du formulaire si nécessaire
                    _this.requestBodyForm.patchValue({
                        startDateP: kpiHistories[0].startDateP,
                        endDateP: kpiHistories[0].endDateP,
                        value: kpiHistories[0].value
                    });
                }
                else {
                    console.error('No history found for the given kpiId:', _this.kpiId);
                }
            }, function (error) {
                console.error('Error fetching historyIds:', error);
            });
        }
    };
    ModifierresultkpiComponent.prototype.updateResult = function () {
        if (this.historyId) {
            var requestBody = this.requestBodyForm.value;
            this.kpiService.updateResult(this.kpiId, this.historyId, requestBody).subscribe(function (response) {
                // Afficher une alerte de succès
                sweetalert2_1["default"].fire({
                    icon: 'success',
                    title: 'Succès',
                    text: 'KpiHistory mis à jour avec succès!'
                });
                console.log('KpiHistory updated successfully:', response);
            }, function (error) {
                // Afficher une alerte d'erreur
                sweetalert2_1["default"].fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Une erreur s\'est produite lors de la mise à jour de KpiHistory.'
                });
                console.error('Error updating KpiHistory:', error);
            });
        }
        else {
            // Afficher une alerte d'erreur si historyId est indéfini
            sweetalert2_1["default"].fire({
                icon: 'error',
                title: 'Erreur',
                text: 'HistoryId est indéfini.'
            });
            console.error('HistoryId is undefined');
        }
    };
    ModifierresultkpiComponent = __decorate([
        core_1.Component({
            selector: 'app-modifierresultkpi',
            templateUrl: './modifierresultkpi.component.html',
            styleUrls: ['./modifierresultkpi.component.css']
        }),
        __param(0, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], ModifierresultkpiComponent);
    return ModifierresultkpiComponent;
}());
exports.ModifierresultkpiComponent = ModifierresultkpiComponent;
