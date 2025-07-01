"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardComponent = void 0;
var core_1 = require("@angular/core");
require("chartjs-plugin-datalabels");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(projectService, analyseService) {
        this.projectService = projectService;
        this.analyseService = analyseService;
        this.projectCountByType = [];
        this.totalProjetsParClient = [];
        this.analyseCountsByProject = [];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.getTotalProjetsParClient();
        this.getAnalyseCountAndCreateChartForAllProjects();
        this.getTotalProjetsParType();
        this.createPieChart();
    };
    DashboardComponent.prototype.getTotalProjetsParClient = function () {
        var _this = this;
        this.projectService.getTotalProjetsParClient()
            .subscribe(function (data) {
            _this.totalProjetsParClient = data.map(function (item) { return ({
                client: item[0],
                count: item[1]
            }); });
            _this.createBarChart();
        }, function (error) {
            console.error('Erreur lors de la récupération des total projets par client:', error);
        });
    };
    DashboardComponent.prototype.getTotalProjetsParType = function () {
        var _this = this;
        this.projectService.getTotalProjetsParType()
            .subscribe(function (data) {
            console.log('Data received for pie chart:', data); // Vérifiez les données reçues
            _this.projectCountByType = Array.from(data.entries()).map(function (_a) {
                var type = _a[0], count = _a[1];
                return ({ type: type, count: count });
            });
            _this.createPieChart(); // Appel pour créer le graphique après la récupération des données
        }, function (error) {
            console.error('Erreur lors de la récupération des projets par type:', error);
        });
    };
    DashboardComponent.prototype.createBarChart = function () {
        var canvas = document.getElementById('bar-chart');
        var ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('Context of bar-chart canvas not found');
            return;
        }
        var labels = this.totalProjetsParClient.map(function (item) { return item.client; });
        var data = this.totalProjetsParClient.map(function (item) { return item.count; });
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                        label: 'Total projets par client',
                        data: data,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderWidth: 1
                    }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                },
                plugins: {
                    datalabels: {
                        anchor: 'end',
                        align: 'end',
                        font: {
                            size: 10
                        }
                    }
                }
            }
        });
    };
    DashboardComponent.prototype.getAnalyseCountAndCreateChartForAllProjects = function () {
        var _this = this;
        this.projectService.getProjectList()
            .subscribe(function (projects) {
            projects.forEach(function (project) {
                _this.analyseService.countAnalysesForProject(project.id)
                    .subscribe(function (count) {
                    _this.analyseCountsByProject.push({ projectId: project.id, count: count });
                    if (_this.analyseCountsByProject.length === projects.length) {
                        _this.createDoughnutChart();
                    }
                }, function (error) {
                    console.error('Erreur lors de la récupération du nombre d\'analyses pour le projet:', error);
                });
            });
        }, function (error) {
            console.error('Erreur lors de la récupération des projets:', error);
        });
    };
    DashboardComponent.prototype.createDoughnutChart = function () {
        var canvas = document.getElementById('doughnut-chart');
        var ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('Context of doughnut-chart canvas not found');
            return;
        }
        var labels = this.analyseCountsByProject.map(function (item) { return "Projet " + item.projectId; });
        var data = this.analyseCountsByProject.map(function (item) { return item.count; });
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                        data: data,
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)'
                        ],
                        borderWidth: 1
                    }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        fontSize: 10
                    }
                },
                plugins: {
                    datalabels: {
                        formatter: function (value) {
                            return value;
                        },
                        color: '#fff',
                        font: {
                            size: 12
                        }
                    }
                }
            }
        });
    };
    DashboardComponent.prototype.createPieChart = function () {
        var canvas = document.getElementById('pie-chart');
        var ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('Context of pie-chart canvas not found');
            return;
        }
        // Données statiques
        var labels = ['Régie', 'Forfait'];
        var data = [4, 2]; // Valeurs manuelles
        console.log('Pie chart labels:', labels);
        console.log('Pie chart data:', data);
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                        data: data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)' // Couleur pour 'Forfait'
                        ],
                        borderWidth: 1
                    }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            fontSize: 10
                        }
                    },
                    datalabels: {
                        formatter: function (value) {
                            var total = data.reduce(function (a, b) { return a + b; }, 0);
                            var percentage = ((value / total) * 100).toFixed(2) + '%';
                            return percentage;
                        },
                        color: '#fff',
                        font: {
                            size: 12
                        }
                    }
                }
            }
        });
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.css']
        })
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
