"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ResultatpipComponent = void 0;
var core_1 = require("@angular/core");
var ajouter_resultatpip_component_1 = require("../ajouter-resultatpip/ajouter-resultatpip.component");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var sweetalert2_1 = require("sweetalert2");
var modifierresultatpip_component_1 = require("../modifierresultatpip/modifierresultatpip.component");
var ResultatpipComponent = /** @class */ (function () {
    function ResultatpipComponent(dialog, userService) {
        this.dialog = dialog;
        this.userService = userService;
        this.p = 1;
    }
    ResultatpipComponent.prototype.ngOnInit = function () {
        this.loadResultsPipList();
    };
    ResultatpipComponent.prototype.openAddPipModal = function () {
        var _this = this;
        var dialogRef = this.dialog.open(ajouter_resultatpip_component_1.AjouterResultatpipComponent, {
            width: '600px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            // Vous pouvez gérer le résultat ici si nécessaire
            // Par exemple, recharger la liste des processus après la fermeture de la boîte de dialogue
            _this.loadResultsPipList();
        });
    };
    ResultatpipComponent.prototype.loadResultsPipList = function () {
        this.resultsPipList$ = this.userService.getResultsPipList();
        this.resultsPipList$.subscribe(function (results) {
            console.log('Liste des résultats PIP :', results);
        });
    };
    ResultatpipComponent.prototype.openUpdatePipresultattModal = function (pipresulatId) {
        var _this = this;
        console.log('Ouvrir la modal de modification du résultat PIP - pipresultatId:', pipresulatId);
        var dialogRef = this.dialog.open(modifierresultatpip_component_1.ModifierresultatpipComponent, {
            width: '500px',
            data: { pipresulatId: pipresulatId } // Transmission de l'ID du résultat PIP
        });
        // Souscrire à l'événement pipresultatUpdated émis par la modal après la modification du résultat PIP
        dialogRef.componentInstance.pipresultatUpdated.subscribe(function () {
            _this.loadResultsPipList(); // Mettre à jour la liste des résultats PIP après la modification
        });
        // Souscrire à l'événement afterClosed émis lorsque la modal est fermée
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('La modal a été fermée');
            // Traitements supplémentaires après la fermeture de la modal
        });
    };
    ResultatpipComponent.prototype.deleteResultsPip = function (resultsPipId) {
        var _this = this;
        sweetalert2_1["default"].fire({
            title: 'Êtes-vous sûr?',
            text: 'Vous ne pourrez pas récupérer ce résultat PIP!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimer!',
            cancelButtonText: 'Annuler',
            reverseButtons: true
        }).then(function (result) {
            if (result.isConfirmed) {
                _this.userService.deleteResultsPip(resultsPipId)
                    .pipe(operators_1.switchMap(function () { return _this.userService.getResultsPipList(); }))
                    .subscribe(function (updatedResultsPipList) {
                    console.log('Résultat PIP supprimé avec succès');
                    // Mise à jour de la liste des résultats PIP
                    _this.resultsPipList$ = rxjs_1.of(updatedResultsPipList); // Correction ici
                    sweetalert2_1["default"].fire('Supprimé!', 'Votre résultat PIP a été supprimé.', 'success');
                }, function (error) {
                    console.error('Une erreur s\'est produite lors de la suppression du résultat PIP :', error);
                    sweetalert2_1["default"].fire('Erreur!', 'Une erreur s\'est produite lors de la suppression du résultat PIP.', 'error');
                });
            }
        });
    };
    ResultatpipComponent = __decorate([
        core_1.Component({
            selector: 'app-resultatpip',
            templateUrl: './resultatpip.component.html',
            styleUrls: ['./resultatpip.component.css']
        })
    ], ResultatpipComponent);
    return ResultatpipComponent;
}());
exports.ResultatpipComponent = ResultatpipComponent;
