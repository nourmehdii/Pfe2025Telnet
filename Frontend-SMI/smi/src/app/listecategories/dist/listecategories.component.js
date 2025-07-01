"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListecategoriesComponent = void 0;
var core_1 = require("@angular/core");
var ajoutercategories_component_1 = require("../ajoutercategories/ajoutercategories.component");
var modifiecategorie_component_1 = require("../modifiecategorie/modifiecategorie.component");
var sweetalert2_1 = require("sweetalert2");
var ListecategoriesComponent = /** @class */ (function () {
    function ListecategoriesComponent(categoryService, dialog) {
        this.categoryService = categoryService;
        this.dialog = dialog;
        this.categories = [];
        this.p = 1;
    }
    ListecategoriesComponent.prototype.ngOnInit = function () {
        this.loadCategories();
    };
    ListecategoriesComponent.prototype.openAjoutercategoryModal = function () {
        var _this = this;
        var dialogRef = this.dialog.open(ajoutercategories_component_1.AjoutercategoriesComponent, {
            width: '500px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            _this.loadCategories();
            // Vous pouvez ajouter un traitement supplémentaire après la fermeture de la modal ici
        });
    };
    ListecategoriesComponent.prototype.openUpdateModal = function (categoryId, categoryDetails) {
        var _this = this;
        var dialogRef = this.dialog.open(modifiecategorie_component_1.ModifiecategorieComponent, {
            width: '500px',
            data: { categoryId: categoryId, categoryDetails: categoryDetails } // Passer les données de la catégorie
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            // Mettre à jour la liste des catégories si nécessaire
            if (result) {
                _this.loadCategories();
            }
        });
    };
    ListecategoriesComponent.prototype.deleteCategory = function (categoryId) {
        var _this = this;
        sweetalert2_1["default"].fire({
            title: 'Êtes-vous sûr?',
            text: 'Cette action est irréversible!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer!',
            cancelButtonText: 'Annuler'
        }).then(function (result) {
            if (result.isConfirmed) {
                _this.categoryService.deleteCategory(categoryId).subscribe(function () {
                    sweetalert2_1["default"].fire('Supprimé!', 'La catégorie a été supprimée avec succès.', 'success');
                    // Mettre à jour la liste des catégories après la suppression
                    _this.loadCategories();
                }, function (error) {
                    console.error('Erreur lors de la suppression de la catégorie : ', error);
                    sweetalert2_1["default"].fire('Erreur!', 'Une erreur est survenue lors de la suppression de la catégorie.', 'error');
                });
            }
        });
    };
    ListecategoriesComponent.prototype.loadCategories = function () {
        var _this = this;
        this.categoryService.getCategoryList().subscribe(function (categories) {
            _this.categories = categories;
        }, function (error) {
            console.error('Erreur lors de la récupération de la liste des catégories :', error);
            // Gérez les erreurs comme nécessaire
        });
    };
    ListecategoriesComponent = __decorate([
        core_1.Component({
            selector: 'app-listecategories',
            templateUrl: './listecategories.component.html',
            styleUrls: ['./listecategories.component.css']
        })
    ], ListecategoriesComponent);
    return ListecategoriesComponent;
}());
exports.ListecategoriesComponent = ListecategoriesComponent;
