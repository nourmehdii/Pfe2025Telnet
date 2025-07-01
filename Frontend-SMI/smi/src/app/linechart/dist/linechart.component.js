"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LinechartComponent = void 0;
var core_1 = require("@angular/core");
var chart_js_1 = require("chart.js");
var LinechartComponent = /** @class */ (function () {
    function LinechartComponent(userService, route) {
        this.userService = userService;
        this.route = route;
    }
    LinechartComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            var kpiId = +params.get('id');
            _this.loadKpiData(kpiId);
            _this.loadKpiObjectif(kpiId);
        });
    };
    LinechartComponent.prototype.loadKpiData = function (kpiId) {
        var _this = this;
        this.userService.getKpiHistoryByKpiId(kpiId).subscribe(function (kpiHistory) {
            // Sort kpiHistory by startDateP in ascending order
            _this.kpiHistory = kpiHistory.sort(function (a, b) { return new Date(a.startDateP).getTime() - new Date(b.startDateP).getTime(); });
            _this.createChart();
        }, function (error) {
            console.error('Error fetching KPI history:', error);
        });
    };
    LinechartComponent.prototype.loadKpiObjectif = function (kpiId) {
        var _this = this;
        this.userService.getKpiObjectifById(kpiId).subscribe(function (objectif) {
            _this.kpiObjectif = objectif;
            _this.createChart();
        }, function (error) {
            console.error('Error fetching KPI objectif:', error);
        });
    };
    LinechartComponent.prototype.createChart = function () {
        if (!this.kpiHistory || !this.kpiObjectif) {
            console.error('KPI history or objectif not available.');
            return;
        }
        var ctx = document.getElementById('kpiChart');
        var data = [];
        var dateLabels = [];
        var uniqueDateSet = new Set(); // Utiliser un ensemble pour stocker les dates uniques
        // Parcourir l'historique du KPI
        this.kpiHistory.forEach(function (history) {
            var startDate = new Date(history.startDateP);
            var endDate = new Date(history.endDateP);
            // Construire les libellés de date au format "Mois Année"
            var startLabel = startDate.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
            var endLabel = endDate.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
            // Vérifier si la date de début n'est pas déjà ajoutée à l'ensemble
            if (!uniqueDateSet.has(startLabel)) {
                dateLabels.push(startLabel);
                uniqueDateSet.add(startLabel); // Ajouter la date à l'ensemble
            }
            // Vérifier si la date de fin n'est pas déjà ajoutée à l'ensemble
            if (!uniqueDateSet.has(endLabel)) {
                dateLabels.push(endLabel);
                uniqueDateSet.add(endLabel); // Ajouter la date à l'ensemble
            }
            data.push(history.value);
        });
        // Trier les libellés de date de manière croissante en utilisant le mois et l'année
        dateLabels = dateLabels.sort(function (a, b) {
            var _a = a.split(' '), monthA = _a[0], yearA = _a[1];
            var _b = b.split(' '), monthB = _b[0], yearB = _b[1];
            // Comparaison basée sur l'année
            if (yearA !== yearB) {
                return parseInt(yearA) - parseInt(yearB);
            }
            // Si les années sont égales, comparer les mois
            var monthOrder = {
                'jan': 1, 'feb': 2, 'mar': 3, 'apr': 4, 'may': 5, 'jun': 6,
                'jul': 7, 'aug': 8, 'sep': 9, 'oct': 10, 'nov': 11, 'dec': 12
            };
            return monthOrder[monthA.toLowerCase()] - monthOrder[monthB.toLowerCase()];
        });
        new chart_js_1.Chart(ctx, {
            type: 'line',
            data: {
                labels: dateLabels,
                datasets: [
                    {
                        label: 'Évolution du KPI',
                        data: data,
                        borderColor: 'blue',
                        backgroundColor: 'rgba(0, 0, 255, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Objectif',
                        data: Array.from({ length: dateLabels.length }).fill(this.kpiObjectif),
                        borderColor: 'green',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Évolution du KPI par rapport à l\'objectif'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    y: {
                        min: 0,
                        max: 100,
                        ticks: {
                            stepSize: 25,
                            callback: function (value) {
                                if (value === 0 || value === 25 || value === 50 || value === 75 || value === 100) {
                                    return value.toString();
                                }
                                else {
                                    return '';
                                }
                            }
                        },
                        title: {
                            display: true,
                            text: 'Valeurs'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Période (Mois Année)'
                        }
                    }
                }
            }
        });
    };
    LinechartComponent.prototype.downloadChart = function () {
        var canvas = document.getElementById('kpiChart');
        if (!canvas) {
            console.error('Canvas element not found.');
            return;
        }
        canvas.toBlob(function (blob) {
            var url = window.URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = url;
            link.download = 'evolution_kpi.jpg';
            link.click();
            window.URL.revokeObjectURL(url);
        }, 'image/jpeg');
    };
    __decorate([
        core_1.ViewChild('kpiChart')
    ], LinechartComponent.prototype, "kpiChartRef");
    LinechartComponent = __decorate([
        core_1.Component({
            selector: 'app-linechart',
            templateUrl: './linechart.component.html',
            styleUrls: ['./linechart.component.css']
        })
    ], LinechartComponent);
    return LinechartComponent;
}());
exports.LinechartComponent = LinechartComponent;
