"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListclientComponent = void 0;
var core_1 = require("@angular/core");
var ajouterclient_component_1 = require("../ajouterclient/ajouterclient.component");
var sweetalert2_1 = require("sweetalert2");
var modifierclient_component_1 = require("../modifierclient/modifierclient.component");
var client_details_component_1 = require("../client-details/client-details.component");
var ListclientComponent = /** @class */ (function () {
    function ListclientComponent(userService, dialog, snackBar) {
        this.userService = userService;
        this.dialog = dialog;
        this.snackBar = snackBar;
        this.clients = [];
        this.searchTerm = '';
        this.filteredClients = [];
        this.p = 1;
    }
    ListclientComponent.prototype.ngOnInit = function () {
        this.loadClients();
    };
    ListclientComponent.prototype.openAjoutercategoryModal = function () {
        var _this = this;
        var dialogRef = this.dialog.open(ajouterclient_component_1.AjouterclientComponent, {
            width: '500px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            _this.loadClients();
        });
    };
    ListclientComponent.prototype.toggleActive = function (client) {
        client.active = !client.active;
        sweetalert2_1["default"].fire({
            icon: 'success',
            title: 'Succès',
            text: 'Le statut a été changé avec succès',
            width: '20rem',
            timer: 2000,
            timerProgressBar: true,
            toast: true,
            position: 'top-end',
            showConfirmButton: false
        });
    };
    ListclientComponent.prototype.openDetailsModal = function (client) {
        this.dialog.open(client_details_component_1.ClientDetailsComponent, {
            width: '400px',
            data: { clientDetails: client }
        });
    };
    ListclientComponent.prototype.openUpdateModal = function (clientId, updatedClient) {
        var _this = this;
        var dialogRef = this.dialog.open(modifierclient_component_1.ModifierclientComponent, {
            width: '500px',
            data: { clientId: clientId, clientDetails: updatedClient }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            if (result) {
                _this.loadClients();
            }
        });
    };
    ListclientComponent.prototype.loadClients = function () {
        var _this = this;
        this.userService.getAllClients().subscribe(function (clients) {
            _this.clients = clients;
            _this.filterClients();
        }, function (error) {
            console.error('Erreur lors de la récupération de la liste des clients :', error);
        });
    };
    ListclientComponent.prototype.filterClients = function () {
        var _this = this;
        if (!this.searchTerm) {
            this.filteredClients = this.clients;
        }
        else {
            this.filteredClients = this.clients.filter(function (client) {
                return client.name.toLowerCase().includes(_this.searchTerm.toLowerCase());
            });
        }
    };
    ListclientComponent.prototype.deleteClient = function (id) {
        var _this = this;
        sweetalert2_1["default"].fire({
            icon: 'question',
            title: 'Êtes-vous sûr ?',
            text: 'Voulez-vous vraiment supprimer ce client ?',
            showCancelButton: true,
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non'
        }).then(function (result) {
            if (result.isConfirmed) {
                _this.userService.deleteClient(id).subscribe(function () {
                    _this.snackBar.open('Client supprimé avec succès', 'Fermer', { duration: 3000 });
                    _this.loadClients();
                }, function (error) {
                    console.error('Erreur lors de la suppression du client :', error);
                    _this.snackBar.open('Une erreur est survenue lors de la suppression du client', 'Fermer', { duration: 3000 });
                });
            }
        });
    };
    ListclientComponent = __decorate([
        core_1.Component({
            selector: 'app-listclient',
            templateUrl: './listclient.component.html',
            styleUrls: ['./listclient.component.css']
        })
    ], ListclientComponent);
    return ListclientComponent;
}());
exports.ListclientComponent = ListclientComponent;
