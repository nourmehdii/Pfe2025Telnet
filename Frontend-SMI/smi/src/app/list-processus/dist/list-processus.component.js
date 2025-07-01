"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListProcessusComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var update_processus_component_1 = require("../update-processus/update-processus.component");
var ajouterkpi_component_1 = require("../ajouterkpi/ajouterkpi.component");
var detailskpi_component_1 = require("../Detailskpi/detailskpi.component");
var add_process_dialog_component_component_1 = require("../add-process-dialog-component/add-process-dialog-component.component");
var ListProcessusComponent = /** @class */ (function () {
    function ListProcessusComponent(userService, dialog) {
        this.userService = userService;
        this.dialog = dialog;
        this.processusList = [];
        this.p = 1;
    }
    ListProcessusComponent.prototype.ngOnInit = function () {
        this.loadProcessus();
    };
    ListProcessusComponent.prototype.loadProcessus = function () {
        var _this = this;
        this.userService.getProcessusList().subscribe(function (processus) {
            _this.processusList = processus;
        }, function (error) {
            console.error('Une erreur est survenue lors du chargement des processus :', error);
        });
    };
    ListProcessusComponent.prototype.openAddProcessModal = function () {
        var _this = this;
        var dialogRef = this.dialog.open(add_process_dialog_component_component_1.AddProcessDialogComponentComponent, {
            width: '600px'
        });
        dialogRef.afterClosed().subscribe(function () {
            _this.loadProcessus();
        });
    };
    ListProcessusComponent.prototype.openUpdateProcessModal = function (processusId) {
        var _this = this;
        var dialogRef = this.dialog.open(update_processus_component_1.UpdateProcessusComponent, {
            width: '600px',
            data: { processusId: processusId }
        });
        dialogRef.afterClosed().subscribe(function () {
            _this.loadProcessus();
        });
    };
    ListProcessusComponent.prototype.openAjouterKpiDialog = function (processusId) {
        console.log('Opening dialog with processusId:', processusId); // Debug log
        var dialogRef = this.dialog.open(ajouterkpi_component_1.AjouterkpiComponent, {
            data: { processusId: processusId } // Ensure processusId is passed here
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('Dialog was closed');
        });
    };
    ListProcessusComponent.prototype.openkpiModal = function (processusId) {
        var _this = this;
        var dialogRef = this.dialog.open(detailskpi_component_1.DetailskpiComponent, {
            width: '600px',
            data: { processusId: processusId } // Passer l'ID du processus au composant de détails des KPI
        });
        dialogRef.afterClosed().subscribe(function () {
            _this.loadProcessus();
        });
    };
    ListProcessusComponent.prototype.deleteProcessus = function (processusId) {
        var _this = this;
        sweetalert2_1["default"].fire({
            title: 'Êtes-vous sûr?',
            text: "Vous ne pourrez pas revenir en arrière!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer!'
        }).then(function (result) {
            if (result.isConfirmed) {
                _this.userService.deleteProcessus(processusId).subscribe(function () {
                    sweetalert2_1["default"].fire('Supprimé!', 'Le processus a été supprimé avec succès.', 'success');
                    _this.loadProcessus();
                }, function (error) {
                    console.error('Une erreur est survenue lors de la suppression du processus :', error);
                    sweetalert2_1["default"].fire('Erreur!', 'Une erreur est survenue lors de la suppression du processus.', 'error');
                });
            }
        });
    };
    ListProcessusComponent = __decorate([
        core_1.Component({
            selector: 'app-list-processus',
            templateUrl: './list-processus.component.html',
            styleUrls: ['./list-processus.component.css']
        })
    ], ListProcessusComponent);
    return ListProcessusComponent;
}());
exports.ListProcessusComponent = ListProcessusComponent;
