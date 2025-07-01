"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AjouterpipComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var AjouterpipComponent = /** @class */ (function () {
    function AjouterpipComponent(apiService) {
        this.apiService = apiService;
        this.newPip = {
            name: '',
            category: null,
            type: '',
            interaction: ''
        };
        this.categories = [];
    }
    AjouterpipComponent.prototype.ngOnInit = function () {
        this.loadCategories();
    };
    AjouterpipComponent.prototype.loadCategories = function () {
        var _this = this;
        this.apiService.getCategoryList().subscribe(function (categories) {
            _this.categories = categories;
        }, function (error) {
            console.error('Erreur lors du chargement des catégories:', error);
        });
    };
    AjouterpipComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.validateForm()) {
            var categoryId = this.newPip.category.id;
            this.apiService.createPip(categoryId, this.newPip).subscribe(function (response) {
                console.log('PIP créé avec succès:', response);
                sweetalert2_1["default"].fire('Succès!', 'PIP ajouté avec succès!', 'success');
                _this.resetForm();
            }, function (error) {
                console.error('Erreur lors de la création du PIP:', error);
                sweetalert2_1["default"].fire('Erreur!', 'Une erreur est survenue lors de l\'ajout du PIP.', 'error');
            });
        }
        else {
            console.error("La catégorie n'a pas été sélectionnée ou les champs sont vides.");
            sweetalert2_1["default"].fire('Erreur!', 'Veuillez remplir tous les champs et sélectionner une catégorie.', 'error');
        }
    };
    AjouterpipComponent.prototype.validateForm = function () {
        return this.newPip.category && this.newPip.name.trim() !== '' && this.newPip.type !== '' && this.newPip.interaction !== '';
    };
    AjouterpipComponent.prototype.resetForm = function () {
        this.newPip = {
            name: '',
            category: null,
            type: '',
            interaction: ''
        };
    };
    AjouterpipComponent = __decorate([
        core_1.Component({
            selector: 'app-ajouterpip',
            templateUrl: './ajouterpip.component.html',
            styleUrls: ['./ajouterpip.component.css']
        })
    ], AjouterpipComponent);
    return AjouterpipComponent;
}());
exports.AjouterpipComponent = AjouterpipComponent;
