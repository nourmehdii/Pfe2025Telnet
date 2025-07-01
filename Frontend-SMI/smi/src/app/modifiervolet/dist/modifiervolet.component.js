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
exports.ModifiervoletComponent = void 0;
var core_1 = require("@angular/core");
var Volet_model_1 = require("../model/Volet.model");
var sweetalert2_1 = require("sweetalert2");
var dialog_1 = require("@angular/material/dialog");
var ModifiervoletComponent = /** @class */ (function () {
    function ModifiervoletComponent(route, voletService, data, dialogRef) {
        this.route = route;
        this.voletService = voletService;
        this.data = data;
        this.dialogRef = dialogRef;
        this.isOpen = true;
        // Utilisez le type d'énumération EAxe pour les options d'axe
        this.axeOptions = Object.values(Volet_model_1.EAxe);
        this.voletUpdated = new core_1.EventEmitter();
    }
    ModifiervoletComponent.prototype.ngOnInit = function () {
        this.voletId = this.data.voletId;
        this.loadVoletDetails();
    };
    ModifiervoletComponent.prototype.loadVoletDetails = function () {
        var _this = this;
        this.voletService.getVoletById(this.voletId).subscribe(function (volet) {
            _this.voletDetails = volet;
        }, function (error) {
            console.error('Erreur lors du chargement des détails du volet:', error);
        });
    };
    ModifiervoletComponent.prototype.updateVolet = function () {
        var _this = this;
        this.voletService.updateVolet(this.voletId, this.voletDetails).subscribe(function (updatedVolet) {
            console.log('Volet mis à jour avec succès:', updatedVolet);
            sweetalert2_1["default"].fire('Succès', 'Le volet a été mis à jour avec succès.', 'success');
            // Émettre un événement pour indiquer que le volet a été mis à jour
            _this.voletUpdated.emit();
            // Fermer le modal
            _this.dialogRef.close();
        }, function (error) {
            console.error('Erreur lors de la mise à jour du volet:', error);
            sweetalert2_1["default"].fire('Erreur', 'Une erreur s\'est produite lors de la mise à jour du volet.', 'error');
        });
    };
    __decorate([
        core_1.Output()
    ], ModifiervoletComponent.prototype, "voletUpdated");
    ModifiervoletComponent = __decorate([
        core_1.Component({
            selector: 'app-modifiervolet',
            templateUrl: './modifiervolet.component.html',
            styleUrls: ['./modifiervolet.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], ModifiervoletComponent);
    return ModifiervoletComponent;
}());
exports.ModifiervoletComponent = ModifiervoletComponent;
