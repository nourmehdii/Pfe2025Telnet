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
exports.EmailModalComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var EmailModalComponent = /** @class */ (function () {
    function EmailModalComponent(dialogRef, data, snackBar) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.snackBar = snackBar;
    }
    EmailModalComponent.prototype.onCancelClick = function () {
        this.dialogRef.close('cancel');
    };
    EmailModalComponent.prototype.send = function () {
        if (this.emailAddress) {
            this.dialogRef.close('send');
            this.showSnackBar(); // Call method to show snackbar
        }
    };
    EmailModalComponent.prototype.showSnackBar = function () {
        this.snackBar.open('Email envoyé avec succès', 'Fermer', {
            duration: 3000 // Duration in milliseconds
        });
    };
    EmailModalComponent = __decorate([
        core_1.Component({
            selector: 'app-email-modal',
            template: "\n    <h2 mat-dialog-title class=\"modal-title\">{{ data.subject }}</h2>\n    <div mat-dialog-content class=\"modal-content\">\n      <p class=\"modal-message\">Voulez-vous envoyer ce rapport par email au administrateur?</p>\n      <mat-form-field appearance=\"fill\" class=\"email-input\">\n        <textarea matInput placeholder=\"Entrez l'adresse email\" [(ngModel)]=\"emailAddress\"></textarea>\n      </mat-form-field>\n    </div>\n    <div mat-dialog-actions class=\"modal-actions\">\n      <button mat-button class=\"cancel-button\" (click)=\"onCancelClick()\">Annuler</button>\n      <button mat-button class=\"send-button\" color=\"primary\" [disabled]=\"!emailAddress\" (click)=\"send()\">Envoyer</button>\n    </div>\n  ",
            styles: ["\n    .modal-title {\n      font-size: 24px;\n      font-weight: bold;\n      color: #3f51b5;\n      text-align: center;\n      margin-bottom: 20px;\n    }\n    .modal-content {\n      padding: 20px;\n      text-align: center;\n    }\n    .modal-message {\n      font-size: 16px;\n      margin-bottom: 20px;\n    }\n    .email-input {\n      width: 100%;\n    }\n    .modal-actions {\n      display: flex;\n      justify-content: flex-end; /* Aligner les boutons \u00E0 droite */\n      flex-direction: row; /* Assurer une disposition horizontale */\n      padding: 20px;\n    }\n    button[mat-button] {\n      position: relative;\n      overflow: hidden;\n      border: none;\n      border-radius: 4px;\n      padding: 8px 16px; /* R\u00E9duire la taille des boutons */\n      font-size: 14px; /* R\u00E9duire la taille de la police */\n      font-weight: bold;\n      cursor: pointer;\n      transition: all 0.3s ease;\n    }\n    button[mat-button]::before {\n      content: '';\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      width: 300%;\n      height: 300%;\n      background: rgba(255, 255, 255, 0.2);\n      transition: all 0.6s;\n      border-radius: 50%;\n      pointer-events: none;\n      transform: translate(-50%, -50%) scale(0);\n    }\n    button[mat-button]:hover::before {\n      transform: translate(-50%, -50%) scale(1);\n    }\n    .cancel-button {\n      background: linear-gradient(45deg, #ff5252, #ff1744);\n      color: #fff;\n      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n      margin-right: 10px; /* Ajouter de l'espace \u00E0 droite du bouton \"Annuler\" */\n    }\n    .send-button {\n      background: linear-gradient(45deg, #66bb6a, #43a047);\n      color: #fff;\n      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n    }\n    .cancel-button:hover, .send-button:hover {\n      opacity: 0.9;\n      transform: translateY(-2px);\n      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);\n    }\n    .cancel-button:active, .send-button:active {\n      transform: translateY(0);\n      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n    }\n  "]
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], EmailModalComponent);
    return EmailModalComponent;
}());
exports.EmailModalComponent = EmailModalComponent;
