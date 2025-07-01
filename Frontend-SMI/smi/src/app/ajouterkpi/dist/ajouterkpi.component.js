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
exports.AjouterkpiComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var forms_1 = require("@angular/forms");
var sweetalert2_1 = require("sweetalert2");
var AjouterkpiComponent = /** @class */ (function () {
    function AjouterkpiComponent(userService, dialogRef, snackBar, dialog, data) {
        this.userService = userService;
        this.dialogRef = dialogRef;
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.data = data;
        this.kpiNameFormControl = new forms_1.FormControl('', forms_1.Validators.required);
        this.kpiObjectifFormControl = new forms_1.FormControl('', forms_1.Validators.required);
        this.kpiFrequenceFormControl = new forms_1.FormControl('', forms_1.Validators.required);
    }
    AjouterkpiComponent.prototype.ngOnInit = function () {
        // Define processusId as a local constant
        var processusId = this.data.processusId;
        // Check if processusId is defined
        if (!processusId) {
            console.error('processusId is missing or undefined');
            sweetalert2_1["default"].fire('Erreur', 'processusId is missing or undefined', 'error');
        }
    };
    AjouterkpiComponent.prototype.onAddKpi = function () {
        var _this = this;
        // Use processusId directly from dialog data
        var processusId = this.data.processusId;
        if (this.kpiNameFormControl.valid && this.kpiObjectifFormControl.valid && this.kpiFrequenceFormControl.valid) {
            if (!processusId) {
                console.error('processusId is missing');
                sweetalert2_1["default"].fire('Erreur', 'processusId is missing', 'error');
                return;
            }
            var kpi = {
                name: this.kpiNameFormControl.value,
                objectif: this.kpiObjectifFormControl.value,
                frequence: this.kpiFrequenceFormControl.value
            };
            this.userService.addKpiToProcessus(processusId, kpi).subscribe(function (response) {
                console.log('KPI ajouté avec succès:', response);
                _this.dialogRef.close();
                sweetalert2_1["default"].fire('Succès', 'Le KPI a été ajouté avec succès', 'success');
            }, function (error) {
                console.error('Erreur lors de l\'ajout du KPI:', error);
                sweetalert2_1["default"].fire('Erreur', 'Une erreur s\'est produite lors de l\'ajout du KPI', 'error');
            });
        }
        else {
            sweetalert2_1["default"].fire('Erreur', 'Veuillez remplir tous les champs du formulaire', 'error');
        }
    };
    AjouterkpiComponent.prototype.onClose = function () {
        this.dialogRef.close();
    };
    AjouterkpiComponent = __decorate([
        core_1.Component({
            selector: 'app-ajouterkpi',
            templateUrl: './ajouterkpi.component.html',
            styleUrls: ['./ajouterkpi.component.css']
        }),
        __param(4, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], AjouterkpiComponent);
    return AjouterkpiComponent;
}());
exports.AjouterkpiComponent = AjouterkpiComponent;
