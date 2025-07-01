"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PerformanceprocessusComponent = void 0;
var core_1 = require("@angular/core");
var updatelatesthistory_component_1 = require("../updatelatesthistory/updatelatesthistory.component");
var rxjs_1 = require("rxjs");
var forms_1 = require("@angular/forms");
var ajouterresultatkpi_component_1 = require("../ajouterresultatkpi/ajouterresultatkpi.component");
var modifierresultkpi_component_1 = require("../modifierresultkpi/modifierresultkpi.component");
var PerformanceprocessusComponent = /** @class */ (function () {
    function PerformanceprocessusComponent(service, projectService, // Injecter le service de projet
    dialog, formBuilder) {
        this.service = service;
        this.projectService = projectService;
        this.dialog = dialog;
        this.formBuilder = formBuilder;
        this.selectedActivity = 'all';
        this.selectedProcessusType = 'all';
        this.kpiValues = {};
        this.p = 1;
    }
    PerformanceprocessusComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.form = this.formBuilder.group({
            startDateP: [new Date(), forms_1.Validators.required],
            endDateP: [new Date(), forms_1.Validators.required]
        });
        this.form.get('startDateP').valueChanges.subscribe(function (value) {
            _this.startDateP = value;
        });
        this.form.get('endDateP').valueChanges.subscribe(function (value) {
            _this.endDateP = value;
        });
        this.getKpiList();
        this.getActivities();
        this.getProcessusList();
    };
    PerformanceprocessusComponent.prototype.shouldDisableButton = function () {
        var selectedProcessusId = Number(this.selectedProcessusType);
        var selectedProcess = this.processus.find(function (process) { return process.id === selectedProcessusId; });
        if (selectedProcess && (selectedProcess.name === 'OQM' || selectedProcess.name === 'RCT')) {
            return false;
        }
        else {
            return true;
        }
    };
    PerformanceprocessusComponent.prototype.getKpiList = function () {
        var _this = this;
        this.service.getKpiList().subscribe(function (kpis) {
            _this.kpis = kpis;
            _this.filteredKpis = kpis;
            _this.loadKpiValues();
            _this.getLatestKpiHistories();
        }, function (error) {
            console.error('Error retrieving KPI list:', error);
        });
    };
    PerformanceprocessusComponent.prototype.loadKpiValues = function () {
        var _this = this;
        this.filteredKpis.forEach(function (kpi) {
            _this.service.getKpiValueById(kpi.id).subscribe(function (value) {
                _this.kpiValues[kpi.id] = value;
            }, function (error) {
                console.error('Error fetching KPI value:', error);
            });
        });
    };
    PerformanceprocessusComponent.prototype.getLatestKpiHistories = function () {
        var _this = this;
        var requests = [];
        this.latestKpiHistories = {};
        this.kpis.forEach(function (kpi) {
            requests.push(_this.service.getLatestKpiHistory(kpi.id));
        });
        rxjs_1.forkJoin(requests).subscribe(function (histories) {
            histories.forEach(function (history, index) {
                _this.latestKpiHistories[_this.kpis[index].id] = history || {};
            });
        }, function (error) {
            console.error('Error retrieving latest histories:', error);
        });
    };
    PerformanceprocessusComponent.prototype.getProjectDetailsbykpi = function (kpiId) {
        var _this = this;
        this.projectService.getProjectsByKpi(kpiId)
            .subscribe(function (projectDetails) {
            _this.projectDetails = projectDetails;
            _this.projectName = projectDetails.name;
            _this.activity = projectDetails.activity;
            _this.client = projectDetails.client;
        }, function (error) {
            console.error('Erreur lors de la récupération des détails du projet :', error);
        });
    };
    PerformanceprocessusComponent.prototype.openModifierKpiHistoryModal = function (kpiId) {
        var _this = this;
        var history = this.latestKpiHistories[kpiId];
        if (!history || !('id' in history)) {
            console.error('History or historyId not found for KPI ID:', kpiId);
            return;
        }
        var historyId = history.id;
        var dialogRef = this.dialog.open(updatelatesthistory_component_1.UpdatelatesthistoryComponent, {
            width: '400px',
            data: { historyId: historyId }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            _this.getKpiList();
        });
    };
    PerformanceprocessusComponent.prototype.getActivities = function () {
        var _this = this;
        this.service.getActivities().subscribe(function (activities) {
            _this.activities = activities;
        }, function (error) {
            console.error('Error retrieving activities:', error);
        });
    };
    PerformanceprocessusComponent.prototype.filterKpiByActivity = function () {
        var _this = this;
        if (this.selectedActivity === 'all') {
            this.filteredKpis = this.kpis;
        }
        else {
            this.service.getKpisByActivityId(parseInt(this.selectedActivity)).subscribe(function (kpis) {
                _this.filteredKpis = kpis;
            }, function (error) {
                console.error('Error retrieving KPIs by activity:', error);
            });
        }
    };
    PerformanceprocessusComponent.prototype.filterKpisByDateRange = function () {
        var _this = this;
        var startDate = new Date(this.form.get('startDateP').value);
        var endDate = new Date(this.form.get('endDateP').value);
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            console.error('Start Date or End Date is not valid.');
            return;
        }
        this.service.getLatestKpiNamesBetweenDates(startDate, endDate).subscribe(function (kpiNames) {
            _this.filteredKpis = _this.kpis.filter(function (kpi) { return kpiNames.includes(kpi.name); });
        }, function (error) {
            console.error('Error fetching KPI names between dates:', error);
        });
    };
    PerformanceprocessusComponent.prototype.formatDate = function (date) {
        return date.toISOString().split('T')[0];
    };
    PerformanceprocessusComponent.prototype.isFormValid = function () {
        if (this.selectedProcessus === 'QQM' || this.selectedProcessus === 'RCT') {
            return this.form.valid;
        }
        else {
            return true;
        }
    };
    PerformanceprocessusComponent.prototype.openDialogg = function (kpiId) {
        var _this = this;
        var dialogRef = this.dialog.open(ajouterresultatkpi_component_1.AjouterresultatkpiComponent, {
            width: '600px',
            data: { kpiId: kpiId }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('Modal fermé avec résultat :', result);
            _this.loadKpiValues();
        });
    };
    PerformanceprocessusComponent.prototype.onFilterButtonClick = function () {
        this.filterKpisByDateRange();
    };
    PerformanceprocessusComponent.prototype.editValue = function (kpiId) {
        var _this = this;
        var dialogRef = this.dialog.open(modifierresultkpi_component_1.ModifierresultkpiComponent, {
            width: '600px',
            data: { kpiId: kpiId }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('Modal fermé avec résultat :', result);
            _this.loadKpiValues();
        });
    };
    PerformanceprocessusComponent.prototype.getProcessusList = function () {
        var _this = this;
        this.service.getProcessusList().subscribe(function (processus) {
            _this.processus = processus;
        }, function (error) {
            console.error('Error retrieving processus list:', error);
        });
    };
    PerformanceprocessusComponent.prototype.filterKpiByProcessus = function () {
        var _this = this;
        if (this.selectedProcessusType === 'all') {
            this.getKpiList();
        }
        else {
            var processusId = parseInt(this.selectedProcessusType);
            this.service.getKpisByProcessusIds([processusId]).subscribe(function (kpis) {
                _this.filteredKpis = kpis;
            }, function (error) {
                console.error('Error retrieving filtered KPIs:', error);
            });
        }
    };
    PerformanceprocessusComponent.prototype.onProcessusSelectionChange = function () {
        this.filterKpiByProcessus();
    };
    PerformanceprocessusComponent = __decorate([
        core_1.Component({
            selector: 'app-performanceprocessus',
            templateUrl: './performanceprocessus.component.html',
            styleUrls: ['./performanceprocessus.component.css']
        })
    ], PerformanceprocessusComponent);
    return PerformanceprocessusComponent;
}());
exports.PerformanceprocessusComponent = PerformanceprocessusComponent;
