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
exports.ModifieractionComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var forms_1 = require("@angular/forms");
var sweetalert2_1 = require("sweetalert2");
var TypeAction_model_1 = require("../model/TypeAction.model");
var ModifieractionComponent = /** @class */ (function () {
    function ModifieractionComponent(formBuilder, userService, data, dialogRef) {
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.data = data;
        this.dialogRef = dialogRef;
        this.newAction = null;
        this.typeActions = Object.values(TypeAction_model_1.TypeAction); // Obtenez les valeurs de l'enum TypeAction
    }
    ModifieractionComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.data && this.data.actionId) {
            this.userService.getActionById(this.data.actionId).subscribe(function (action) {
                _this.newAction = action;
                console.log('newAction:', _this.newAction);
                _this.initForm();
                _this.loadAction(); // Assurez-vous que loadAction est appelée après initForm
                _this.actionId = _this.data.actionId;
                console.log('actionId:', _this.actionId);
            }, function (error) {
                console.error('Error retrieving action:', error);
                // Gérer l'erreur ici
            });
        }
    };
    ModifieractionComponent.prototype.initForm = function () {
        this.actionForm = this.formBuilder.group({
            typeAction: [this.newAction ? this.newAction.typeAction : null, forms_1.Validators.required],
            responsable: [this.newAction ? this.newAction.responsable : '', forms_1.Validators.required],
            datePlanification: [this.newAction ? this.formatDate(this.newAction.datePlanification) : '', forms_1.Validators.required],
            dateRealisation: [this.newAction ? this.formatDate(this.newAction.dateRealisation) : '', forms_1.Validators.required],
            critereEfficacite: [this.newAction ? this.newAction.critereEfficacite : '', forms_1.Validators.required],
            efficace: [this.newAction ? this.newAction.efficace : false],
            commentaire: [this.newAction ? this.newAction.commentaire : '']
        });
    };
    ModifieractionComponent.prototype.loadAction = function () {
        if (this.newAction) {
            this.actionForm.patchValue({
                typeAction: this.newAction.typeAction,
                responsable: this.newAction.responsable,
                datePlanification: this.formatDate(this.newAction.datePlanification),
                dateRealisation: this.formatDate(this.newAction.dateRealisation),
                critereEfficacite: this.newAction.critereEfficacite,
                efficace: this.newAction.efficace,
                commentaire: this.newAction.commentaire
            });
        }
    };
    ModifieractionComponent.prototype.modifierAction = function () {
        if (!this.newAction) {
            console.error('No action data available.');
            return;
        }
        var formData = this.actionForm.value;
        this.newAction.typeAction = formData.typeAction;
        this.newAction.responsable = formData.responsable;
        this.newAction.datePlanification = formData.datePlanification;
        this.newAction.dateRealisation = formData.dateRealisation;
        this.newAction.critereEfficacite = formData.critereEfficacite;
        this.newAction.efficace = formData.efficace;
        this.newAction.commentaire = formData.commentaire;
        var actionId = this.actionId;
        this.userService.modifierAction(actionId, this.newAction).subscribe(function (response) {
            console.log('Action modifiée avec succès:', response);
            sweetalert2_1["default"].fire('Modifiée!', 'L\'action a été modifiée avec succès.', 'success');
        }, function (error) {
            console.error('Erreur lors de la modification de l\'action:', error);
            sweetalert2_1["default"].fire('Erreur!', 'Une erreur est survenue lors de la modification de l\'action.', 'error');
        });
    };
    ModifieractionComponent.prototype.formatDate = function (date) {
        var formattedDate = new Date(date);
        return formattedDate.toISOString().split('T')[0];
    };
    ModifieractionComponent = __decorate([
        core_1.Component({
            selector: 'app-modifieraction',
            templateUrl: './modifieraction.component.html',
            styleUrls: ['./modifieraction.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], ModifieractionComponent);
    return ModifieractionComponent;
}());
exports.ModifieractionComponent = ModifieractionComponent;
