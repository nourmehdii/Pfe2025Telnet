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
exports.ModifierkpihistoryComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var forms_1 = require("@angular/forms");
var sweetalert2_1 = require("sweetalert2");
var ModifierkpihistoryComponent = /** @class */ (function () {
    function ModifierkpihistoryComponent(data, dialogRef, formBuilder, apiService // Remplacez "YourApiService" par le nom de votre service API réel
    ) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.formBuilder = formBuilder;
        this.apiService = apiService;
    }
    ModifierkpihistoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Récupérer les données passées au modal
        this.kpiId = this.data.kpiId;
        this.projectId = this.data.projectId;
        this.historyId = this.data.historyId;
        this.objectif = this.data.objectif; // Ajout de cette ligne
        // Initialiser le formulaire avec les validateurs
        this.historyForm = this.formBuilder.group({
            startDateP: ['', forms_1.Validators.required],
            endDateP: ['', forms_1.Validators.required],
            value: ['', forms_1.Validators.required]
        });
        // Récupérer les détails de l'historique à modifier
        this.apiService.getKpiHistoryById(this.historyId).subscribe(function (history) {
            // Pré-remplir le formulaire avec les valeurs existantes
            _this.historyForm.patchValue({
                startDateP: history.startDateP,
                endDateP: history.endDateP,
                value: history.value
            });
        }, function (error) {
            console.error('Erreur lors de la récupération de l\'historique KPI à modifier:', error);
            // Gérer l'erreur ici
        });
    };
    ModifierkpihistoryComponent.prototype.submitHistory = function () {
        var _this = this;
        if (this.historyForm.valid) {
            var historyData = this.historyForm.value;
            // Assurez-vous que this.data contient l'objectif
            if (this.data && typeof this.data.objectif === 'number') {
                var objectif = this.data.objectif;
                // Convertir la valeur de l'historique en nombre
                var historyValue = parseFloat(historyData.value);
                if (!isNaN(historyValue)) {
                    if (historyValue >= objectif) {
                        // Afficher le Swal de réussite
                        sweetalert2_1["default"].fire('Succès', 'La valeur du KPI est supérieure ou égale à l\'objectif.', 'success');
                    }
                    else {
                        // Afficher le Swal d'échec avec l'invitation à compléter l'analyse causale
                        sweetalert2_1["default"].fire({
                            icon: 'error',
                            title: 'Erreur',
                            text: 'La valeur est inférieure à l\'objectif ! Complétez l\'analyse causale.'
                        });
                    }
                }
                else {
                    console.error('La valeur de l\'historique KPI n\'est pas un nombre valide.');
                }
            }
            else {
                console.error('L\'objectif est manquant ou invalide.');
            }
            // Envoyer les données d'historique au backend pour la modification
            this.apiService.updateKpiHistory(this.historyId, historyData).subscribe(function (response) {
                console.log('Historique KPI modifié avec succès:', response);
                _this.dialogRef.close(); // Fermer le modal après la modification de l'historique
            }, function (error) {
                console.error('Erreur lors de la modification de l\'historique KPI:', error);
                // Gérer l'erreur ici
            });
        }
    };
    // Fonction pour fermer le modal
    ModifierkpihistoryComponent.prototype.closeDialog = function () {
        this.dialogRef.close();
    };
    ModifierkpihistoryComponent = __decorate([
        core_1.Component({
            selector: 'app-modifierkpihistory',
            templateUrl: './modifierkpihistory.component.html',
            styleUrls: ['./modifierkpihistory.component.css']
        }),
        __param(0, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], ModifierkpihistoryComponent);
    return ModifierkpihistoryComponent;
}());
exports.ModifierkpihistoryComponent = ModifierkpihistoryComponent;
