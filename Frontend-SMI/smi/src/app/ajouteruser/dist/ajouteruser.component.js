"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AjouteruserComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2"); // Importer SweetAlert
var AjouteruserComponent = /** @class */ (function () {
    function AjouteruserComponent(userService, dialog) {
        this.userService = userService;
        this.dialog = dialog;
        this.user = {
            activities: []
        };
        this.activities = [];
        this.selectedRole = '';
        this.selectedActivities = [];
    }
    AjouteruserComponent_1 = AjouteruserComponent;
    AjouteruserComponent.prototype.ngOnInit = function () {
        this.loadActivities();
    };
    AjouteruserComponent.prototype.loadActivities = function () {
        var _this = this;
        this.userService.getActivities().subscribe(function (data) {
            _this.activities = data;
        });
    };
    AjouteruserComponent.prototype.openAjouterprojetModal = function () {
        var dialogRef = this.dialog.open(AjouteruserComponent_1, {
            width: '500px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
        });
    };
    AjouteruserComponent.prototype.onActivityChange = function (event, activity) {
        if (event.target.checked) {
            this.selectedActivities.push(activity);
        }
        else {
            var index = this.selectedActivities.findIndex(function (a) { return a.id === activity.id; });
            if (index !== -1) {
                this.selectedActivities.splice(index, 1);
            }
        }
    };
    AjouteruserComponent.prototype.register = function () {
        console.log('Selected Role:', this.selectedRole);
        console.log('Selected Activities:', this.selectedActivities);
        if (!this.selectedRole || this.selectedActivities.length === 0) {
            sweetalert2_1["default"].fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Veuillez sélectionner un rôle et au moins une activité.'
            });
            return;
        }
        this.user.role = this.selectedRole;
        this.user.activities = this.selectedActivities;
        this.userService.register(this.user).subscribe(function (response) {
            sweetalert2_1["default"].fire({
                icon: 'success',
                title: 'Success!',
                text: 'L\'utilisateur a été enregistré avec succès.'
            });
            console.log(response);
        }, function (error) {
            sweetalert2_1["default"].fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Une erreur s\'est produite lors de l\'enregistrement de l\'utilisateur.'
            });
            console.error(error);
        });
    };
    var AjouteruserComponent_1;
    AjouteruserComponent = AjouteruserComponent_1 = __decorate([
        core_1.Component({
            selector: 'app-ajouteruser',
            templateUrl: './ajouteruser.component.html',
            styleUrls: ['./ajouteruser.component.css']
        })
    ], AjouteruserComponent);
    return AjouteruserComponent;
}());
exports.AjouteruserComponent = AjouteruserComponent;
