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
exports.ModifieractiviteComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var sweetalert2_1 = require("sweetalert2");
var ModifieractiviteComponent = /** @class */ (function () {
    function ModifieractiviteComponent(activityService, dialogRef, data) {
        this.activityService = activityService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.activity = { name: '', description: '', processus: [] };
        this.processusList = [];
        this.selectedProcessus = [];
        this.newProcessusName = '';
    }
    ModifieractiviteComponent.prototype.ngOnInit = function () {
        this.fetchActivityDetails();
        this.fetchAllProcessus();
    };
    ModifieractiviteComponent.prototype.fetchActivityDetails = function () {
        var _this = this;
        this.activityService.getActivityById(this.data.id).subscribe(function (activity) {
            _this.activity = activity;
            _this.selectedProcessus = _this.activity.processus; // Récupérer les processus liés à l'activité
        }, function (error) {
            console.error('Error fetching activity details:', error);
        });
    };
    ModifieractiviteComponent.prototype.fetchAllProcessus = function () {
        var _this = this;
        this.activityService.getProcessusList().subscribe(function (processusList) {
            _this.processusList = processusList;
        }, function (error) {
            console.error('Error fetching processus list:', error);
        });
    };
    ModifieractiviteComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    ModifieractiviteComponent.prototype.addNewProcessus = function () {
        if (this.newProcessusName && this.newProcessusName.trim() !== '') {
            var newProcessus = { id: null, name: this.newProcessusName.trim(), description: '' };
            this.activity.processus.push(newProcessus);
            this.selectedProcessus.push(newProcessus);
            this.newProcessusName = '';
        }
    };
    ModifieractiviteComponent.prototype.updateActivity = function () {
        var _this = this;
        this.activity.processus = this.selectedProcessus;
        this.activityService.updateActivity(this.activity.id, this.activity).subscribe(function (updatedActivity) {
            console.log('Activity updated successfully:', updatedActivity);
            // Afficher une notification de succès avec SweetAlert
            sweetalert2_1["default"].fire({
                icon: 'success',
                title: 'Success',
                text: 'Activity updated successfully'
            });
            _this.dialogRef.close(updatedActivity);
        }, function (error) {
            console.error('Error updating activity:', error);
            // Afficher une notification d'erreur avec SweetAlert
            sweetalert2_1["default"].fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while updating the activity'
            });
        });
    };
    ModifieractiviteComponent.prototype.compareProcessus = function (processus1, processus2) {
        return processus1 && processus2 ? processus1.id === processus2.id : processus1 === processus2;
    };
    ModifieractiviteComponent = __decorate([
        core_1.Component({
            selector: 'app-modifieractivite',
            templateUrl: './modifieractivite.component.html',
            styleUrls: ['./modifieractivite.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], ModifieractiviteComponent);
    return ModifieractiviteComponent;
}());
exports.ModifieractiviteComponent = ModifieractiviteComponent;
