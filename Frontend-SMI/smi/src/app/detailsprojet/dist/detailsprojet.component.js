"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DetailsprojetComponent = void 0;
var core_1 = require("@angular/core");
var ajouterkpihistory_component_1 = require("../ajouterkpihistory/ajouterkpihistory.component");
var modifierkpihistory_component_1 = require("../modifierkpihistory/modifierkpihistory.component");
var DetailsprojetComponent = /** @class */ (function () {
    function DetailsprojetComponent(route, projetService, dialog, snackBar) {
        this.route = route;
        this.projetService = projetService;
        this.dialog = dialog;
        this.snackBar = snackBar;
        this.projectId = 0;
        this.kpiHistories = [];
        this.previousKpiValue = 0; // Initialisation de previousKpiValue
    }
    DetailsprojetComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.projectId = +params['id'];
            _this.loadProjectDetails();
        });
    };
    DetailsprojetComponent.prototype.loadProjectDetails = function () {
        var _this = this;
        this.projetService.getProjectDetails(this.projectId).subscribe(function (project) {
            _this.projectDetails = project;
            _this.fetchKpiHistories();
        }, function (error) {
            console.error('Erreur lors de la récupération des détails du projet :', error);
        });
    };
    DetailsprojetComponent.prototype.openModal = function (kpiName) {
        var _this = this;
        var kpiId = this.getKpiIdByName(kpiName);
        if (kpiId !== null) {
            var dialogRef = this.dialog.open(ajouterkpihistory_component_1.AjouterkpihistoryComponent, {
                width: '400px',
                data: {
                    projectId: this.projectId,
                    kpiId: kpiId,
                    objectif: null,
                    valeur: null // Envoyer la valeur null pour la valeur
                }
            });
            dialogRef.afterClosed().subscribe(function (result) {
                _this.fetchKpiHistories();
            });
        }
        else {
            console.error('KPI not found with name:', kpiName);
        }
    };
    DetailsprojetComponent.prototype.fetchKpiHistories = function () {
        var _this = this;
        this.projetService.getKpiHistoryByProjectId(this.projectId).subscribe(function (history) {
            _this.kpiHistories = history;
        }, function (error) {
            console.error('Error fetching KPI history:', error);
        });
    };
    DetailsprojetComponent.prototype.getKpiValue = function (i, kpi) {
        if (!this.kpiHistories) {
            return null;
        }
        var kpiHistory = this.kpiHistories.find(function (history) { return history.kpi.id === kpi.id; });
        return kpiHistory ? kpiHistory.value : '';
    };
    DetailsprojetComponent.prototype.getKpiObjectif = function (i, kpi) {
        var kpiHistory = this.kpiHistories.find(function (history) { return history.kpi.id === kpi.id; });
        return kpiHistory ? kpiHistory.kpi_objectif : '';
    };
    DetailsprojetComponent.prototype.getKpiDate = function (i, kpi) {
        if (this.kpiHistories === null) {
            return null;
        }
        var kpiHistory = this.kpiHistories.find(function (history) { return history.kpi.id === kpi.id; });
        return kpiHistory ? { startDate: kpiHistory.startDateP, endDateP: kpiHistory.endDateP } : null;
    };
    DetailsprojetComponent.prototype.getKpiId = function (index, kpi) {
        return kpi.id;
    };
    DetailsprojetComponent.prototype.openModifierKpiHistoryModal = function (kpiId) {
        var _this = this;
        var historyId = this.getHistoryIdByKpiId(kpiId);
        if (historyId !== null) {
            var kpiHistory = this.kpiHistories.find(function (history) { return history.kpi.id === kpiId; });
            if (kpiHistory) {
                var dialogRef = this.dialog.open(modifierkpihistory_component_1.ModifierkpihistoryComponent, {
                    width: '400px',
                    data: { historyId: historyId }
                });
                if (kpiHistory.value < kpiHistory.kpi_objectif) {
                    this.snackBar.open('La valeur est inférieure à l\'objectif ! Complétez l\'analyse causale', 'Analyse causale', {
                        duration: 5000,
                        panelClass: ['error-snackbar']
                    }).onAction().subscribe(function () {
                        // Ajoutez le code pour ouvrir une fenêtre modale ou effectuer une autre action si nécessaire
                    });
                }
                dialogRef.afterClosed().subscribe(function (result) {
                    _this.fetchKpiHistories();
                });
            }
            else {
                console.error('KPI history not found for KPI Id:', kpiId);
            }
        }
        else {
            console.error('History Id not found for KPI Id:', kpiId);
        }
    };
    DetailsprojetComponent.prototype.showNotification = function (index, kpi) {
        console.log('KPI Histories:', this.kpiHistories);
        var currentKpiValue = this.getKpiValue(index, kpi);
        console.log('Current KPI Value:', currentKpiValue);
        console.log('Previous KPI Value:', this.previousKpiValue);
        if (currentKpiValue <= kpi.objectif) {
            if (this.previousKpiValue > kpi.objectif) {
                console.log('Notification should be shown.');
                return true;
            }
        }
        this.previousKpiValue = currentKpiValue;
        return false;
    };
    DetailsprojetComponent.prototype.getHistoryIdByKpiId = function (kpiId) {
        var kpiHistory = this.kpiHistories.find(function (history) { return history.kpi.id === kpiId; });
        return kpiHistory ? kpiHistory.id : null;
    };
    DetailsprojetComponent.prototype.getKpiIdByName = function (kpiName) {
        if (!this.projectDetails || !this.projectDetails.processus) {
            return null;
        }
        for (var _i = 0, _a = this.projectDetails.processus; _i < _a.length; _i++) {
            var processus = _a[_i];
            if (!processus.kpis) {
                continue;
            }
            for (var _b = 0, _c = processus.kpis; _b < _c.length; _b++) {
                var kpi = _c[_b];
                if (kpi.name === kpiName) {
                    return kpi.id;
                }
            }
        }
        return null;
    };
    DetailsprojetComponent = __decorate([
        core_1.Component({
            selector: 'app-detailsprojet',
            templateUrl: './detailsprojet.component.html',
            styleUrls: ['./detailsprojet.component.css']
        })
    ], DetailsprojetComponent);
    return DetailsprojetComponent;
}());
exports.DetailsprojetComponent = DetailsprojetComponent;
