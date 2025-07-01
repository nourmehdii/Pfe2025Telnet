"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppMenuComponent = void 0;
var core_1 = require("@angular/core");
var AppMenuComponent = /** @class */ (function () {
    function AppMenuComponent(userService) {
        this.userService = userService;
    }
    AppMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Récupérer l'ID de l'utilisateur depuis le localStorage
        var userIdString = localStorage.getItem('userId');
        if (userIdString) {
            this.userId = +userIdString;
        }
        else {
            console.error('ID de l\'utilisateur introuvable dans le stockage local');
        }
        // Appel à l'API pour récupérer le rôle de l'utilisateur
        if (this.userId) {
            this.userService.getRoleByUserId(this.userId).subscribe(function (role) {
                _this.role = role;
            }, function (error) {
                console.error('Erreur lors de la récupération du rôle de l\'utilisateur :', error);
            });
        }
    };
    AppMenuComponent = __decorate([
        core_1.Component({
            selector: 'app-app-menu',
            templateUrl: './app-menu.component.html',
            styleUrls: ['./app-menu.component.css']
        })
    ], AppMenuComponent);
    return AppMenuComponent;
}());
exports.AppMenuComponent = AppMenuComponent;
