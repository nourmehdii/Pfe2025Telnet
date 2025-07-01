"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ListprojetComponent = void 0;
var core_1 = require("@angular/core");
var ajouterprojet_component_1 = require("../ajouterprojet/ajouterprojet.component");
var sweetalert2_1 = require("sweetalert2");
var modifierproject_component_1 = require("../modifierproject/modifierproject.component");
var jspdf_1 = require("jspdf");
var jspdf_autotable_1 = require("jspdf-autotable");
var XLSX = require("xlsx");
var ListprojetComponent = /** @class */ (function () {
    function ListprojetComponent(dialog, userService, router) {
        this.dialog = dialog;
        this.userService = userService;
        this.router = router;
        this.selectedActivity = ''; // Activité sélectionnée
        this.tableRows = [];
        this.p = 1;
    }
    ListprojetComponent.prototype.ngOnInit = function () {
        this.getProjectList(); // Chargez la liste de tous les projets lors de l'initialisation du composant
        this.loadActivities(); // Chargez la liste des activités lors de l'initialisation du composant
    };
    ListprojetComponent.prototype.filterProjectsByActivity = function () {
        var _this = this;
        if (!this.selectedActivity) {
            this.filteredProjects = this.projects; // Affichez tous les projets si aucune activité n'est sélectionnée
        }
        else {
            this.filteredProjects = this.projects.filter(function (project) {
                // Vérifiez que project.activity est défini avant d'accéder à project.activity.id
                return project.activity && project.activity.id && project.activity.id.toString() === _this.selectedActivity;
            });
        }
    };
    ListprojetComponent.prototype.openAjouterprojetModal = function () {
        var _this = this;
        var dialogRef = this.dialog.open(ajouterprojet_component_1.AjouterprojetComponent, {
            width: '500px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            // Rechargez la liste des projets après la fermeture du dialogue
            _this.getProjectList();
        });
    };
    ListprojetComponent.prototype.formatDate = function (date) {
        if (!date)
            return ''; // Vérifie si la date est définie
        var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Intl.DateTimeFormat('fr-FR', options).format(date); // Formatage de la date en format 'dd/MM/yyyy'
    };
    ListprojetComponent.prototype.getProjectList = function () {
        var _this = this;
        this.userService.getProjectList().subscribe(function (projects) {
            _this.projects = projects; // Assignez la liste des projets à la variable
            _this.filteredProjects = projects; // Initialisez également les projets filtrés avec tous les projets au début
            console.log('Liste des projets:', _this.projects);
            // Une fois que la liste des projets est récupérée, pour chaque projet, appelez la méthode getActivitiesByProjectId
            _this.projects.forEach(function (project) {
                _this.getActivitiesByProjectId(project.id);
            });
        }, function (error) {
            console.error('Erreur lors de la récupération de la liste des projets:', error);
        });
    };
    ListprojetComponent.prototype.getActivitiesByProjectId = function (projectId) {
        var _this = this;
        this.userService.getActivitiesByProjectId(projectId).subscribe(function (activities) {
            console.log('Activités associées au projet', activities);
            // Mapper les chaînes en instances d'Activity
            var mappedActivities = activities.map(function (activityName) { return ({ id: 0, name: activityName, description: '' }); });
            // Recherchez le projet correspondant dans la liste des projets
            var project = _this.projects.find(function (proj) { return proj.id === projectId; });
            if (project) {
                // Assignez les activités mappées au projet
                project.activities = mappedActivities;
            }
            else {
                console.error('Projet non trouvé:', projectId);
            }
        }, function (error) {
            console.error('Erreur lors de la récupération des activités associées au projet:', error);
        });
    };
    ListprojetComponent.prototype.loadActivities = function () {
        var _this = this;
        this.userService.getActivities().subscribe(function (activities) {
            _this.activities = activities; // Affectez les activités récupérées à la variable
        }, function (error) {
            console.error('Erreur lors de la récupération de la liste des activités:', error);
        });
    };
    ListprojetComponent.prototype.getProcessusByProjectId = function (projectId) {
        this.userService.getProcessusByProjectId(projectId).subscribe(function (processus) {
            console.log('Processus associés au projet', processus);
            // Vous pouvez affecter les processus récupérés à une propriété de votre modèle de vue ici
        }, function (error) {
            console.error('Erreur lors de la récupération des processus associés au projet:', error);
        });
    };
    ListprojetComponent.prototype.deleteProject = function (projectId) {
        var _this = this;
        sweetalert2_1["default"].fire({
            title: 'Êtes-vous sûr?',
            text: 'Voulez-vous vraiment supprimer ce projet?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Oui, supprimer!',
            cancelButtonText: 'Annuler'
        }).then(function (result) {
            if (result.isConfirmed) {
                _this.userService.deleteProject(projectId).subscribe(function () {
                    sweetalert2_1["default"].fire('Supprimé!', 'Le projet a été supprimé avec succès.', 'success').then(function () {
                        // Rechargez la liste des projets après la suppression
                        _this.getProjectList();
                    });
                }, function (error) {
                    console.error('Erreur lors de la suppression du projet:', error);
                    sweetalert2_1["default"].fire('Erreur!', 'Une erreur s\'est produite lors de la suppression du projet.', 'error');
                });
            }
        });
    };
    ListprojetComponent.prototype.navigateToProjectDetails = function (id) {
        this.router.navigate(['/projetsdetails', id]);
    };
    ListprojetComponent.prototype.openUpdateProjectModal = function (projectId) {
        var _this = this;
        var dialogRef = this.dialog.open(modifierproject_component_1.ModifierprojectComponent, {
            width: '500px',
            data: { projectId: projectId } // Assurez-vous que projectId est correctement passé ici
        });
        dialogRef.componentInstance.projectUpdated.subscribe(function () {
            _this.getProjectList(); // Rechargez la liste des projets après la mise à jour
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            // Vous pouvez ajouter un traitement supplémentaire après la fermeture de la modal ici
        });
    };
    ListprojetComponent.prototype.downloadPDF = function () {
        var doc = new jspdf_1["default"]();
        // Style pour le titre
        var titleText = 'Liste des Projets';
        var titleFontSize = 18;
        var titleX = 15; // Position X du titre (aligné à gauche)
        var titleY = 25;
        doc.setFontSize(titleFontSize);
        doc.setTextColor(40);
        doc.setFont('helvetica', 'bold'); // Utilisation de la police "helvetica" en gras pour le titre
        doc.text(titleText, titleX, titleY);
        // Configuration de la taille du logo
        var logoWidth = 25; // Largeur du logo
        var logoHeight = 25; // Hauteur du logo
        // Position du logo en haut à droite de la page
        var logoMarginRight = 15; // Marge droite pour le logo
        var logoMarginTop = 10; // Marge supérieure pour le logo
        // Calcul de la position X du logo
        var logoX = doc.internal.pageSize.getWidth() - logoWidth - logoMarginRight;
        // Ajout du logo Telnet en haut à droite de la page
        doc.addImage('assets/images/LogoTelnet.png', 'PNG', logoX, logoMarginTop, logoWidth, logoHeight);
        // Configuration du tableau
        var tableRows = [];
        var headers = ['Nom', 'Type', 'Date de début', 'Date de fin', 'Processus', 'Activités', 'Client'];
        // Remplissage des données du tableau
        this.projects.forEach(function (project) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            var projectData = [
                (_a = project.name) !== null && _a !== void 0 ? _a : 'N/A',
                (_b = project.type) !== null && _b !== void 0 ? _b : 'N/A',
                new Date((_d = (_c = project.projectDate) === null || _c === void 0 ? void 0 : _c.startDate) !== null && _d !== void 0 ? _d : '').toLocaleDateString() || 'N/A',
                new Date((_f = (_e = project.projectDate) === null || _e === void 0 ? void 0 : _e.endDate) !== null && _f !== void 0 ? _f : '').toLocaleDateString() || 'N/A',
                ((_g = project.processus) !== null && _g !== void 0 ? _g : []).map(function (p) { return p.name; }).join(', '),
                ((_h = project.activities) !== null && _h !== void 0 ? _h : []).map(function (a) { return a.name; }).join(', '),
                (_k = (_j = project.cli) === null || _j === void 0 ? void 0 : _j.name) !== null && _k !== void 0 ? _k : 'N/A' // Vérifiez que cli existe
            ];
            tableRows.push(projectData);
        });
        // Génération du tableau avec AutoTable
        jspdf_autotable_1["default"](doc, {
            head: [headers],
            body: tableRows,
            startY: titleY + titleFontSize + 10,
            theme: 'grid',
            styles: {
                fontSize: 10,
                cellPadding: 3,
                valign: 'middle',
                halign: 'center',
                lineWidth: 0.2
            },
            columnStyles: {
                0: { fontStyle: 'bold' }
            },
            margin: { top: 25 } // Ajoutez un peu plus d'espace au-dessus du tableau
        });
        // Sauvegarde du document PDF
        doc.save('project_list.pdf');
    };
    ListprojetComponent.prototype.exportToExcel = function () {
        // Nom des colonnes dans le fichier Excel
        var headers = ['Nom', 'Type', 'Date de début', 'Date de fin', 'Processus', 'Activités', 'Client'];
        // Assurez-vous que this.projects est défini et est un tableau
        if (!Array.isArray(this.projects)) {
            console.error('Les projets ne sont pas définis ou ne sont pas un tableau:', this.projects);
            return;
        }
        // Données à exporter
        var data = this.projects.map(function (project) {
            var _a, _b, _c, _d, _e;
            return [
                project.name || '',
                project.type || '',
                ((_a = project.projectDate) === null || _a === void 0 ? void 0 : _a.startDate) ? new Date(project.projectDate.startDate).toLocaleDateString() : '',
                ((_b = project.projectDate) === null || _b === void 0 ? void 0 : _b.endDate) ? new Date(project.projectDate.endDate).toLocaleDateString() : '',
                ((_c = project.processus) === null || _c === void 0 ? void 0 : _c.map(function (p) { return p.name; }).join(', ')) || '',
                ((_d = project.activities) === null || _d === void 0 ? void 0 : _d.map(function (a) { return a.name; }).join(', ')) || '',
                ((_e = project.cli) === null || _e === void 0 ? void 0 : _e.name) || '' // Valeur par défaut si undefined
            ];
        });
        // Créer un nouveau classeur Excel
        var workbook = XLSX.utils.book_new();
        // Créer une nouvelle feuille dans le classeur
        var worksheet = XLSX.utils.aoa_to_sheet(__spreadArrays([headers], data));
        // Ajouter la feuille au classeur
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Liste des Projets');
        // Générer le blob du fichier Excel
        var excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        // Créer un blob à partir du buffer Excel
        var blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        // Nom du fichier Excel
        var fileName = 'project_list.xlsx';
        // Création d'un lien pour le téléchargement
        var downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.setAttribute('download', fileName);
        // Ajout du lien au corps du document
        document.body.appendChild(downloadLink);
        // Clic sur le lien pour déclencher le téléchargement
        downloadLink.click();
        // Suppression du lien du corps du document après le téléchargement
        document.body.removeChild(downloadLink);
    };
    ListprojetComponent.prototype.handleDownload = function (option) {
        if (option === 'pdf') {
            this.downloadPDF();
        }
        else if (option === 'excel') {
            this.exportToExcel();
        }
    };
    ListprojetComponent = __decorate([
        core_1.Component({
            selector: 'app-listprojet',
            templateUrl: './listprojet.component.html',
            styleUrls: ['./listprojet.component.css']
        })
    ], ListprojetComponent);
    return ListprojetComponent;
}());
exports.ListprojetComponent = ListprojetComponent;
