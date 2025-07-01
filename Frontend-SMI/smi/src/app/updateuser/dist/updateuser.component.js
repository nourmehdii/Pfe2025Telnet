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
exports.UpdateuserComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var sweetalert2_1 = require("sweetalert2");
var dialog_1 = require("@angular/material/dialog");
var UpdateuserComponent = /** @class */ (function () {
    function UpdateuserComponent(fb, service, route, router, dialogRef, data) {
        this.fb = fb;
        this.service = service;
        this.route = route;
        this.router = router;
        this.dialogRef = dialogRef;
        this.data = data;
        this.currentUser = {};
        this.selectedRole = {};
        this.roles = [];
        this.activities = [];
        this.selectedActivities = [];
        this.listuser = [];
        this.userUpdated = new core_1.EventEmitter();
        this.updateUserForm = this.fb.group({
            firstName: ['', forms_1.Validators.required],
            lastName: ['', forms_1.Validators.required],
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(6)]],
            role: ['', forms_1.Validators.required],
            activities: [[]]
        });
    }
    UpdateuserComponent.prototype.ngOnInit = function () {
        this.id = this.data.userId;
        this.loadUser();
    };
    UpdateuserComponent.prototype.loadUser = function () {
        var _this = this;
        this.service.getUserById(this.id).subscribe(function (result) {
            _this.currentUser = result;
            _this.updateUserForm.patchValue({
                firstName: _this.currentUser.firstName,
                lastName: _this.currentUser.lastName,
                email: _this.currentUser.email,
                password: _this.currentUser.password
            });
            // Récupérer le rôle de l'utilisateur
            var userId = _this.currentUser.id;
            _this.service.getRoleByUserId(userId).subscribe(function (userRole) {
                // Sélectionner le rôle de l'utilisateur dans le formulaire
                _this.updateUserForm.get('role').setValue(userRole.name);
            });
            _this.loadActivities();
        });
    };
    UpdateuserComponent.prototype.loadRoles = function () {
        var _this = this;
        this.service.getRoles().subscribe(function (roles) {
            _this.roles = roles;
            _this.selectedRole = _this.roles.find(function (role) { return role.id === _this.currentUser.role.id; });
            _this.updateUserForm.patchValue({
                role: _this.selectedRole
            });
        });
    };
    UpdateuserComponent.prototype.loadActivities = function () {
        var _this = this;
        this.service.getActivities().subscribe(function (activities) {
            _this.activities = activities;
            _this.selectedActivities = _this.currentUser.activities;
            _this.updateUserForm.patchValue({
                activities: _this.selectedActivities
            });
        });
    };
    UpdateuserComponent.prototype.getUnselectedActivities = function () {
        var _this = this;
        return this.activities.filter(function (activity) { return !_this.selectedActivities.some(function (selected) { return selected.id === activity.id; }); });
    };
    UpdateuserComponent.prototype.updateUser = function () {
        var _this = this;
        if (this.updateUserForm.invalid) {
            return;
        }
        var updatedUser = {
            id: this.id,
            firstName: this.updateUserForm.value.firstName,
            lastName: this.updateUserForm.value.lastName,
            email: this.updateUserForm.value.email,
            password: this.updateUserForm.value.password,
            role: this.updateUserForm.value.role,
            activities: this.updateUserForm.value.activities
        };
        this.service.updateUser(updatedUser.id, updatedUser).subscribe(function () {
            console.log('User updated successfully');
            _this.updateUserForm.reset();
            sweetalert2_1["default"].fire({
                icon: 'success',
                title: 'Success',
                text: 'User updated successfully'
            });
        }, function (error) {
            console.error('Error updating user:', error);
            sweetalert2_1["default"].fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update user. Please try again later.'
            });
        });
    };
    UpdateuserComponent.prototype.refreshUserList = function () {
        var _this = this;
        this.service.getUserList().subscribe(function (users) {
            _this.listuser = users;
        }, function (error) {
            console.error('Error refreshing user list:', error);
        });
    };
    UpdateuserComponent = __decorate([
        core_1.Component({
            selector: 'app-updateuser',
            templateUrl: './updateuser.component.html',
            styleUrls: ['./updateuser.component.css']
        }),
        __param(5, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], UpdateuserComponent);
    return UpdateuserComponent;
}());
exports.UpdateuserComponent = UpdateuserComponent;
