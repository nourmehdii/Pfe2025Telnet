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
exports.ModalcausesComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var sweetalert2_1 = require("sweetalert2");
var planifieraction_component_1 = require("../planifieraction/planifieraction.component");
var modalaction_component_1 = require("../modalaction/modalaction.component");
var ModalcausesComponent = /** @class */ (function () {
    function ModalcausesComponent(data, analyseService, smsTestService, dialog, userService) {
        this.data = data;
        this.analyseService = analyseService;
        this.smsTestService = smsTestService;
        this.dialog = dialog;
        this.userService = userService;
        this.refreshModal = new core_1.EventEmitter();
        this.causes = [];
        this.editedIndex = -1;
        this.message = '';
    }
    ModalcausesComponent.prototype.ngOnInit = function () {
        this.getAnalyse(this.data.analyseId);
        this.getCausesForAnalyse(this.data.analyseId);
    };
    ModalcausesComponent.prototype.getAnalyse = function (analyseId) {
        var _this = this;
        this.analyseService.getAnalyseById(analyseId).subscribe(function (analyse) {
            _this.analyse = analyse;
        }, function (error) {
            console.error('Error retrieving analysis:', error);
        });
    };
    ModalcausesComponent.prototype.sendRappelSms = function (causeId) {
        this.analyseService.sendRappelSms(causeId).subscribe(function (response) {
            alert(response); // Affiche une alerte avec le message de succès
        }, function (error) {
            console.error('Erreur lors de l\'envoi du rappel SMS:', error);
            alert('Erreur lors de l\'envoi du rappel SMS');
        });
    };
    ModalcausesComponent.prototype.openModalaction = function (causeId) {
        var _this = this;
        var dialogRef = this.dialog.open(planifieraction_component_1.PlanifieractionComponent, {
            width: '400px',
            height: '400px',
            data: { causeId: causeId }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.addedAction = result;
                _this.refreshActionList();
            }
        });
    };
    ModalcausesComponent.prototype.confirmDelete = function (causeId) {
        var _this = this;
        sweetalert2_1["default"].fire({
            title: 'Êtes-vous sûr?',
            text: 'Vous ne pourrez pas récupérer cette cause!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimer!',
            cancelButtonText: 'Non, annuler'
        }).then(function (result) {
            if (result.isConfirmed) {
                _this.deleteCause(causeId);
            }
            else if (result.dismiss === sweetalert2_1["default"].DismissReason.cancel) {
                sweetalert2_1["default"].fire('Annulé', 'Votre action a été annulée :)', 'info');
            }
        });
    };
    ModalcausesComponent.prototype.updateCause = function (id, updatedCause) {
        var _this = this;
        updatedCause.analyse = this.analyse; // Utilisation de l'objet Analyse complet
        this.userService.updateCause(id, updatedCause).subscribe(function (response) {
            sweetalert2_1["default"].fire({
                icon: 'success',
                title: 'Succès',
                text: 'Cause mise à jour avec succès'
            });
            console.log('Cause updated successfully:', response);
            // Mise à jour localement la cause modifiée
            var index = _this.causes.findIndex(function (c) { return c.id === updatedCause.id; });
            if (index !== -1) {
                _this.causes[index] = updatedCause;
            }
            // Réinitialisation de l'édition
            _this.editedIndex = -1;
        }, function (error) {
            console.error('Error updating cause:', error);
            sweetalert2_1["default"].fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Une erreur est survenue lors de la mise à jour de la cause'
            });
        });
    };
    ModalcausesComponent.prototype.deleteCause = function (id) {
        var _this = this;
        this.userService.deleteCause(id).subscribe(function () {
            sweetalert2_1["default"].fire({
                icon: 'success',
                title: 'Succès',
                text: 'Cause supprimée avec succès'
            });
            console.log('Cause deleted successfully!');
            // Supprimer la cause du tableau local
            _this.causes = _this.causes.filter(function (c) { return c.id !== id; });
        }, function (error) {
            console.error('Error deleting cause:', error);
            sweetalert2_1["default"].fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Une erreur est survenue lors de la suppression de la cause'
            });
        });
    };
    ModalcausesComponent.prototype.refreshActionList = function () {
        // Implémenter la logique pour rafraîchir les actions liées aux causes
    };
    ModalcausesComponent.prototype.openDetailsModal = function (cause) {
        var dialogRef = this.dialog.open(modalaction_component_1.ModalactionComponent, {
            data: { analyseId: this.analyse.id, causes: [cause] }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
        });
    };
    ModalcausesComponent.prototype.getCausesForAnalyse = function (analyseId) {
        var _this = this;
        this.analyseService.getCausesForAnalyse(analyseId).subscribe(function (causes) {
            _this.causes = causes;
            console.log('Causes for analysis:', causes);
        }, function (error) {
            console.error('Error retrieving causes for analysis:', error);
        });
    };
    ModalcausesComponent.prototype.editCell = function (index, field) {
        this.editedIndex = index;
    };
    ModalcausesComponent.prototype.saveCell = function (index) {
        var editedCause = this.causes[index];
        this.updateCause(editedCause.id, editedCause);
        this.editedIndex = -1;
    };
    ModalcausesComponent.prototype.cancelEdit = function () {
        this.editedIndex = -1;
        // Vous pouvez optionnellement annuler les changements dans editedCause si nécessaire
    };
    ModalcausesComponent.prototype.refreshTable = function () {
        this.getCausesForAnalyse(this.analyse.id);
    };
    ModalcausesComponent.prototype.refreshActions = function () {
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
        core_1.Output()
    ], ModalcausesComponent.prototype, "refreshModal");
    __decorate([
        core_1.Input()
    ], ModalcausesComponent.prototype, "causeId");
    ModalcausesComponent = __decorate([
        core_1.Component({
            selector: 'app-modalcauses',
            templateUrl: './modalcauses.component.html',
            styleUrls: ['./modalcauses.component.css']
        }),
        __param(0, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], ModalcausesComponent);
    return ModalcausesComponent;
}());
exports.ModalcausesComponent = ModalcausesComponent;
