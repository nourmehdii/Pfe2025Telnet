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
exports.ModifierpipComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var sweetalert2_1 = require("sweetalert2");
var ModifierpipComponent = /** @class */ (function () {
    function ModifierpipComponent(data, pipService) {
        this.data = data;
        this.pipService = pipService;
        this.pipUpdated = new core_1.EventEmitter();
    }
    ModifierpipComponent.prototype.ngOnInit = function () {
        this.pipId = this.data.pipId;
        this.loadPipDetails();
        this.loadCategories();
    };
    ModifierpipComponent.prototype.loadCategories = function () {
        var _this = this;
        console.log('Chargement des catégories...');
        this.pipService.getCategoryList()
            .subscribe(function (categories) {
            _this.categories = categories;
            console.log('Catégories chargées avec succès:', categories);
        }, function (error) {
            console.error('Erreur lors du chargement des catégories :', error);
        });
    };
    ModifierpipComponent.prototype.loadCategoryById = function (categoryId) {
        var _this = this;
        this.pipService.getCategoryById(categoryId)
            .subscribe(function (category) {
            _this.category = category;
        }, function (error) {
            console.error('Erreur lors du chargement de la catégorie :', error);
        });
    };
    ModifierpipComponent.prototype.loadPipDetails = function () {
        var _this = this;
        console.log('Chargement des détails du PIP...');
        this.pipService.getPipById(this.pipId)
            .subscribe(function (pip) {
            _this.pipDetails = pip;
            _this.selectedCategoryId = pip.category.id;
            _this.loadCategoryById(pip.category.id);
            console.log('Détails du PIP chargés avec succès:', pip);
        }, function (error) {
            console.error('Erreur lors du chargement des détails du PIP :', error);
        });
    };
    ModifierpipComponent.prototype.updatePip = function () {
        var _this = this;
        if (!this.pipId || !this.pipDetails) {
            console.error('Données PIP invalides');
            return;
        }
        if (!this.category) {
            this.loadCategoryById(this.selectedCategoryId);
            return;
        }
        var categoryId = this.category.id;
        this.pipService.updatePip(this.pipId, categoryId, this.pipDetails)
            .subscribe(function (updatedPip) {
            console.log('Mise à jour du PIP effectuée avec succès :', updatedPip);
            sweetalert2_1["default"].fire('Succès', 'Le PIP a été mis à jour avec succès', 'success');
            _this.pipUpdated.emit(); // Émettre l'événement pipUpdated après la mise à jour
        }, function (error) {
            console.error('Erreur lors de la mise à jour du PIP :', error);
            sweetalert2_1["default"].fire('Erreur', 'Une erreur est survenue lors de la mise à jour du PIP', 'error');
        });
    };
    ModifierpipComponent.prototype.categorySelectionChanged = function () {
        this.loadCategoryById(this.selectedCategoryId);
    };
    ModifierpipComponent.prototype.closeModal = function () {
        console.log('Fermeture de la modal');
        this.pipUpdated.emit(); // Émettre l'événement pipUpdated lors de la fermeture de la modal
    };
    __decorate([
        core_1.Output()
    ], ModifierpipComponent.prototype, "pipUpdated");
    ModifierpipComponent = __decorate([
        core_1.Component({
            selector: 'app-modifierpip',
            templateUrl: './modifierpip.component.html',
            styleUrls: ['./modifierpip.component.css']
        }),
        __param(0, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], ModifierpipComponent);
    return ModifierpipComponent;
}());
exports.ModifierpipComponent = ModifierpipComponent;
