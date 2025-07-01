"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AjoutercategoriesComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var AjoutercategoriesComponent = /** @class */ (function () {
    function AjoutercategoriesComponent(categoryService, dialogRef) {
        this.categoryService = categoryService;
        this.dialogRef = dialogRef;
        this.categories = [];
        this.newCategory = {
            name: ''
        };
    }
    AjoutercategoriesComponent.prototype.ngOnInit = function () {
        this.loadCategoryList();
    };
    AjoutercategoriesComponent.prototype.ajouterCategory = function () {
        var _this = this;
        this.categoryService.createCategory(this.newCategory).subscribe(function (response) {
            console.log('Catégorie ajoutée avec succès : ', response);
            // Afficher une pop-up de succès
            sweetalert2_1["default"].fire({
                icon: 'success',
                title: 'Catégorie ajoutée avec succès!',
                showConfirmButton: false,
                timer: 1500
            });
            // Rafraîchir la liste des catégories après l'ajout avec succès
            // Réinitialiser le formulaire
            _this.newCategory = { name: '' };
            // Fermer le modal après l'ajout avec succès
            _this.dialogRef.close();
            _this.loadCategoryList();
        }, function (error) {
            console.error('Erreur lors de l\'ajout de la catégorie : ', error);
            // Afficher une pop-up d'erreur
            sweetalert2_1["default"].fire({
                icon: 'error',
                title: 'Erreur lors de l\'ajout de la catégorie',
                text: 'Veuillez réessayer plus tard.'
            });
            // Gérez l'erreur comme nécessaire
        });
    };
    // Méthode pour charger la liste des catégories
    AjoutercategoriesComponent.prototype.loadCategoryList = function () {
        var _this = this;
        this.categoryService.getCategoryList().subscribe(function (categories) {
            // Mettre à jour la liste des catégories avec la nouvelle liste récupérée depuis le service
            _this.categories = categories;
        }, function (error) {
            console.error('Erreur lors de la récupération de la liste des catégories : ', error);
            // Gérez l'erreur comme nécessaire
        });
    };
    AjoutercategoriesComponent = __decorate([
        core_1.Component({
            selector: 'app-ajoutercategories',
            templateUrl: './ajoutercategories.component.html',
            styleUrls: ['./ajoutercategories.component.css']
        })
    ], AjoutercategoriesComponent);
    return AjoutercategoriesComponent;
}());
exports.AjoutercategoriesComponent = AjoutercategoriesComponent;
