"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.MatriceswotComponent = void 0;
var core_1 = require("@angular/core");
var ajoutercadran_component_1 = require("../ajoutercadran/ajoutercadran.component");
var Volet_model_1 = require("../model/Volet.model");
var EType_model_1 = require("../model/EType.model");
var sweetalert2_1 = require("sweetalert2");
var modifiercadran_component_1 = require("../modifiercadran/modifiercadran.component");
var MatriceswotComponent = /** @class */ (function () {
    function MatriceswotComponent(voletService, dialog) {
        this.voletService = voletService;
        this.dialog = dialog;
        this.voletsForce = [];
        this.voletsFaiblesse = [];
        this.voletsOpportunite = [];
        this.voletsMenace = [];
        this.cadran = [];
    }
    MatriceswotComponent.prototype.ngOnInit = function () {
        this.loadVolets();
        // Déboguer la valeur de cadranId
        console.log('cadranId dans ngOnInit:', this.cadranId);
        console.log('cadranId avant getCadranListByTypeW:', this.cadranId);
    };
    MatriceswotComponent.prototype.loadVolets = function () {
        var _this = this;
        this.voletService.getCadranListByTypeS().subscribe(function (cadrans) {
            _this.voletsForce = _this.filterCadranByTypeAndAxe(cadrans, Volet_model_1.EAxe.INTERNE);
        }, function (error) {
            console.error('Erreur lors de la récupération des cadrans de force :', error);
        });
        // Ajouter des console.log pour déboguer la valeur de cadranId
        console.log('cadranId avant getCadranListByTypeW:', this.cadranId);
        this.voletService.getCadranListByTypeW().subscribe(function (cadrans) {
            _this.voletsFaiblesse = _this.filterCadranByTypeAndAxe(cadrans, Volet_model_1.EAxe.INTERNE);
        }, function (error) {
            console.error('Erreur lors de la récupération des cadrans de faiblesse :', error);
        });
        this.voletService.getCadranListByTypeO().subscribe(function (cadrans) {
            _this.voletsOpportunite = _this.filterCadranByTypeAndAxe(cadrans, Volet_model_1.EAxe.EXTERNE);
        }, function (error) {
            console.error('Erreur lors de la récupération des cadrans d\'opportunité :', error);
        });
        this.voletService.getCadranListByTypeT().subscribe(function (cadrans) {
            _this.voletsMenace = _this.filterCadranByTypeAndAxe(cadrans, Volet_model_1.EAxe.EXTERNE);
        }, function (error) {
            console.error('Erreur lors de la récupération des cadrans de menace :', error);
        });
    };
    MatriceswotComponent.prototype.deleteCadran = function (cadranId) {
        var _this = this;
        // Utiliser SweetAlert pour confirmer la suppression
        sweetalert2_1["default"].fire({
            title: 'Êtes-vous sûr de vouloir supprimer ce cadran?',
            text: 'Cette action est irréversible!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Oui, supprimer!'
        }).then(function (result) {
            if (result.isConfirmed) {
                // Supprimer le cadran si l'utilisateur confirme
                _this.voletService.deleteCadran(cadranId).subscribe(function (response) {
                    console.log('Cadran successfully deleted:', response);
                    sweetalert2_1["default"].fire('Supprimé!', 'Le cadran a été supprimé.', 'success');
                    // Rafraîchir la liste après suppression
                    _this.loadVolets();
                }, function (error) {
                    console.error('Error deleting cadran:', error);
                    sweetalert2_1["default"].fire('Erreur!', 'Une erreur est survenue lors de la suppression du cadran.', 'error');
                });
            }
        });
    };
    MatriceswotComponent.prototype.filterCadranByTypeAndAxe = function (cadrans, axe) {
        switch (axe) {
            case Volet_model_1.EAxe.INTERNE:
                return cadrans.filter(function (cadran) { return cadran.type === EType_model_1.EType.STRENGTH || cadran.type === EType_model_1.EType.WEAKNESS; });
            case Volet_model_1.EAxe.EXTERNE:
                return cadrans.filter(function (cadran) { return cadran.type === EType_model_1.EType.OPPORTUNITY || cadran.type === EType_model_1.EType.THREAT; });
            default:
                return [];
        }
    };
    MatriceswotComponent.prototype.getCadranType = function (axe) {
        switch (axe) {
            case Volet_model_1.EAxe.INTERNE:
                return EType_model_1.EType.STRENGTH;
            case Volet_model_1.EAxe.EXTERNE:
                return EType_model_1.EType.OPPORTUNITY;
            default:
                return EType_model_1.EType.STRENGTH;
        }
    };
    MatriceswotComponent.prototype.openUpdatecadrantModal = function (cadranOrId) {
        var _this = this;
        var cadranId;
        if (typeof cadranOrId === 'number') {
            cadranId = cadranOrId;
        }
        else {
            cadranId = cadranOrId.id;
        }
        if (cadranId === undefined) {
            console.error("L'ID du cadran est undefined. Veuillez vérifier.");
            return;
        }
        var dialogRef = this.dialog.open(modifiercadran_component_1.ModifiercadranComponent, {
            width: '500px',
            data: { cadranId: cadranId }
        });
        dialogRef.componentInstance.cadranUpdated.subscribe(function () {
            _this.loadVolets();
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('La fenêtre de dialogue a été fermée');
            // Vous pouvez ajouter un traitement supplémentaire après la fermeture de la modal ici
        });
    };
    MatriceswotComponent.prototype.getCadranById = function (cadranId) {
        // Parcourir tous les tableaux de cadrans pour trouver le cadran avec l'ID donné
        var allCadrans = __spreadArrays(this.voletsForce, this.voletsFaiblesse, this.voletsOpportunite, this.voletsMenace);
        return allCadrans.find(function (cadran) { return cadran.id === cadranId; });
    };
    MatriceswotComponent.prototype.openAddCadranModal = function () {
        var _this = this;
        var dialogRef = this.dialog.open(ajoutercadran_component_1.AjoutercadranComponent, {
            width: '600px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            _this.loadVolets();
        });
    };
    MatriceswotComponent = __decorate([
        core_1.Component({
            selector: 'app-matriceswot',
            templateUrl: './matriceswot.component.html',
            styleUrls: ['./matriceswot.component.css']
        })
    ], MatriceswotComponent);
    return MatriceswotComponent;
}());
exports.MatriceswotComponent = MatriceswotComponent;
