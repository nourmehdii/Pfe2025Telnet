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
exports.DetailsprocessusComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var DetailsprocessusComponent = /** @class */ (function () {
    function DetailsprocessusComponent(userService, dialogRef, data) {
        this.userService = userService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.processus = [];
    }
    DetailsprocessusComponent.prototype.ngOnInit = function () {
        var _this = this;
        var activityId = this.data.activityId;
        this.userService.getProcessusByActivityId(activityId).subscribe(function (processus) {
            _this.processus = processus;
        }, function (error) {
            console.error('Error fetching processus:', error);
            // Gérer l'erreur ici
        });
    };
    DetailsprocessusComponent.prototype.closeModal = function () {
        this.dialogRef.close();
    };
    DetailsprocessusComponent = __decorate([
        core_1.Component({
            selector: 'app-detailsprocessus',
            templateUrl: './detailsprocessus.component.html',
            styleUrls: ['./detailsprocessus.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DetailsprocessusComponent);
    return DetailsprocessusComponent;
}());
exports.DetailsprocessusComponent = DetailsprocessusComponent;
