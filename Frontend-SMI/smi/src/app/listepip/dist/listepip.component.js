"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListepipComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var pips_modal_component_component_1 = require("../pips-modal-component/pips-modal-component.component");
var ajouterpip_component_1 = require("../ajouterpip/ajouterpip.component");
var ListepipComponent = /** @class */ (function () {
    function ListepipComponent(userService, dialog) {
        this.userService = userService;
        this.dialog = dialog;
        this.categories = [];
    }
    ListepipComponent.prototype.ngOnInit = function () {
        this.loadCategories();
    };
    ListepipComponent.prototype.loadCategories = function () {
        var _this = this;
        this.userService.getCategoryList().subscribe(function (categories) {
            _this.categories = categories;
        }, function (error) {
            console.error('Error loading categories:', error);
        });
    };
    ListepipComponent.prototype.getPipsByCategoryId = function (categoryId) {
        var _this = this;
        if (categoryId) {
            this.userService.getPipsByCategory(categoryId).subscribe(function (pips) {
                console.log("Received PIPs for category with ID " + categoryId + ":", pips);
                if (pips.length > 0) {
                    _this.selectedCategoryId = categoryId; // Set the selected category ID
                    _this.openPipsModal(pips, categoryId); // Pass categoryId to openPipsModal
                }
                else {
                    sweetalert2_1["default"].fire('No PIPs found for this category');
                }
            }, function (error) {
                if (error.status === 401) {
                    sweetalert2_1["default"].fire('Unauthorized', 'You are not authorized to fetch PIPs for this category', 'error');
                }
                else {
                    console.error("Error fetching PIPs for category with ID " + categoryId + ":", error);
                    sweetalert2_1["default"].fire('Error fetching PIPs', 'An error occurred while fetching PIPs', 'error');
                }
            });
        }
        else {
            console.error('categoryId is not defined.');
            sweetalert2_1["default"].fire('Error', 'Category ID is missing or undefined', 'error');
        }
    };
    ListepipComponent.prototype.openPipsModal = function (pips, categoryId) {
        var dialogRef = this.dialog.open(pips_modal_component_component_1.PipsModalComponentComponent, {
            data: { pips: pips, categoryId: categoryId },
            minWidth: '400px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            // Ajoutez toute logique nécessaire après la fermeture du modal si nécessaire
        });
    };
    ListepipComponent.prototype.getBoxId = function (categoryName) {
        // Logique pour générer l'ID de boîte basé sur le nom de catégorie
        return categoryName.replace(/\s+/g, '-').toLowerCase();
    };
    ListepipComponent.prototype.openAjouterpipModal = function () {
        var dialogRef = this.dialog.open(ajouterpip_component_1.AjouterpipComponent, {
            width: '500px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            // Vous pouvez ajouter un traitement supplémentaire après la fermeture de la modal ici
        });
    };
    ListepipComponent = __decorate([
        core_1.Component({
            selector: 'app-listepip',
            templateUrl: './listepip.component.html',
            styleUrls: ['./listepip.component.css']
        })
    ], ListepipComponent);
    return ListepipComponent;
}());
exports.ListepipComponent = ListepipComponent;
