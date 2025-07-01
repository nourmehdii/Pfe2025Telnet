"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.ModifierclientComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var sweetalert2_1 = require("sweetalert2");
var ModifierclientComponent = /** @class */ (function () {
    function ModifierclientComponent(dialogRef, data, clientService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.clientService = clientService;
    }
    ModifierclientComponent.prototype.ngOnInit = function () {
        if (this.data && this.data.clientDetails) {
            this.updatedClient = __assign({}, this.data.clientDetails);
        }
        else {
            console.error('Données clientDetails manquantes ou incorrectes.');
            this.updatedClient = {
                name: '', phone: '', active: false, email: '', streetAddress: '', city: '',
                state: '', postalCode: '', country: '', notes: ''
            };
        }
    };
    ModifierclientComponent.prototype.updateClient = function () {
        var _this = this;
        var id = this.data.clientId;
        this.clientService.updateClient(id, this.updatedClient)
            .subscribe(function (response) {
            sweetalert2_1["default"].fire({
                icon: 'success',
                title: 'Succès',
                text: 'Client mis à jour avec succès',
                width: '20rem',
                timer: 2000,
                timerProgressBar: true,
                toast: true,
                position: 'top-end',
                showConfirmButton: false
            });
            _this.dialogRef.close(true); // Passer true pour indiquer que la mise à jour a réussi
        }, function (error) {
            sweetalert2_1["default"].fire({
                icon: 'error',
                title: 'Erreur',
                text: "Erreur lors de la mise \u00E0 jour du client : " + error.message,
                width: '20rem',
                timer: 2000,
                timerProgressBar: true,
                toast: true,
                position: 'top-end',
                showConfirmButton: false
            });
            console.error('Erreur lors de la mise à jour du client :', error);
            _this.dialogRef.close(false); // Passer false pour indiquer que la mise à jour a échoué
        });
    };
    ModifierclientComponent.prototype.closeModal = function () {
        this.dialogRef.close();
    };
    ModifierclientComponent = __decorate([
        core_1.Component({
            selector: 'app-modifierclient',
            templateUrl: './modifierclient.component.html',
            styleUrls: ['./modifierclient.component.css']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], ModifierclientComponent);
    return ModifierclientComponent;
}());
exports.ModifierclientComponent = ModifierclientComponent;
