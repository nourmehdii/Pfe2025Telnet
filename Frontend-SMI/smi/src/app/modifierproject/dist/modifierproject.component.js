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
exports.ModifierprojectComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var forms_1 = require("@angular/forms");
var sweetalert2_1 = require("sweetalert2");
var ModifierprojectComponent = /** @class */ (function () {
    function ModifierprojectComponent(projectService, fb, dialogRef, data) {
        this.projectService = projectService;
        this.fb = fb;
        this.dialogRef = dialogRef;
        this.data = data;
        this.projectUpdated = new core_1.EventEmitter();
        this.processusList = [];
        this.clientList = [];
    }
    ModifierprojectComponent.prototype.ngOnInit = function () {
        this.initProjectForm();
        this.loadClientList();
        this.loadProcessusList();
        this.loadProjectDetails();
    };
    ModifierprojectComponent.prototype.initProjectForm = function () {
        this.projectForm = this.fb.group({
            name: ['', forms_1.Validators.required],
            type: ['', forms_1.Validators.required],
            startDate: [null, forms_1.Validators.required],
            endDate: [null, forms_1.Validators.required],
            processus: [[], forms_1.Validators.required],
            cli: [null, forms_1.Validators.required]
        });
    };
    ModifierprojectComponent.prototype.loadProjectDetails = function () {
        var _this = this;
        var projectId = this.data.projectId;
        this.projectService.getProjectById(projectId).subscribe(function (project) {
            var startDate = project.projectDate.startDate ? new Date(project.projectDate.startDate) : null;
            var endDate = project.projectDate.endDate ? new Date(project.projectDate.endDate) : null;
            _this.projectForm.patchValue({
                name: project.name,
                type: project.type,
                startDate: startDate ? startDate.toISOString().substring(0, 10) : null,
                endDate: endDate ? endDate.toISOString().substring(0, 10) : null,
                processus: project.processus ? project.processus.map(function (p) { return p.id; }) : [],
                cli: project.cli ? project.cli.id : null
            });
        }, function (error) {
            console.error('Error fetching project details:', error);
        });
    };
    ModifierprojectComponent.prototype.loadProcessusList = function () {
        var _this = this;
        this.projectService.getProcessusList().subscribe(function (processus) {
            _this.processusList = processus;
        }, function (error) {
            console.error('Error fetching processus list:', error);
        });
    };
    ModifierprojectComponent.prototype.loadClientList = function () {
        var _this = this;
        this.projectService.getAllClients().subscribe(function (clients) {
            _this.clientList = clients;
        }, function (error) {
            console.error('Error fetching client list:', error);
        });
    };
    ModifierprojectComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.projectForm.valid) {
            var formData = this.projectForm.value;
            var projectId = this.data.projectId;
            var startDate = formData.startDate ? new Date(formData.startDate) : null;
            var endDate = formData.endDate ? new Date(formData.endDate) : null;
            var updatedProjectData = {
                id: projectId,
                name: formData.name,
                type: formData.type,
                startDate: startDate,
                endDate: endDate,
                processus: formData.processus.map(function (id) { return ({ id: id }); }),
                cli: {
                    id: formData.cli,
                    name: '',
                    phone: '',
                    active: false
                },
                projectDate: { startDate: startDate, endDate: endDate }
            };
            this.projectService.updateProject(projectId, updatedProjectData).subscribe(function () {
                sweetalert2_1["default"].fire({
                    icon: 'success',
                    title: 'Projet mis à jour',
                    text: 'Le projet a été mis à jour avec succès.'
                });
                _this.projectUpdated.emit();
                _this.dialogRef.close();
            }, function (error) {
                console.error('Error updating project:', error);
                var errorMessage = 'Échec de la mise à jour du projet. Veuillez réessayer ultérieurement.';
                if (error.error && error.error.message) {
                    errorMessage = error.error.message;
                }
                sweetalert2_1["default"].fire({
                    icon: 'error',
                    title: 'Erreur de mise à jour',
                    text: errorMessage
                });
            });
        }
        else {
            sweetalert2_1["default"].fire({
                icon: 'error',
                title: 'Formulaire invalide',
                text: 'Le formulaire est invalide. Veuillez remplir tous les champs correctement.'
            });
        }
    };
    __decorate([
        core_1.Output()
    ], ModifierprojectComponent.prototype, "projectUpdated");
    ModifierprojectComponent = __decorate([
        core_1.Component({
            selector: 'app-modifierproject',
            templateUrl: './modifierproject.component.html',
            styleUrls: ['./modifierproject.component.css']
        }),
        __param(3, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], ModifierprojectComponent);
    return ModifierprojectComponent;
}());
exports.ModifierprojectComponent = ModifierprojectComponent;
