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
exports.UpdatelatesthistoryComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var forms_1 = require("@angular/forms");
var UpdatelatesthistoryComponent = /** @class */ (function () {
    function UpdatelatesthistoryComponent(dialogRef, data, formBuilder, kpiService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.formBuilder = formBuilder;
        this.kpiService = kpiService;
        this.kpiHistories = []; // Variable pour stocker l'historique des KPI
    }
    UpdatelatesthistoryComponent.prototype.ngOnInit = function () {
        // Vérifiez si les données sont correctement initialisées
        if (this.data && this.data.historyId) {
            this.historyId = this.data.historyId;
        }
        else {
            console.error('History or historyId not found in dialog data:', this.data);
        }
        if (this.data && this.data.historyForm) {
            this.historyForm = this.data.historyForm;
        }
        else {
            // Si les données ne sont pas correctement initialisées, initialisez le formulaire ici
            this.historyForm = this.formBuilder.group({
                startDateP: [null, forms_1.Validators.required],
                endDateP: [null, forms_1.Validators.required],
                value: [null, forms_1.Validators.required]
            });
        }
    };
    // Fonction pour soumettre le formulaire d'historique
    UpdatelatesthistoryComponent.prototype.submitHistory = function () {
        var _this = this;
        if (this.historyForm.valid) {
            var historyData = this.historyForm.value;
            // Convertir les valeurs de date en objets Date
            var startDate = new Date(historyData.startDateP);
            var endDate = new Date(historyData.endDateP);
            // Envoyer les données d'historique au backend pour la modification
            this.kpiService.updateKpiHistory(this.historyId, historyData).subscribe(function (response) {
                console.log('Historique KPI modifié avec succès:', response);
                _this.dialogRef.close(); // Fermer le modal après la modification de l'historique
            }, function (error) {
                console.error('Erreur lors de la modification de l\'historique KPI:', error);
                // Gérer l'erreur ici
            });
        }
    };
    UpdatelatesthistoryComponent.prototype.closeDialog = function () {
        this.dialogRef.close();
    };
    UpdatelatesthistoryComponent = __decorate([
        core_1.Component({
            selector: 'app-updatelatesthistory',
            templateUrl: './updatelatesthistory.component.html',
            styleUrls: ['./updatelatesthistory.component.css']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], UpdatelatesthistoryComponent);
    return UpdatelatesthistoryComponent;
}());
exports.UpdatelatesthistoryComponent = UpdatelatesthistoryComponent;
