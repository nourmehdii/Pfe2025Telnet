"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AjoutervoletComponent = void 0;
var core_1 = require("@angular/core");
var Volet_model_1 = require("../model/Volet.model"); // Importer EAxe depuis Volet.model
var sweetalert2_1 = require("sweetalert2");
var AjoutervoletComponent = /** @class */ (function () {
    function AjoutervoletComponent(dialogRef, voletService) {
        this.dialogRef = dialogRef;
        this.voletService = voletService;
        this.volet = { name: '', axe: Volet_model_1.EAxe.INTERNE }; // Définir une valeur par défaut pour axe si nécessaire
        this.axes = [Volet_model_1.EAxe.INTERNE, Volet_model_1.EAxe.EXTERNE]; // Utiliser les valeurs de l'énumération EAxe pour les options de l'axe
        this.isOpen = true; // Définir la variable isOpen pour contrôler les animations
        this.voletajout = new core_1.EventEmitter();
    }
    AjoutervoletComponent.prototype.ngOnInit = function () {
    };
    AjoutervoletComponent.prototype.onSubmit = function () {
        var _this = this;
        this.voletService.createVolet(this.volet).subscribe(function (newVolet) {
            console.log('Volet ajouté avec succès:', newVolet);
            _this.dialogRef.close(); // Ferme la modal
            sweetalert2_1["default"].fire('Succès', 'Le volet a été ajouté avec succès.', 'success');
        }, function (error) {
            console.error('Erreur lors de l\'ajout du volet:', error);
            sweetalert2_1["default"].fire('Erreur', 'Une erreur s\'est produite lors de l\'ajout du volet.', 'error');
            // Gérez les erreurs comme nécessaire
        });
    };
    __decorate([
        core_1.Output()
    ], AjoutervoletComponent.prototype, "voletajout");
    AjoutervoletComponent = __decorate([
        core_1.Component({
            selector: 'app-ajoutervolet',
            templateUrl: './ajoutervolet.component.html',
            styleUrls: ['./ajoutervolet.component.css']
        })
    ], AjoutervoletComponent);
    return AjoutervoletComponent;
}());
exports.AjoutervoletComponent = AjoutervoletComponent;
