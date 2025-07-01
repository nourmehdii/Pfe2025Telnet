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
exports.PlanifieractionComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var sweetalert2_1 = require("sweetalert2");
var PlanifieractionComponent = /** @class */ (function () {
    function PlanifieractionComponent(actionService, dialogRef, data) {
        this.actionService = actionService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.actionForm = {};
        this.causeId = data === null || data === void 0 ? void 0 : data.causeId; // Ensure causeId is correctly set from injected data
    }
    PlanifieractionComponent.prototype.ngOnInit = function () { };
    PlanifieractionComponent.prototype.planifierAction = function () {
        var _this = this;
        // Check if causeId is defined
        if (this.causeId !== undefined) {
            var action = {
                typeAction: this.actionForm.type,
                responsable: this.actionForm.responsable,
                datePlanification: new Date(this.actionForm.datePlanification),
                dateRealisation: new Date(this.actionForm.dateRealisation),
                critereEfficacite: this.actionForm.critereEfficacite,
                efficace: this.actionForm.efficace,
                commentaire: this.actionForm.commentaire,
                action: this.actionForm.action // Set the action attribute here
            };
            this.actionService.planifierAction(this.causeId, action)
                .subscribe(function (response) {
                console.log('Action planifiée avec succès', response);
                _this.addedAction = response;
                // Display a success swal alert when action is successfully planned
                sweetalert2_1["default"].fire({
                    icon: 'success',
                    title: 'Action planifiée avec succès',
                    showConfirmButton: false,
                    timer: 1500
                }).then(function () {
                    // Close the modal and return the added action as result
                    _this.dialogRef.close(_this.addedAction);
                });
            }, function (error) {
                console.error('Erreur lors de la planification de l\'action', error);
            });
        }
        else {
            console.error('causeId est indéfini');
        }
    };
    PlanifieractionComponent.prototype.onCancel = function () {
        this.dialogRef.close();
    };
    __decorate([
        core_1.Input()
    ], PlanifieractionComponent.prototype, "causeId");
    PlanifieractionComponent = __decorate([
        core_1.Component({
            selector: 'app-planifieraction',
            templateUrl: './planifieraction.component.html',
            styleUrls: ['./planifieraction.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], PlanifieractionComponent);
    return PlanifieractionComponent;
}());
exports.PlanifieractionComponent = PlanifieractionComponent;
