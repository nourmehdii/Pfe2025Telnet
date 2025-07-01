"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AjouteractiviteComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var sweetalert2_1 = require("sweetalert2");
var AjouteractiviteComponent = /** @class */ (function () {
    function AjouteractiviteComponent(userService) {
        this.userService = userService;
        this.newActivity = {
            id: 0,
            name: '',
            description: '',
            processus: [] // Assurez-vous que processus est initialisé correctement selon votre modèle
        };
        this.processusList = []; // Déclarez la propriété processusList de type Processus
        this.selectedProcessus = new forms_1.FormControl(); // Initialisez le formulaire de sélection de processus
    }
    AjouteractiviteComponent.prototype.ngOnInit = function () {
        this.fetchProcessusList(); // Appeler la méthode pour récupérer la liste des processus lors de l'initialisation du composant
    };
    AjouteractiviteComponent.prototype.fetchProcessusList = function () {
        var _this = this;
        // Appeler le service pour récupérer la liste des processus
        this.userService.getProcessusList().subscribe(function (data) {
            _this.processusList = data; // Assigner la liste des processus récupérée à la propriété processusList
            console.log('Processus list:', _this.processusList); // Vérifier les données des processus récupérées
        }, function (error) {
            console.error('Error fetching processus list:', error);
        });
    };
    AjouteractiviteComponent.prototype.createActivity = function () {
        var selectedProcessusIds = this.selectedProcessus.value;
        var selectedProcessusObjects = this.processusList.filter(function (processus) { return selectedProcessusIds.includes(processus.id); });
        this.newActivity.processus = selectedProcessusObjects;
        console.log('Selected processus:', this.selectedProcessus.value);
        this.userService.createActivity(this.newActivity)
            .subscribe(function (createdActivity) {
            console.log('Activity created successfully:', createdActivity);
            // Afficher une notification de succès avec SweetAlert
            sweetalert2_1["default"].fire({
                icon: 'success',
                title: 'Success',
                text: 'Activity created successfully'
            });
            // Réinitialiser les valeurs du formulaire ou effectuer d'autres actions nécessaires après la création réussie de l'activité
        }, function (error) {
            console.error('Error creating activity:', error);
            // Afficher une notification d'erreur avec SweetAlert
            sweetalert2_1["default"].fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while creating the activity'
            });
            // Gérer les erreurs ici (par exemple, afficher un message d'erreur à l'utilisateur)
        });
    };
    AjouteractiviteComponent = __decorate([
        core_1.Component({
            selector: 'app-ajouteractivite',
            templateUrl: './ajouteractivite.component.html',
            styleUrls: ['./ajouteractivite.component.css']
        })
    ], AjouteractiviteComponent);
    return AjouteractiviteComponent;
}());
exports.AjouteractiviteComponent = AjouteractiviteComponent;
