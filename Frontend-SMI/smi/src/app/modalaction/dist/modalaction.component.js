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
exports.ModalactionComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var planifieraction_component_1 = require("../planifieraction/planifieraction.component");
var ModalactionComponent = /** @class */ (function () {
    function ModalactionComponent(dialog, data, userService) {
        this.dialog = dialog;
        this.data = data;
        this.userService = userService;
        this.causes = [];
        this.maDate = new Date();
        this.editMode = false;
        this.editedIndex = -1;
        this.causes = data.causes || [];
    }
    ModalactionComponent.prototype.ngOnInit = function () {
        // Initialisation du composant
    };
    ModalactionComponent.prototype.openModalaction = function (causeId) {
        var _this = this;
        var dialogRef = this.dialog.open(planifieraction_component_1.PlanifieractionComponent, {
            width: '400px',
            height: '400px',
            data: { causeId: causeId }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                // Gérer l'action planifiée si nécessaire
                _this.refreshActions(); // Actualiser la liste des actions après l'ajout/modification
            }
        });
    };
    ModalactionComponent.prototype.deleteAction = function (index) {
        var _this = this;
        // Demander confirmation à l'utilisateur avant de supprimer l'action
        var confirmation = window.confirm('Voulez-vous vraiment supprimer cette action ?');
        if (confirmation) {
            // Récupérer l'ID de l'action à supprimer
            var actionIdToDelete = this.causes[0].actions[index].id;
            // Appeler le service pour supprimer l'action
            this.userService.supprimerAction(actionIdToDelete).pipe(
            // Gérer les erreurs potentielles lors de la suppression
            operators_1.catchError(function (error) {
                console.error('Erreur lors de la suppression de l\'action :', error);
                return rxjs_1.of(null); // Retourner un Observable vide pour continuer le flux
            })).subscribe(function () {
                // Supprimer l'action de la liste locale après la réussite de la suppression côté serveur
                _this.causes[0].actions.splice(index, 1);
                console.log('Action supprimée avec succès !');
                _this.refreshActions(); // Actualiser la liste des actions
            });
        }
        else {
            console.log('Suppression annulée par l\'utilisateur.');
        }
    };
    ModalactionComponent.prototype.editCell = function (index, field) {
        this.editedIndex = index;
    };
    ModalactionComponent.prototype.saveCell = function (index) {
        this.editedIndex = -1; // Sortir du mode d'édition après avoir sauvegardé
        // Implémenter votre logique pour sauvegarder les données modifiées ici si nécessaire
    };
    ModalactionComponent.prototype.editAction = function (index) {
        // Implémenter la logique pour éditer l'action en fonction de l'index si nécessaire
    };
    ModalactionComponent.prototype.refreshActions = function () {
        var _this = this;
        // Réinitialiser les données des causes depuis le service (à adapter selon votre logique de récupération des données)
        this.userService.getCausesForAnalyse(this.data.analyseId).subscribe(function (causes) {
            _this.causes = causes || [];
            console.log('Actions refreshed successfully!');
        }, function (error) {
            console.error('Error refreshing actions:', error);
        });
    };
    __decorate([
        core_1.Input()
    ], ModalactionComponent.prototype, "cause");
    ModalactionComponent = __decorate([
        core_1.Component({
            selector: 'app-modalaction',
            templateUrl: './modalaction.component.html',
            styleUrls: ['./modalaction.component.css']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], ModalactionComponent);
    return ModalactionComponent;
}());
exports.ModalactionComponent = ModalactionComponent;
