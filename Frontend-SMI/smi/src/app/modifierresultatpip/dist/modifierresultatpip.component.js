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
exports.ModifierresultatpipComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var sweetalert2_1 = require("sweetalert2");
var ModifierresultatpipComponent = /** @class */ (function () {
    function ModifierresultatpipComponent(data, userService) {
        this.data = data;
        this.userService = userService;
        this.pipresultatUpdated = new core_1.EventEmitter();
        this.selectedProcessusIds = [];
        this.pips = [];
    }
    ModifierresultatpipComponent.prototype.ngOnInit = function () {
        this.pipId = this.data.pipresulatId;
        this.initializeResultsPip(this.pipId);
        this.loadPips();
        this.pipLabel = this.data.pipLabel;
    };
    ModifierresultatpipComponent.prototype.initializeResultsPip = function (pipresultatId) {
        var _this = this;
        this.userService.getResultsPipById(pipresultatId).subscribe(function (resultsPip) {
            _this.resultsPip = resultsPip;
            _this.resultsPipId = resultsPip.id;
            // Récupérer le Pip lié au résultat Pip
            _this.userService.getPipById(resultsPip.pip.id).subscribe(function (pip) {
                _this.pip = pip;
                _this.selectedPipId = pip.id; // Définir le Pip sélectionné
            }, function (error) {
                console.error('Une erreur s\'est produite lors de la récupération du Pip :', error);
            });
            _this.userService.getProcessusList().subscribe(function (processus) {
                _this.processus = processus;
                // Récupérer les IDs des Processus liés au résultat Pip
                _this.selectedProcessusIds = resultsPip.processus.map(function (processus) { return processus.id; });
            }, function (error) {
                console.error('Une erreur s\'est produite lors de la récupération des Processus :', error);
            });
        }, function (error) {
            console.error('Une erreur s\'est produite lors de la récupération des détails du résultat PIP :', error);
        });
    };
    ModifierresultatpipComponent.prototype.updateResultsPip = function () {
        var _this = this;
        // Afficher une fenêtre modale de confirmation avant de mettre à jour le résultat PIP
        sweetalert2_1["default"].fire({
            title: 'Êtes-vous sûr de vouloir mettre à jour le résultat ' + this.pipLabel + ' ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, mettre à jour',
            cancelButtonText: 'Annuler'
        }).then(function (result) {
            if (result.isConfirmed) {
                // Récupérer le Pip sélectionné à partir de la liste des Pips disponibles
                var selectedPip = _this.pips.find(function (pip) { return pip.id === _this.selectedPipId; });
                if (!selectedPip) {
                    console.error('Pip sélectionné introuvable');
                    return;
                }
                // Mettre à jour les détails du résultat PIP avec les valeurs sélectionnées
                _this.resultsPip.pip = selectedPip;
                _this.resultsPip.processus = _this.selectedProcessusIds.map(function (id) { return ({ id: id }); });
                // Mettre à jour le résultat PIP
                _this.userService.updateResultsPip(_this.resultsPipId, selectedPip.id, _this.resultsPip).subscribe(function (updatedResultsPip) {
                    console.log('Résultat ' + _this.pipLabel + ' mis à jour avec succès :', updatedResultsPip);
                    _this.pipresultatUpdated.emit();
                    // Fermer automatiquement la fenêtre modale après la mise à jour réussie
                    sweetalert2_1["default"].fire('Succès', 'Le résultat ' + _this.pipLabel + ' a été mis à jour avec succès.', 'success');
                }, function (error) {
                    console.error('Une erreur s\'est produite lors de la mise à jour du résultat ' + _this.pipLabel + ' :', error);
                    sweetalert2_1["default"].fire('Erreur', 'Une erreur s\'est produite lors de la mise à jour du résultat ' + _this.pipLabel + '.', 'error');
                });
            }
        });
    };
    ModifierresultatpipComponent.prototype.loadPips = function () {
        var _this = this;
        this.userService.getPipList().subscribe(function (pips) {
            _this.pips = pips;
        }, function (error) {
            console.error('Une erreur s\'est produite lors de la récupération des PIP :', error);
        });
    };
    ModifierresultatpipComponent.prototype.onPipSelectionChange = function () {
        var _this = this;
        // Récupérer le Pip sélectionné à partir de la liste des Pips disponibles
        var selectedPip = this.pips.find(function (pip) { return pip.id === _this.selectedPipId; });
        if (!selectedPip) {
            console.error('Pip sélectionné introuvable');
            return;
        }
        // Assigner le Pip sélectionné à this.pip
        this.pip = selectedPip;
    };
    __decorate([
        core_1.Output()
    ], ModifierresultatpipComponent.prototype, "pipresultatUpdated");
    ModifierresultatpipComponent = __decorate([
        core_1.Component({
            selector: 'app-modifierresultatpip',
            templateUrl: './modifierresultatpip.component.html',
            styleUrls: ['./modifierresultatpip.component.css']
        }),
        __param(0, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], ModifierresultatpipComponent);
    return ModifierresultatpipComponent;
}());
exports.ModifierresultatpipComponent = ModifierresultatpipComponent;
