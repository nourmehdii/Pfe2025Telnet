"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AjouterResultatpipComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ResultsPip_model_1 = require("../model/ResultsPip.model");
var sweetalert2_1 = require("sweetalert2");
var AjouterResultatpipComponent = /** @class */ (function () {
    function AjouterResultatpipComponent(fb, userService) {
        this.fb = fb;
        this.userService = userService;
    }
    AjouterResultatpipComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.resultsPipForm = this.fb.group({
            expectation: ['', forms_1.Validators.required],
            risk: ['', forms_1.Validators.required],
            existantMonitoring: ['', forms_1.Validators.required],
            setupMonitoring: ['', forms_1.Validators.required],
            pip: [null, forms_1.Validators.required],
            processus: [[]]
        });
        // Récupérer la liste des PIPs depuis le service
        this.userService.getPipList().subscribe(function (pips) {
            _this.pips = pips;
            console.log('Liste des PIPs :', _this.pips);
        });
        // Récupérer la liste des processus depuis le service
        this.userService.getProcessusList().subscribe(function (processus) {
            _this.processusList = processus;
            console.log('Liste des processus :', _this.processusList);
        });
    };
    AjouterResultatpipComponent.prototype.onSubmit = function () {
        if (this.resultsPipForm.valid) {
            var formValue = this.resultsPipForm.value;
            var resultsPip = new ResultsPip_model_1.ResultsPip(formValue.expectation, formValue.risk, formValue.existantMonitoring, formValue.setupMonitoring);
            resultsPip.pip = formValue.pip;
            resultsPip.processus = formValue.processus;
            // Récupérer l'ID du PIP à partir du formulaire ou d'où vous l'obtenez
            var pipId = resultsPip.pip.id;
            this.userService.createResultsPip(pipId, resultsPip).subscribe(function (response) {
                console.log('Résultat PIP soumis et ajouté avec succès:', response);
                sweetalert2_1["default"].fire('Succès', 'Résultat PIP ajouté avec succès', 'success');
                // Réinitialiser le formulaire ou effectuer d'autres actions si nécessaire
            }, function (error) {
                console.error('Une erreur s\'est produite lors de l\'ajout du résultat PIP :', error);
                sweetalert2_1["default"].fire('Erreur', 'Une erreur s\'est produite lors de l\'ajout du résultat PIP', 'error');
                // Afficher des messages d'erreur ou des notifications si nécessaire
            });
        }
        else {
            console.error('Le formulaire est invalide.');
            // Afficher des messages d'erreur ou des notifications si le formulaire est invalide
        }
    };
    AjouterResultatpipComponent = __decorate([
        core_1.Component({
            selector: 'app-ajouter-resultatpip',
            templateUrl: './ajouter-resultatpip.component.html',
            styleUrls: ['./ajouter-resultatpip.component.css']
        })
    ], AjouterResultatpipComponent);
    return AjouterResultatpipComponent;
}());
exports.AjouterResultatpipComponent = AjouterResultatpipComponent;
