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
exports.ClientDetailsComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var jspdf_1 = require("jspdf");
var html2canvas_1 = require("html2canvas");
var ClientDetailsComponent = /** @class */ (function () {
    function ClientDetailsComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.client = data.clientDetails;
    }
    ClientDetailsComponent.prototype.ngOnInit = function () {
        throw new Error('Method not implemented.');
    };
    ClientDetailsComponent.prototype.closeModal = function () {
        this.dialogRef.close();
    };
    ClientDetailsComponent.prototype.printPdf = function () {
        var content = document.getElementById('client-details-content');
        if (content) {
            // Masquer tous les boutons avant la capture
            var buttons_1 = document.querySelectorAll('button');
            buttons_1.forEach(function (button) { return button.setAttribute('style', 'display: none'); });
            html2canvas_1["default"](content).then(function (canvas) {
                var imgWidth = 180; // Largeur réduite pour minimiser la taille de la fiche
                var pageHeight = 295; // Hauteur de la page A4 en mm
                var imgHeight = canvas.height * imgWidth / canvas.width;
                var imgData = canvas.toDataURL('image/png');
                var pdf = new jspdf_1["default"]('p', 'mm', 'a4');
                // Ajouter le logo en haut au centre de la page
                var logo = 'assets/images/LogoTelnet.png';
                var logoImg = new Image();
                logoImg.src = logo;
                logoImg.onload = function () {
                    // Centrer le logo sur la page
                    var logoWidth = 60; // Largeur du logo
                    var logoHeight = 20; // Hauteur du logo
                    var logoX = (pdf.internal.pageSize.width - logoWidth) / 2;
                    pdf.addImage(logoImg, 'PNG', logoX, 10, logoWidth, logoHeight); // Position et taille du logo
                    // Ajouter un encadré autour des détails du client
                    var margin = 10; // Marge autour de la fiche
                    var contentWidth = imgWidth + 2 * margin; // Largeur totale avec bordure
                    var contentHeight = imgHeight + 2 * margin; // Hauteur totale avec bordure
                    pdf.setDrawColor(0, 0, 0); // Couleur de la bordure (noir)
                    pdf.setLineWidth(0.5); // Épaisseur de la bordure
                    // Ajouter la fiche en dessous du logo
                    var position = 30 + logoHeight + margin;
                    pdf.addImage(imgData, 'PNG', margin + 10, position + 10, imgWidth, imgHeight);
                    pdf.save('client-details.pdf');
                    // Restaurer les boutons après la capture
                    buttons_1.forEach(function (button) { return button.setAttribute('style', 'display: block'); });
                };
            });
        }
    };
    ClientDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-client-details',
            templateUrl: './client-details.component.html',
            styleUrls: ['./client-details.component.css']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], ClientDetailsComponent);
    return ClientDetailsComponent;
}());
exports.ClientDetailsComponent = ClientDetailsComponent;
