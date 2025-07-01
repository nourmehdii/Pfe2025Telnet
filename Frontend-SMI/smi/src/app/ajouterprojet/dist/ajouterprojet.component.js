"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AjouterprojetComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var sweetalert2_1 = require("sweetalert2");
var AjouterprojetComponent = /** @class */ (function () {
    function AjouterprojetComponent(projectService, fb) {
        this.projectService = projectService;
        this.fb = fb;
        this.processusList = [];
        this.kpiList = [];
        this.clientList = [];
        this.activityList = [];
    }
    AjouterprojetComponent.prototype.ngOnInit = function () {
        this.initProjectForm();
        this.loadClientList();
        this.loadActivityList();
    };
    AjouterprojetComponent.prototype.initProjectForm = function () {
        this.projectForm = this.fb.group({
            name: ['', forms_1.Validators.required],
            type: ['', forms_1.Validators.required],
            startDate: [null, forms_1.Validators.required],
            endDate: [null, forms_1.Validators.required],
            processus: [[]],
            kpis: [[]],
            cli: [null, forms_1.Validators.required],
            activityId: [null, forms_1.Validators.required]
        });
    };
    AjouterprojetComponent.prototype.formatDate = function (date) {
        if (!date)
            return ''; // Vérifie si la date est définie
        var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Intl.DateTimeFormat('fr-FR', options).format(date); // Formatage de la date en format 'dd/MM/yyyy'
    };
    AjouterprojetComponent.prototype.loadClientList = function () {
        var _this = this;
        this.projectService.getAllClients().subscribe(function (clients) {
            _this.clientList = clients;
            console.log('Client list loaded:', _this.clientList);
        }, function (error) {
            console.error('Error fetching client list:', error);
        });
    };
    AjouterprojetComponent.prototype.loadActivityList = function () {
        var _this = this;
        this.projectService.getActivities().subscribe(function (activities) {
            _this.activityList = activities;
            console.log('Activity list loaded:', _this.activityList);
        }, function (error) {
            console.error('Error fetching activity list:', error);
        });
    };
    AjouterprojetComponent.prototype.onProcessusChange = function () {
        var _this = this;
        var selectedActivityId = this.projectForm.get('activityId').value;
        this.projectService.getProcessusByActivityId(selectedActivityId).subscribe(function (processus) {
            _this.processusList = processus;
            console.log('Processus list loaded:', _this.processusList);
            // Supprimer les KPIs actuellement sélectionnés
            _this.projectForm.get('kpis').setValue([]);
            // Si un processus est sélectionné, chargez les KPIs associés à ce processus
            if (_this.projectForm.get('processus').value.length > 0) {
                var selectedProcessusId = _this.projectForm.get('processus').value[0]; // Supposons que vous ne sélectionnez qu'un seul processus
                _this.loadKpiListByProcessusId(selectedProcessusId); // Appel à la méthode pour charger les KPIs
            }
        }, function (error) {
            console.error('Error fetching processus for selected activity:', error);
        });
    };
    AjouterprojetComponent.prototype.loadKpiListByProcessusId = function (processusId) {
        var _this = this;
        this.projectService.getKpisByProcessusIds([processusId]).subscribe(function (kpis) {
            _this.kpiList = kpis;
            console.log('Filtered KPI list loaded:', _this.kpiList);
        }, function (error) {
            console.error('Error fetching filtered KPI list:', error);
        });
    };
    AjouterprojetComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.projectForm.valid) {
            sweetalert2_1["default"].fire({
                title: 'Êtes-vous sûr de vouloir ajouter ce projet ?',
                text: 'Cette action est irréversible !',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Oui',
                cancelButtonText: 'Non'
            }).then(function (result) {
                if (result.isConfirmed) {
                    var formData = _this.projectForm.value;
                    var selectedProcessusIds = formData.processus;
                    var selectedProcessus = selectedProcessusIds.map(function (id) { return ({ id: id, name: '', description: '' }); });
                    var newProject = {
                        name: formData.name,
                        type: formData.type,
                        startDate: formData.startDate,
                        endDate: formData.endDate,
                        projectDate: {
                            startDate: formData.startDate,
                            endDate: formData.endDate
                        },
                        processus: selectedProcessus,
                        kpis: formData.kpis,
                        cli: formData.cli,
                        activity: { id: formData.activityId }
                    };
                    console.log('Attempting to create new project:', newProject);
                    _this.projectService.createProject(newProject).subscribe(function (createdProject) {
                        console.log('New project created:', createdProject);
                        _this.projectForm.reset();
                    }, function (error) {
                        console.error('Error creating project:', error);
                    });
                }
            });
        }
    };
    AjouterprojetComponent = __decorate([
        core_1.Component({
            selector: 'app-ajouterprojet',
            templateUrl: './ajouterprojet.component.html',
            styleUrls: ['./ajouterprojet.component.css']
        })
    ], AjouterprojetComponent);
    return AjouterprojetComponent;
}());
exports.AjouterprojetComponent = AjouterprojetComponent;
