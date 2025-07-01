"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListactivitesComponent = void 0;
var core_1 = require("@angular/core");
var ajouteractivite_component_1 = require("../ajouteractivite/ajouteractivite.component");
var modifieractivite_component_1 = require("../modifieractivite/modifieractivite.component");
var detailsprocessus_component_1 = require("../detailsprocessus/detailsprocessus.component");
var sweetalert2_1 = require("sweetalert2");
var ListactivitesComponent = /** @class */ (function () {
    function ListactivitesComponent(activityService, dialog) {
        this.activityService = activityService;
        this.dialog = dialog;
        this.newActivity = { id: 0, name: '', description: '', processus: [] }; // Déclaration de la propriété newActivity
        this.p = 1;
    } // Injection de MatDialog
    ListactivitesComponent.prototype.ngOnInit = function () {
        this.fetchActivityLists(); // Appel à la méthode pour récupérer la liste des activités lors de l'initialisation du composant
    };
    ListactivitesComponent.prototype.fetchActivityLists = function () {
        var _this = this;
        this.activityService.getActivities().subscribe(function (data) {
            _this.activities = data; // Stocke la liste des activités récupérées dans la propriété 'activities'
        }, function (error) {
            console.error('Error fetching activity list:', error);
        });
    };
    ListactivitesComponent.prototype.deleteActivity = function (activityId) {
        var _this = this;
        this.activityService.deleteActivity(activityId).subscribe(function (response) {
            console.log('Activity deleted successfully');
            // Supprimez l'activité de la liste des activités affichées
            _this.activities = _this.activities.filter(function (activity) { return activity.id !== activityId; });
            // Afficher une notification de succès avec SweetAlert
            sweetalert2_1["default"].fire({
                icon: 'success',
                title: 'Success',
                text: 'Activity deleted successfully'
            }).then(function () {
                _this.fetchActivityLists(); // Rafraîchir la liste après la suppression réussie
            });
        }, function (error) {
            console.error('Error deleting activity:', error);
            // Afficher une notification d'erreur avec SweetAlert
            sweetalert2_1["default"].fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while deleting the activity'
            });
        });
    };
    ListactivitesComponent.prototype.createActivity = function () {
        var _this = this;
        this.activityService.createActivity(this.newActivity).subscribe(function (createdActivity) {
            console.log('Activity created successfully:', createdActivity);
            // Effectuez des actions supplémentaires si nécessaire, comme rediriger l'utilisateur vers une autre page
            _this.fetchActivityLists();
        }, function (error) {
            console.error('Error creating activity:', error);
        });
    };
    ListactivitesComponent.prototype.openAjouterActiviteModal = function () {
        var dialogRef = this.dialog.open(ajouteractivite_component_1.AjouteractiviteComponent, {
            width: '500px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            // Vous pouvez ajouter un traitement supplémentaire après la fermeture de la modal ici
        });
    };
    ListactivitesComponent.prototype.openDetailsprocessuseModal = function (activityId) {
        var dialogRef = this.dialog.open(detailsprocessus_component_1.DetailsprocessusComponent, {
            width: '500px',
            data: { activityId: activityId } // Passer l'ID de l'activité à la modal
            // Vous pouvez ajouter d'autres options de modal ici
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            // Ajoutez ici tout traitement supplémentaire après la fermeture de la modal
        });
    };
    // Appeler cette méthode lorsque vous souhaitez ouvrir le modal pour la modification d'une activité
    ListactivitesComponent.prototype.openUpdateModal = function (activityId) {
        var _this = this;
        var dialogRef = this.dialog.open(modifieractivite_component_1.ModifieractiviteComponent, {
            width: '500px',
            data: { id: activityId } // Transmettre un objet avec une propriété id
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            // Mettre à jour la liste des activités si nécessaire
            if (result) {
                _this.fetchActivityLists();
            }
        });
    };
    ListactivitesComponent = __decorate([
        core_1.Component({
            selector: 'app-listactivites',
            templateUrl: './listactivites.component.html',
            styleUrls: ['./listactivites.component.css']
        })
    ], ListactivitesComponent);
    return ListactivitesComponent;
}());
exports.ListactivitesComponent = ListactivitesComponent;
