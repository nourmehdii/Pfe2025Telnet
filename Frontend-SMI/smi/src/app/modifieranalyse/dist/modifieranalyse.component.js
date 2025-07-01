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
exports.ModifieranalyseComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var forms_1 = require("@angular/forms");
var sweetalert2_1 = require("sweetalert2");
var ModifieranalyseComponent = /** @class */ (function () {
    function ModifieranalyseComponent(dialogRef, data, yourService, formBuilder) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.yourService = yourService;
        this.formBuilder = formBuilder;
    }
    ModifieranalyseComponent.prototype.ngOnInit = function () {
        this.analyseId = this.data.analyseId; // Récupérer l'ID de l'analyse à modifier depuis les données passées au modal
        this.analyseForm = this.formBuilder.group({
            typeProbleme: ['', forms_1.Validators.required],
            identificationProbleme: ['', forms_1.Validators.required],
            methodeUtilisee: ['', forms_1.Validators.required],
            date: ['', forms_1.Validators.required]
        });
        this.getAnalyseDetails();
    };
    ModifieranalyseComponent.prototype.getAnalyseDetails = function () {
        var _this = this;
        this.yourService.getAnalyseById(this.analyseId).subscribe(function (analyse) {
            _this.analyse = analyse;
            _this.analyseForm.patchValue({
                typeProbleme: analyse.typeProbleme,
                identificationProbleme: analyse.identificationProbleme,
                methodeUtilisee: analyse.methodeUtilisee,
                date: new Date(analyse.date).toISOString().substring(0, 10)
            });
        }, function (error) {
            console.error('Erreur lors de la récupération des détails de l\'analyse :', error);
        });
    };
    ModifieranalyseComponent.prototype.onSubmitModification = function () {
        var _this = this;
        if (this.analyseForm.valid) {
            var modifiedAnalyse = {
                id: this.analyse.id,
                project: this.analyse.project,
                date: this.analyseForm.value.date,
                causes: this.analyse.causes,
                typeProbleme: this.analyseForm.value.typeProbleme,
                identificationProbleme: this.analyseForm.value.identificationProbleme,
                methodeUtilisee: this.analyseForm.value.methodeUtilisee
            };
            this.yourService.modifierAnalyseCausale(this.analyseId, modifiedAnalyse).subscribe(function () {
                // Afficher une notification Swal de succès
                sweetalert2_1["default"].fire({
                    icon: 'success',
                    title: 'Succès',
                    text: 'Analyse modifiée avec succès!',
                    confirmButtonText: 'OK'
                }).then(function (result) {
                    // Fermer le modal si l'utilisateur clique sur OK
                    if (result.isConfirmed) {
                        _this.dialogRef.close(true);
                    }
                });
            }, function (error) {
                // Afficher une notification Swal d'erreur
                sweetalert2_1["default"].fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Une erreur s\'est produite lors de la modification de l\'analyse.',
                    confirmButtonText: 'OK'
                }).then(function (result) {
                    // Fermer le modal si l'utilisateur clique sur OK
                    if (result.isConfirmed) {
                        _this.dialogRef.close(false);
                    }
                });
                console.error('Erreur lors de la modification de l\'analyse :', error);
            });
        }
        else {
            // Afficher une notification Swal pour indiquer que le formulaire n'est pas valide
            sweetalert2_1["default"].fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Le formulaire n\'est pas valide.',
                confirmButtonText: 'OK'
            });
        }
    };
    ModifieranalyseComponent = __decorate([
        core_1.Component({
            selector: 'app-modifieranalyse',
            templateUrl: './modifieranalyse.component.html',
            styleUrls: ['./modifieranalyse.component.css']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], ModifieranalyseComponent);
    return ModifieranalyseComponent;
}());
exports.ModifieranalyseComponent = ModifieranalyseComponent;
