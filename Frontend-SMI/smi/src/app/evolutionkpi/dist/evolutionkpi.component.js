"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EvolutionkpiComponent = void 0;
var auto_1 = require("chart.js/auto");
var email_modal_component_1 = require("../email-modal/email-modal.component");
var core_1 = require("@angular/core");
var jspdf_1 = require("jspdf");
var EvolutionkpiComponent = /** @class */ (function () {
    function EvolutionkpiComponent(userService, route, dialog) {
        this.userService = userService;
        this.route = route;
        this.dialog = dialog;
        this.startDateLabels = [];
        this.endDateLabels = [];
        this.kpiName = '';
    }
    EvolutionkpiComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            var kpiId = +params.get('id');
            // Charger les données du KPI
            _this.loadKpiData(kpiId);
            // Charger l'objectif du KPI
            _this.loadKpiObjectif(kpiId);
            // Appeler un service pour obtenir le nom du KPI à partir de kpiId
            _this.fetchKpiNameById(kpiId.toString()); // Convertir kpiId en string
        });
    };
    EvolutionkpiComponent.prototype.loadKpiData = function (kpiId) {
        var _this = this;
        this.userService.getKpiHistoryByKpiId(kpiId).subscribe(function (kpiHistory) {
            // Trier l'historique du KPI par date de début
            _this.kpiHistory = kpiHistory.sort(function (a, b) {
                return new Date(a.startDateP).getTime() - new Date(b.startDateP).getTime();
            });
            _this.createChart();
        }, function (error) {
            console.error('Error fetching KPI history:', error);
        });
    };
    EvolutionkpiComponent.prototype.loadKpiObjectif = function (kpiId) {
        var _this = this;
        this.userService.getKpiObjectifById(kpiId).subscribe(function (objectif) {
            _this.kpiObjectif = objectif;
            _this.createChart();
        }, function (error) {
            console.error('Error fetching KPI objectif:', error);
        });
    };
    EvolutionkpiComponent.prototype.createChart = function () {
        var _this = this;
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
            var startLabel = startDate.toLocaleDateString('fr-FR', {
                month: 'short',
                year: 'numeric'
            });
            var endLabel = endDate.toLocaleDateString('fr-FR', {
                month: 'short',
                year: 'numeric'
            });
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
                jan: 1,
                feb: 2,
                mar: 3,
                apr: 4,
                may: 5,
                jun: 6,
                jul: 7,
                aug: 8,
                sep: 9,
                oct: 10,
                nov: 11,
                dec: 12
            };
            return monthOrder[monthA.toLowerCase()] - monthOrder[monthB.toLowerCase()];
        });
        new auto_1["default"](ctx, {
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
                        backgroundColor: 'rgba(0, 200, 0, 0.2)',
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
                        text: "Évolution du KPI par rapport à l'objectif"
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
                                if (value === 0 ||
                                    value === 25 ||
                                    value === 50 ||
                                    value === 75 ||
                                    value === 100) {
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
        // Ajoutez un gestionnaire d'événements au canvas pour détecter un double-clic
        ctx.addEventListener('dblclick', function () {
            _this.openEmailModal(); // Ouvrez la modal pour envoyer l'e-mail
        });
    };
    EvolutionkpiComponent.prototype.openEmailModal = function () {
        var _this = this;
        var emailContent = this.generateEmailBody();
        var dialogRef = this.dialog.open(email_modal_component_1.EmailModalComponent, {
            width: '400px',
            data: { subject: 'Rapport KPI' }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('Dialog closed with result:', result);
            if (result === 'send') {
                var emailPayload = {
                    to: 'hadilkacem7@gmail.com',
                    subject: 'Rapport KPI',
                    body: emailContent.body,
                    attachment: emailContent.attachment
                };
                _this.sendEmailToQualityManager(emailPayload); // Envoyer l'e-mail au responsable qualité
            }
        });
    };
    EvolutionkpiComponent.prototype.fetchKpiNameById = function (kpiId) {
        var _this = this;
        // Appel à votre service pour récupérer le nom du KPI à partir de son ID
        this.userService.getKpiById(+kpiId).subscribe(function (kpi) {
            _this.kpi = kpi;
            _this.kpiName = kpi.name; // Mettre à jour le nom du KPI une fois récupéré
        }, function (error) {
            console.error('Error fetching KPI name:', error);
        });
    };
    EvolutionkpiComponent.prototype.generateEmailBody = function () {
        var _this = this;
        // Générer le contenu du corps de l'e-mail
        var body = 'Bonjour,\n\n';
        body += 'Veuillez trouver ci-joint le rapport KPI.\n\n';
        body += "Nom du KPI: " + this.kpiName + "\n\n";
        body += "Objectif KPI: " + this.kpiObjectif + "\n\n";
        body += 'Analyse de l\'évolution du KPI par rapport à l\'objectif:\n';
        body += '-----------------------------------------------------\n';
        this.kpiHistory.forEach(function (history) {
            var startLabel = new Date(history.startDateP).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
            var endLabel = new Date(history.endDateP).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
            var deviation = history.value - _this.kpiObjectif;
            var trend = deviation > 0 ? 'au-dessus' : deviation < 0 ? 'en-dessous' : 'atteint';
            body += startLabel + " - " + endLabel + ": " + history.value + " (" + trend + " de l'objectif par " + Math.abs(deviation) + ")\n";
        });
        // Générer le fichier PDF
        var pdf = new jspdf_1["default"]();
        pdf.text(body, 10, 10); // Ajouter le contenu du corps de l'e-mail dans le PDF
        var pdfContent = pdf.output('datauristring'); // Convertir le PDF en une chaîne de données URI
        // Préparer la pièce jointe PDF pour l'e-mail
        var attachment = {
            filename: 'rapport_kpi.pdf',
            content: pdfContent.split(',')[1] // Extraire seulement les données du PDF (enlever le préfixe 'data:application/pdf;base64,')
        };
        return { body: body, attachment: attachment };
    };
    // Fonction pour envoyer l'email au responsable qualité
    EvolutionkpiComponent.prototype.sendEmailToQualityManager = function (emailPayload) {
        this.userService.sendEmail(emailPayload.to, emailPayload.subject, emailPayload.body).subscribe(function (response) {
            console.log('Email sent successfully:', response);
            // Affichez un message de succès à l'utilisateur si nécessaire
        }, function (error) {
            console.error('Error sending email:', error);
            // Gérez l'erreur et affichez un message à l'utilisateur si nécessaire
        });
    };
    EvolutionkpiComponent.prototype.generatePDF = function () {
        var _this = this;
        var pdf = new jspdf_1["default"]();
        // Générer le titre du document
        pdf.text("Rapport KPI - " + this.kpiName, 10, 10);
        // Générer le contenu du rapport
        var y = 30;
        pdf.text("Objectif KPI: " + this.kpiObjectif, 10, y);
        y += 10;
        pdf.text('Analyse de l\'évolution du KPI par rapport à l\'objectif:', 10, y);
        y += 5;
        pdf.text('-----------------------------------------------------', 10, y);
        y += 5;
        this.kpiHistory.forEach(function (history) {
            var startLabel = new Date(history.startDateP).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
            var endLabel = new Date(history.endDateP).toLocaleDateString('fr-FR', {
                month: 'short',
                year: 'numeric'
            });
            var deviation = history.value - _this.kpiObjectif;
            var trend = deviation > 0 ? 'au-dessus' : deviation < 0 ? 'en-dessous' : 'atteint';
            var text = startLabel + " - " + endLabel + ": " + history.value + " (" + trend + " de l'objectif par " + Math.abs(deviation) + ")";
            pdf.text(text, 10, y);
            y += 5;
        });
        // Télécharger le PDF
        pdf.save('rapport_kpi.pdf');
    };
    EvolutionkpiComponent.prototype.downloadChart = function () {
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
    ], EvolutionkpiComponent.prototype, "kpiChartRef");
    EvolutionkpiComponent = __decorate([
        core_1.Component({
            selector: 'app-evolutionkpi',
            templateUrl: './evolutionkpi.component.html',
            styleUrls: ['./evolutionkpi.component.css']
        })
    ], EvolutionkpiComponent);
    return EvolutionkpiComponent;
}());
exports.EvolutionkpiComponent = EvolutionkpiComponent;
