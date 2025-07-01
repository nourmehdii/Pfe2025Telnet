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
exports.PipsModalComponentComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var modifierpip_component_1 = require("../modifierpip/modifierpip.component");
var sweetalert2_1 = require("sweetalert2");
var PipsModalComponentComponent = /** @class */ (function () {
    function PipsModalComponentComponent(dialogRef, data, pipService, dialog, changeDetectorRef) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.pipService = pipService;
        this.dialog = dialog;
        this.changeDetectorRef = changeDetectorRef;
        this.pips = [];
    }
    PipsModalComponentComponent.prototype.closeModal = function () {
        this.dialogRef.close();
    };
    PipsModalComponentComponent.prototype.deletePip = function (pip) {
        var _this = this;
        sweetalert2_1["default"].fire({
            title: "\u00CAtes-vous s\u00FBr de vouloir supprimer " + pip.name + " ?",
            text: "Cette action est irréversible !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer !'
        }).then(function (result) {
            if (result.isConfirmed) {
                _this.pipService.deletePip(pip.id).subscribe({
                    next: function () {
                        _this.data.pips = _this.data.pips.filter(function (p) { return p.id !== pip.id; });
                        _this.changeDetectorRef.detectChanges();
                        sweetalert2_1["default"].fire('Supprimé !', 'Le PIP a été supprimé avec succès.', 'success');
                    },
                    error: function (error) {
                        console.error('Erreur lors de la suppression du PIP :', error);
                        sweetalert2_1["default"].fire('Erreur !', 'Échec de la suppression du PIP. Veuillez réessayer plus tard.', 'error');
                    }
                });
            }
        });
    };
    PipsModalComponentComponent.prototype.editPipModal = function (pip) {
        var _this = this;
        var dialogRef = this.dialog.open(modifierpip_component_1.ModifierpipComponent, {
            width: '600px',
            data: { pipId: pip.id }
        });
        dialogRef.componentInstance.pipUpdated.subscribe(function (updatedPip) {
            var index = _this.data.pips.findIndex(function (p) { return p.id === updatedPip.id; });
            if (index !== -1) {
                _this.data.pips[index] = updatedPip;
                _this.changeDetectorRef.detectChanges();
            }
        });
    };
    PipsModalComponentComponent.prototype.refreshPips = function (categoryId) {
        var _this = this;
        this.pipService.getPipsByCategory(categoryId).subscribe(function (pips) {
            _this.data.pips = pips;
            _this.changeDetectorRef.detectChanges();
        }, function (error) {
            console.error('Erreur lors du rafraîchissement des PIPs :', error);
            sweetalert2_1["default"].fire('Erreur !', 'Échec du rafraîchissement des PIPs. Veuillez réessayer plus tard.', 'error');
        });
    };
    PipsModalComponentComponent = __decorate([
        core_1.Component({
            selector: 'app-pips-modal-component',
            templateUrl: './pips-modal-component.component.html',
            styleUrls: ['./pips-modal-component.component.css']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], PipsModalComponentComponent);
    return PipsModalComponentComponent;
}());
exports.PipsModalComponentComponent = PipsModalComponentComponent;
