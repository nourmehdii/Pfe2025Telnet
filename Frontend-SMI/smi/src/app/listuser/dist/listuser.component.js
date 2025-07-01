"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListuserComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var updateuser_component_1 = require("../updateuser/updateuser.component");
var ajouteruser_component_1 = require("../ajouteruser/ajouteruser.component");
var sweetalert2_1 = require("sweetalert2");
var ListuserComponent = /** @class */ (function () {
    function ListuserComponent(service, router, fb, dialog) {
        this.service = service;
        this.router = router;
        this.fb = fb;
        this.dialog = dialog;
        this.p = 1;
        this.searchName = '';
        this.roles = ['Admin', 'Responsable Qualité', 'Directeur', 'Chef de Projet'];
        this.user = {
            activities: []
        };
        this.activities = [];
        this.selectedRole = '';
        this.selectedActivities = [];
    }
    Object.defineProperty(ListuserComponent.prototype, "filteredUsers", {
        get: function () {
            var _this = this;
            return this.listuser ? this.listuser.filter(function (user) { return user.firstName.toLowerCase().includes(_this.searchName.toLowerCase()); }) : [];
        },
        enumerable: false,
        configurable: true
    });
    ListuserComponent.prototype.loadActivities = function () {
        var _this = this;
        this.service.getActivities().subscribe(function (data) {
            _this.activities = data;
        });
    };
    ListuserComponent.prototype.onActivityChange = function (event, activity) {
        if (event.target.checked) {
            this.selectedActivities.push(activity);
        }
        else {
            var index = this.selectedActivities.findIndex(function (a) { return a.id === activity.id; });
            if (index !== -1) {
                this.selectedActivities.splice(index, 1);
            }
        }
    };
    ListuserComponent.prototype.register = function () {
        if (!this.selectedRole || this.selectedActivities.length === 0) {
            console.error('Veuillez sélectionner un rôle et au moins une activité.');
            return;
        }
        this.user.role = this.selectedRole;
        this.user.activities = this.selectedActivities;
        this.service.register(this.user).subscribe(function (response) {
            console.log(response);
        }, function (error) {
            console.error(error);
        });
    };
    ListuserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadActivities();
        console.log('Fetching user list...');
        this.service.getUserList().subscribe(function (users) {
            console.log('Users:', users);
            _this.listuser = users;
            _this.loadRoles();
        }, function (error) {
            console.log('Error fetching user list:', error);
        });
        this.updateUserForm = this.fb.group({
            firstName: ['', forms_1.Validators.required],
            lastName: ['', forms_1.Validators.required],
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            username: ['', forms_1.Validators.required],
            password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(6)]],
            role: ['', forms_1.Validators.required]
        });
    };
    ListuserComponent.prototype.loadRoles = function () {
        var _this = this;
        this.listuser.forEach(function (user) {
            _this.service.getRoleByUserId(user.id).subscribe(function (role) {
                user.role = role; // Assigner directement l'objet Role récupéré
            });
        });
    };
    ListuserComponent.prototype.loadUserActivities = function () {
        var _this = this;
        this.listuser.forEach(function (user) {
            _this.service.getUserActivities(user.id).subscribe(function (activities) {
                user.activities = activities;
            });
        });
    };
    ListuserComponent.prototype.openUpdateuserModal = function (userId) {
        var _this = this;
        var dialogRef = this.dialog.open(updateuser_component_1.UpdateuserComponent, {
            width: '500px',
            data: { userId: userId } // Correction: Assurez-vous que userId est correctement passé ici
        });
        dialogRef.componentInstance.userUpdated.subscribe(function () {
            _this.refreshUserList(); // Rafraîchir la liste des utilisateurs après la mise à jour
            window.location.reload();
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            window.location.reload();
            // Vous pouvez ajouter un traitement supplémentaire après la fermeture de la modal ici
        });
    };
    ListuserComponent.prototype.refreshUserList = function () {
        var _this = this;
        this.service.getUserList().subscribe(function (users) {
            _this.listuser = users;
        }, function (error) {
            console.error('Error refreshing user list:', error);
        });
    };
    ListuserComponent.prototype.updateUser = function (user) {
        if (this.updateUserForm.invalid) {
            return;
        }
        var updatedUser = {
            id: user.id,
            firstName: this.updateUserForm.value.firstName,
            lastName: this.updateUserForm.value.lastName,
            email: this.updateUserForm.value.email,
            username: this.updateUserForm.value.username,
            password: this.updateUserForm.value.password,
            role: this.updateUserForm.value.role,
            activities: user.activities // Assuming you have activities in the user object
        };
        this.service.updateUser(updatedUser.id, updatedUser).subscribe(function () {
            console.log('User updated successfully');
            // You can add further actions here after successful update
        }, function (error) {
            console.error('Error updating user:', error);
        });
    };
    ListuserComponent.prototype.openAjouteruserModal = function () {
        var dialogRef = this.dialog.open(ajouteruser_component_1.AjouteruserComponent, {
            width: '500px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            //    this.loadCategories();
            window.location.reload();
            // Vous pouvez ajouter un traitement supplémentaire après la fermeture de la modal ici
        });
    };
    ListuserComponent.prototype.DeleteAdmin = function (user) {
        var _this = this;
        sweetalert2_1["default"].fire({
            title: 'Êtes-vous sûr?',
            text: "Voulez-vous supprimer cet étudiant avec l'ID " + user.id + ' ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer!',
            cancelButtonText: 'Annuler'
        }).then(function (result) {
            if (result.isConfirmed) {
                _this.service.deleteUser(user.id).subscribe(function () {
                    sweetalert2_1["default"].fire('Supprimé!', 'L\'utilisateur a été supprimé avec succès.', 'success').then(function () {
                        _this.router.navigate(['/listuser']).then(function () {
                            window.location.reload();
                        });
                    });
                }, function (error) {
                    sweetalert2_1["default"].fire('Erreur!', 'Une erreur s\'est produite lors de la suppression de l\'utilisateur.', 'error');
                    console.error('Erreur lors de la suppression de l\'utilisateur:', error);
                });
            }
        });
    };
    ListuserComponent = __decorate([
        core_1.Component({
            selector: 'app-listuser',
            templateUrl: './listuser.component.html',
            styleUrls: ['./listuser.component.css']
        })
    ], ListuserComponent);
    return ListuserComponent;
}());
exports.ListuserComponent = ListuserComponent;
