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
exports.DetailskpiComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var ajouterkpi_component_1 = require("../ajouterkpi/ajouterkpi.component");
var DetailskpiComponent = /** @class */ (function () {
    function DetailskpiComponent(userService, dialog, dialogRef, snackBar, data) {
        this.userService = userService;
        this.dialog = dialog;
        this.dialogRef = dialogRef;
        this.snackBar = snackBar;
        this.data = data;
        this.kpis = [];
        this.p = 1;
        this.editedIndex = null;
    }
    DetailskpiComponent.prototype.ngOnInit = function () {
        this.loadKpis();
    };
    DetailskpiComponent.prototype.loadKpis = function () {
        var _this = this;
        var processusId = this.data.processusId; // Récupérer l'ID du processus
        if (processusId) {
            this.userService.getKpisByP(processusId).subscribe(function (kpis) {
                _this.kpis = kpis;
            }, function (error) {
                console.error('Error fetching KPIs:', error);
                _this.snackBar.open('Erreur lors de la récupération des KPI', 'Fermer', {
                    duration: 3000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right'
                });
            });
        }
        else {
            console.error('Processus ID is not defined.');
            this.snackBar.open('ID du processus non défini', 'Fermer', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
            });
        }
    };
    DetailskpiComponent.prototype.openAddkpisModal = function (processusId) {
        var _this = this;
        var dialogRef = this.dialog.open(ajouterkpi_component_1.AjouterkpiComponent, {
            width: '600px',
            data: { processusId: processusId } // Pass processusId to the modal
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            // Rafraîchit la liste des KPI après la fermeture du modal
            _this.loadKpis();
        });
    };
    DetailskpiComponent.prototype.deleteKpi = function (kpi) {
        var _this = this;
        if (confirm('Êtes-vous sûr de vouloir supprimer ce KPI ?')) {
            this.userService.deleteKpi(kpi.id).subscribe(function () {
                console.log('KPI deleted successfully');
                _this.loadKpis(); // Rafraîchit la liste des KPI après suppression
                _this.snackBar.open('KPI supprimé avec succès!', 'Fermer', {
                    duration: 3000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right'
                });
            }, function (error) {
                console.error('Error deleting KPI:', error);
                _this.snackBar.open('Erreur lors de la suppression du KPI', 'Fermer', {
                    duration: 3000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right'
                });
            });
        }
    };
    DetailskpiComponent.prototype.editCell = function (index) {
        this.editedIndex = index;
    };
    DetailskpiComponent.prototype.saveKpi = function (kpi) {
        var _this = this;
        this.userService.updateKpi(kpi.id, kpi).subscribe(function (updatedKpi) {
            console.log('KPI updated successfully', updatedKpi);
            _this.editedIndex = null;
            _this.loadKpis(); // Rafraîchit la liste des KPI après mise à jour
        }, function (error) {
            console.error('Error updating KPI:', error);
        });
    };
    DetailskpiComponent.prototype.closeModal = function () {
        this.dialogRef.close();
    };
    DetailskpiComponent = __decorate([
        core_1.Component({
            selector: 'app-detailskpi',
            templateUrl: './detailskpi.component.html',
            styleUrls: ['./detailskpi.component.css']
        }),
        __param(4, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DetailskpiComponent);
    return DetailskpiComponent;
}());
exports.DetailskpiComponent = DetailskpiComponent;
