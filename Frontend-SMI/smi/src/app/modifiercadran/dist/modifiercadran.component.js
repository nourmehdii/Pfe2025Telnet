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
exports.ModifiercadranComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var dialog_1 = require("@angular/material/dialog");
var ModifiercadranComponent = /** @class */ (function () {
    function ModifiercadranComponent(route, cadranService, // Assurez-vous d'utiliser le bon service
    data, dialogRef) {
        this.route = route;
        this.cadranService = cadranService;
        this.data = data;
        this.dialogRef = dialogRef;
        this.cadranUpdated = new core_1.EventEmitter();
    }
    ModifiercadranComponent.prototype.ngOnInit = function () {
        this.cadranId = this.data.cadranId; // Utilisez la bonne clé pour obtenir l'ID du cadran
        this.loadCadranDetails(); // Appelez la méthode pour charger les détails du cadran
    };
    ModifiercadranComponent.prototype.loadCadranDetails = function () {
        var _this = this;
        this.cadranService.getCadranById(this.cadranId).subscribe(function (cadran) {
            _this.cadranDetails = cadran;
            console.log('Détails du cadran chargés avec succès:', _this.cadranDetails);
        }, function (error) {
            console.error('Erreur lors du chargement des détails du cadran:', error);
        });
    };
    ModifiercadranComponent.prototype.updateCadran = function () {
        var _this = this;
        // Assurez-vous que l'ID du cadran est défini
        if (this.cadranId !== undefined) {
            // Utilisez directement la propriété name de cadranDetails
            this.cadranService.updateCadran(this.cadranId, this.cadranDetails).subscribe(function (updatedCadran) {
                console.log('Cadran mis à jour avec succès:', updatedCadran);
                sweetalert2_1["default"].fire('Succès', 'Le cadran a été mis à jour avec succès.', 'success');
                // Émettre un événement pour indiquer que le cadran a été mis à jour
                _this.cadranUpdated.emit();
                // Fermer le modal
                _this.dialogRef.close();
            }, function (error) {
                console.error('Erreur lors de la mise à jour du cadran:', error);
                sweetalert2_1["default"].fire('Erreur', 'Une erreur s\'est produite lors de la mise à jour du cadran.', 'error');
            });
        }
        else {
            console.error('ID du cadran non défini');
        }
    };
    __decorate([
        core_1.Output()
    ], ModifiercadranComponent.prototype, "cadranUpdated");
    ModifiercadranComponent = __decorate([
        core_1.Component({
            selector: 'app-modifiercadran',
            templateUrl: './modifiercadran.component.html',
            styleUrls: ['./modifiercadran.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], ModifiercadranComponent);
    return ModifiercadranComponent;
}());
exports.ModifiercadranComponent = ModifiercadranComponent;
