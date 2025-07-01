"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AnalyseforkpiComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var sweetalert2_1 = require("sweetalert2");
var modalcauses_component_1 = require("../modalcauses/modalcauses.component");
var modifieranalyse_component_1 = require("../modifieranalyse/modifieranalyse.component");
var AnalyseforkpiComponent = /** @class */ (function () {
    function AnalyseforkpiComponent(formBuilder, analyseService, route, projectService, dialog) {
        this.formBuilder = formBuilder;
        this.analyseService = analyseService;
        this.route = route;
        this.projectService = projectService;
        this.dialog = dialog;
        this.step = 1;
        this.analyses = [];
        this.pourquoiIndices = [1, 2, 3, 4, 5];
        this.showNomCauseAndPourcentage = false;
        this.refreshModal = new core_1.EventEmitter();
    }
    AnalyseforkpiComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentDate = new Date(); // Initialiser la date actuelle
        this.route.paramMap.subscribe(function (params) {
            _this.kpiId = +params.get('kpiId'); // Assurez-vous que 'kpiId' est le nom correct du paramètre d'URL
            if (_this.kpiId) {
                _this.getAnalysesForKpi(); // Appel de la méthode pour récupérer les analyses associées au KPI
            }
            else {
                console.error('No KPI ID provided in the route.');
            }
        });
        // Initialisation du formulaire d'analyse
        this.analyseForm = this.formBuilder.group({
            typeProbleme: ['', forms_1.Validators.required],
            identificationProbleme: ['', forms_1.Validators.required],
            methodeUtilisee: ['', forms_1.Validators.required],
            causes: this.formBuilder.array([])
        });
        // Détection des changements dans la méthode utilisée pour afficher les champs dynamiques
        this.analyseForm.get('methodeUtilisee').valueChanges.subscribe(function (value) {
            if (value === '5PK') {
                _this.showNomCauseAndPourcentage = true;
            }
            else {
                _this.showNomCauseAndPourcentage = false;
            }
        });
    };
    AnalyseforkpiComponent.prototype.getCausesForAnalyse = function (analyseId) {
        var _this = this;
        this.analyseService.getCausesForAnalyse(analyseId).subscribe(function (causes) {
            _this.causes = causes;
            console.log('Causes for analysis:', causes);
        }, function (error) {
            console.error('Error retrieving causes for analysis:', error);
        });
    };
    AnalyseforkpiComponent.prototype.getAnalysesForKpi = function () {
        var _this = this;
        this.analyseService.getAnalysesForKpi(this.kpiId).subscribe(function (analyses) {
            _this.analyses = analyses;
            console.log('Analyses for KPI:', analyses);
        }, function (error) {
            console.error('Error retrieving analyses for KPI:', error);
        });
    };
    AnalyseforkpiComponent.prototype.hideNomCauseAndPourcentage = function () {
        var causes = this.causesFormArray;
        while (causes.length !== 0) {
            causes.removeAt(0);
        }
    };
    AnalyseforkpiComponent.prototype.initCauseFormGroup = function () {
        return this.formBuilder.group({
            nomCause: ['', forms_1.Validators.required],
            pourcentage: ['', forms_1.Validators.required]
        });
    };
    AnalyseforkpiComponent.prototype.onModification = function () {
        this.refreshModal.emit();
    };
    AnalyseforkpiComponent.prototype.addCause = function () {
        var causes = this.causesFormArray;
        var lastCauseIndex = causes.length - 1;
        if (this.analyseForm.valid) {
            if (causes.length < 5) {
                if (lastCauseIndex < 0 || this.arePreviousFieldsFilled(lastCauseIndex)) {
                    causes.push(this.initCauseFormGroup());
                }
                else {
                    this.showAlert('Veuillez remplir les champs précédents avant d\'ajouter une nouvelle cause.', 'warning');
                }
            }
            else {
                this.showAlert('Vous ne pouvez pas ajouter plus de 5 causes.', 'error');
            }
            this.showNomCauseAndPourcentage = causes.length < 5;
        }
        else {
            this.showAlert('Veuillez remplir les champs précédents correctement avant d\'ajouter une nouvelle cause.', 'error');
        }
    };
    AnalyseforkpiComponent.prototype.showAlert = function (message, type) {
        sweetalert2_1["default"].fire({
            title: type === 'success' ? 'Succès' : type === 'error' ? 'Erreur' : type === 'warning' ? 'Attention' : 'Information',
            text: message,
            icon: type,
            confirmButtonText: 'OK'
        });
    };
    AnalyseforkpiComponent.prototype.openModal = function (analyseId) {
        var dialogRef = this.dialog.open(modalcauses_component_1.ModalcausesComponent, {
            //  width: '1000px',
            data: { analyseId: analyseId }
        });
    };
    AnalyseforkpiComponent.prototype.refreshModalContent = function (analyseId) {
        this.getCausesForAnalyse(analyseId);
    };
    AnalyseforkpiComponent.prototype.addDynamicFields = function () {
        var causes = this.causesFormArray;
        if (this.analyseForm.valid) {
            for (var i = 0; i < causes.length; i++) {
                var causeFormGroup = causes.at(i);
                if (causeFormGroup.get('nomCause').value && causeFormGroup.get('pourcentage').value) {
                    if (i === causes.length - 1) {
                        causes.push(this.initCauseFormGroup());
                    }
                }
                else {
                    break;
                }
            }
        }
    };
    AnalyseforkpiComponent.prototype.resetForm = function () {
        this.analyseForm.reset({
            typeProbleme: '',
            identificationProbleme: '',
            methodeUtilisee: '',
            causes: []
        });
        this.showNomCauseAndPourcentage = false;
    };
    AnalyseforkpiComponent.prototype.removeCause = function (index) {
        var causes = this.causesFormArray;
        causes.removeAt(index);
    };
    Object.defineProperty(AnalyseforkpiComponent.prototype, "causesFormArray", {
        get: function () {
            return this.analyseForm.get('causes');
        },
        enumerable: false,
        configurable: true
    });
    AnalyseforkpiComponent.prototype.arePreviousFieldsFilled = function (index) {
        if (index === 0) {
            return true;
        }
        var previousCause = this.causesFormArray.at(index - 1);
        var nomCause = previousCause.get('nomCause').value;
        var pourcentage = previousCause.get('pourcentage').value;
        return nomCause && pourcentage;
    };
    AnalyseforkpiComponent.prototype.openModifierAnalyseModal = function (analyseId) {
        var _this = this;
        var dialogRef = this.dialog.open(modifieranalyse_component_1.ModifieranalyseComponent, {
            data: { analyseId: analyseId }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            if (result === true) {
                _this.getAnalysesForKpi();
            }
        });
    };
    AnalyseforkpiComponent.prototype.onDeleteAnalyseCausale = function (analyseId) {
        var _this = this;
        sweetalert2_1["default"].fire({
            title: 'Êtes-vous sûr?',
            text: "Vous ne pourrez pas revenir en arrière!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer!'
        }).then(function (result) {
            if (result.isConfirmed) {
                _this.analyseService.deleteAnalyseCausale(analyseId).subscribe(function () {
                    sweetalert2_1["default"].fire('Supprimé!', 'L\'analyse a été supprimée avec succès.', 'success');
                    _this.getAnalysesForKpi();
                }, function (error) {
                    console.error('Erreur lors de la suppression de l\'analyse :', error);
                    sweetalert2_1["default"].fire('Erreur!', 'Une erreur s\'est produite lors de la suppression de l\'analyse.', 'error');
                });
            }
        });
    };
    AnalyseforkpiComponent.prototype.nextStep = function () {
        this.step++;
    };
    AnalyseforkpiComponent.prototype.prevStep = function () {
        this.step--;
    };
    AnalyseforkpiComponent.prototype.calculateProgress = function () {
        return '33%';
    };
    AnalyseforkpiComponent.prototype.onInputChange = function (event, prochainPourquoi) {
    };
    AnalyseforkpiComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.analyseForm.valid) {
            var analyse = {
                typeProbleme: this.analyseForm.value.typeProbleme,
                identificationProbleme: this.analyseForm.value.identificationProbleme,
                methodeUtilisee: this.analyseForm.value.methodeUtilisee,
                date: new Date(),
                causes: this.analyseForm.value.causes,
                id: 0,
                project: undefined
            };
            this.analyseService.ajouterAnalyseByKpiId(this.kpiId, analyse).subscribe(function (response) {
                console.log('Réponse du service d\'ajout d\'analyse:', response);
                sweetalert2_1["default"].fire({
                    icon: 'success',
                    title: 'Succès',
                    text: 'Analyse ajoutée avec succès!'
                });
                _this.getAnalysesForKpi();
                var tableElement = document.getElementById('analysesTable');
                if (tableElement) {
                    tableElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, function (error) {
                sweetalert2_1["default"].fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Une erreur s\'est produite lors de l\'ajout de l\'analyse.'
                });
                console.error('Erreur lors de l\'enregistrement de l\'analyse:', error);
            });
        }
        else {
            console.error('Le formulaire n\'est pas valide.');
        }
    };
    AnalyseforkpiComponent.prototype.isValidForm = function () {
        var controls = this.analyseForm.controls;
        var isValid = true;
        Object.keys(controls).forEach(function (controlName) {
            if (!controls[controlName].valid) {
                isValid = false;
            }
        });
        if (this.analyseForm.get('methodeUtilisee').value === '5PK') {
            isValid = isValid && this.causesFormArray.length > 0;
            for (var i = 0; i < this.causesFormArray.length; i++) {
                var causeFormGroup = this.causesFormArray.at(i);
                if (!causeFormGroup.valid) {
                    isValid = false;
                    break;
                }
            }
        }
        return isValid;
    };
    __decorate([
        core_1.Output()
    ], AnalyseforkpiComponent.prototype, "refreshModal");
    AnalyseforkpiComponent = __decorate([
        core_1.Component({
            selector: 'app-analyseforkpi',
            templateUrl: './analyseforkpi.component.html',
            styleUrls: ['./analyseforkpi.component.css']
        })
    ], AnalyseforkpiComponent);
    return AnalyseforkpiComponent;
}());
exports.AnalyseforkpiComponent = AnalyseforkpiComponent;
