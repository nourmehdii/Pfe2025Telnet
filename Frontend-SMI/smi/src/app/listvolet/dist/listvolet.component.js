"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListvoletComponent = void 0;
var core_1 = require("@angular/core");
var ajoutervolet_component_1 = require("../ajoutervolet/ajoutervolet.component");
var sweetalert2_1 = require("sweetalert2");
var modifiervolet_component_1 = require("../modifiervolet/modifiervolet.component");
var ListvoletComponent = /** @class */ (function () {
    function ListvoletComponent(voletService, dialog) {
        this.voletService = voletService;
        this.dialog = dialog;
        this.volets = [];
        this.p = 1;
        this.axeSelectionne = '';
        this.searchAxe = ''; // Ajoutez cette ligne pour déclarer la propriété searchAxe
        this.filteredVolets = [];
    }
    ListvoletComponent.prototype.ngOnInit = function () {
        this.loadVoletList();
    };
    ListvoletComponent.prototype.loadVoletList = function () {
        var _this = this;
        this.voletService.getVoletList().subscribe(function (volets) {
            _this.volets = volets;
            _this.filterVoletsByAxe(); // Appliquer le filtre initial
        }, function (error) {
            console.error('Erreur lors de la récupération de la liste des volets:', error);
            // Gérez les erreurs comme nécessaire
        });
    };
    ListvoletComponent.prototype.openAjouterVoletModal = function () {
        var _this = this;
        var dialogRef = this.dialog.open(ajoutervolet_component_1.AjoutervoletComponent, {
            width: '500px'
        });
        dialogRef.componentInstance.voletajout.subscribe(function () {
            _this.loadVoletList(); // Assurez-vous que cette ligne est correctement écrite
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            _this.loadVoletList();
            // Vous pouvez ajouter un traitement supplémentaire après la fermeture de la modal ici
        });
    };
    ListvoletComponent.prototype.openUpdateVoletModal = function (voletId) {
        var _this = this;
        var dialogRef = this.dialog.open(modifiervolet_component_1.ModifiervoletComponent, {
            width: '500px',
            data: { voletId: voletId }
        });
        dialogRef.componentInstance.voletUpdated.subscribe(function () {
            _this.loadVoletList();
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            // Vous pouvez ajouter un traitement supplémentaire après la fermeture de la modal ici
        });
    };
    ListvoletComponent.prototype.filterVoletsByAxe = function () {
        var _this = this;
        if (this.axeSelectionne === '') {
            // Si aucun axe n'est sélectionné, afficher tous les volets
            this.filteredVolets = this.volets;
        }
        else {
            // Sinon, filtrer les volets en fonction de l'axe sélectionné
            this.filteredVolets = this.volets.filter(function (volet) { return volet.axe.toUpperCase() === _this.axeSelectionne; });
        }
    };
    ListvoletComponent.prototype.deleteVolet = function (voletId) {
        var _this = this;
        sweetalert2_1["default"].fire({
            title: 'Êtes-vous sûr?',
            text: 'Vous ne pourrez pas revenir en arrière!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimer!',
            cancelButtonText: 'Non, annuler'
        }).then(function (result) {
            if (result.isConfirmed) {
                _this.voletService.deleteVolet(voletId).subscribe(function () {
                    sweetalert2_1["default"].fire('Supprimé!', 'Votre volet a été supprimé.', 'success');
                    // Actualisez la liste des volets après la suppression
                    _this.loadVoletList();
                }, function (error) {
                    console.error('Erreur lors de la suppression du volet:', error);
                    sweetalert2_1["default"].fire('Erreur!', 'Une erreur s\'est produite lors de la suppression du volet.', 'error');
                    // Gérez les erreurs comme nécessaire
                });
            }
            else if (result.dismiss === sweetalert2_1["default"].DismissReason.cancel) {
                sweetalert2_1["default"].fire('Annulé', 'Votre volet est en sécurité :)', 'error');
            }
        });
    };
    ListvoletComponent = __decorate([
        core_1.Component({
            selector: 'app-listvolet',
            templateUrl: './listvolet.component.html',
            styleUrls: ['./listvolet.component.css']
        })
    ], ListvoletComponent);
    return ListvoletComponent;
}());
exports.ListvoletComponent = ListvoletComponent;
