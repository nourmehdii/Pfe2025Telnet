"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeaderComponent = void 0;
var core_1 = require("@angular/core");
var jspdf_1 = require("jspdf");
require("jspdf-autotable");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(userService, projectService, pipService, router) {
        this.userService = userService;
        this.projectService = projectService;
        this.pipService = pipService;
        this.router = router;
        this.userList = [];
        this.activityList = [];
        this.kpiList = [];
        this.processList = [];
        this.projectList = [];
        this.pipList = [];
        this.totalProjectsByClient = [];
        this.countAnalysesForProject = 0;
        this.projectCountByType = [];
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        var userId = this.getUserIdFromLocalStorage();
        if (userId) {
            this.userService.getEmailById(userId).subscribe(function (response) {
                _this.currentUserEmail = response.email;
            }, function (error) {
                console.error('Error fetching current user email:', error);
            });
        }
        else {
            console.error('User ID not found in local storage');
        }
        // Using forkJoin to fetch all data in parallel
        rxjs_1.forkJoin({
            userList: this.userService.getUserList().pipe(operators_1.catchError(function (err) { return rxjs_1.of([]); })),
            activityList: this.userService.getActivities().pipe(operators_1.catchError(function (err) { return rxjs_1.of([]); })),
            kpiList: this.userService.getKpiList().pipe(operators_1.catchError(function (err) { return rxjs_1.of([]); })),
            processList: this.userService.getProcessusList().pipe(operators_1.catchError(function (err) { return rxjs_1.of([]); })),
            projectList: this.projectService.getProjectList().pipe(operators_1.catchError(function (err) { return rxjs_1.of([]); })),
            pipList: this.pipService.getPipList().pipe(operators_1.catchError(function (err) { return rxjs_1.of([]); }))
        }).subscribe({
            next: function (_a) {
                var userList = _a.userList, activityList = _a.activityList, kpiList = _a.kpiList, processList = _a.processList, projectList = _a.projectList, pipList = _a.pipList;
                _this.userList = userList;
                _this.activityList = activityList;
                _this.kpiList = kpiList;
                _this.processList = processList;
                _this.projectList = projectList;
                _this.pipList = pipList;
            },
            error: function (error) {
                console.error('Error fetching data:', error);
                // Handle global data fetching error here
            }
        });
    };
    HeaderComponent.prototype.getProjectCountByType = function (type) {
        var _this = this;
        this.projectService.getProjectCountByType(type)
            .subscribe(function (response) {
            var count = _this.getCountFromResponse(response, type);
            _this.projectCountByType.push({ type: type, count: count });
            // Example: Implement logic to handle recursive call or next step dynamically
        });
    };
    HeaderComponent.prototype.getCountFromResponse = function (response, type) {
        // Implement your logic to extract count from the response
        return response.count; // Example, replace with actual logic
    };
    HeaderComponent.prototype.generateFullReport = function () {
        var _this = this;
        rxjs_1.forkJoin({
            userList: this.userService.getUserList().pipe(operators_1.catchError(function (err) { return rxjs_1.of([]); })),
            activityList: this.userService.getActivities().pipe(operators_1.catchError(function (err) { return rxjs_1.of([]); })),
            kpiList: this.userService.getKpiList().pipe(operators_1.catchError(function (err) { return rxjs_1.of([]); })),
            processList: this.userService.getProcessusList().pipe(operators_1.catchError(function (err) { return rxjs_1.of([]); })),
            projectList: this.projectService.getProjectList().pipe(operators_1.catchError(function (err) { return rxjs_1.of([]); })),
            pipList: this.pipService.getPipList().pipe(operators_1.catchError(function (err) { return rxjs_1.of([]); })),
            totalProjectsByClient: this.projectService.getTotalProjetsParClient().pipe(operators_1.catchError(function (err) { return rxjs_1.of([]); }))
        })
            .subscribe({
            next: function (_a) {
                var userList = _a.userList, activityList = _a.activityList, kpiList = _a.kpiList, processList = _a.processList, projectList = _a.projectList, pipList = _a.pipList;
                var sections = [
                    { title: 'Utilisateurs', headers: ['Username', 'Email'], data: userList },
                    { title: 'Activités', headers: ['ID', 'name', 'Description'], data: activityList },
                    { title: 'KPIs', headers: ['ID', 'name', 'frequence', 'objectif'], data: kpiList },
                    { title: 'Processus', headers: ['ID', 'name', 'Description'], data: processList },
                    { title: 'Projects', headers: ['ID', 'name', 'type'], data: projectList },
                    { title: 'PIPs', headers: ['ID', 'name', 'category', 'type'], data: pipList }
                ];
                _this.generatePDF(sections);
            },
            error: function (error) {
                console.error('Error generating report:', error);
            }
        });
    };
    HeaderComponent.prototype.generatePDF = function (sections) {
        var _this = this;
        var doc = new jspdf_1["default"]();
        doc.setFont('Helvetica');
        doc.setFontSize(12);
        var startY = 10;
        sections.forEach(function (section) {
            doc.setFontSize(18);
            doc.text(section.title, 15, startY + 10);
            startY += 20;
            _this.generateTable(doc, section.headers, section.data, startY);
            startY = startY + 10 + (section.data.length * 10) + 10;
            if (startY > doc.internal.pageSize.height - 20) {
                doc.addPage();
                startY = 10;
            }
        });
        doc.save('rapport.pdf');
    };
    HeaderComponent.prototype.generateTable = function (doc, headers, data, startY) {
        var _this = this;
        var columnWidths = this.calculateColumnWidths(headers);
        var startX = 15;
        var rowHeight = 10;
        var cellPadding = 2;
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(12);
        var currentY = startY;
        headers.forEach(function (header) {
            doc.rect(startX, currentY, columnWidths[header], rowHeight);
            doc.text(header, startX + cellPadding, currentY + rowHeight - cellPadding, { baseline: 'bottom' });
            startX += columnWidths[header];
        });
        startY += rowHeight;
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(10);
        data.forEach(function (item) {
            startX = 15;
            headers.forEach(function (header) {
                var cellContent = String(item[header.replace(' ', '').toLowerCase()] || '');
                if (typeof cellContent === 'object') {
                    cellContent = _this.resolveNestedData(item, header);
                }
                doc.rect(startX, startY, columnWidths[header], rowHeight);
                doc.text(cellContent, startX + cellPadding, startY + rowHeight - cellPadding, { baseline: 'bottom' });
                startX += columnWidths[header];
            });
            startY += rowHeight;
        });
    };
    HeaderComponent.prototype.calculateColumnWidths = function (headers) {
        var widths = {
            Username: 40,
            Email: 80,
            ID: 20,
            name: 60,
            Description: 100,
            frequence: 30,
            objectif: 50,
            Client: 60,
            'Total Projets': 40,
            'Project ID': 20,
            Count: 30,
            Type: 50,
            'Project Count by Type': 50
        };
        headers.forEach(function (header) {
            if (!widths[header]) {
                widths[header] = 50;
            }
        });
        return widths;
    };
    HeaderComponent.prototype.resolveNestedData = function (item, header) {
        var parts = header.toLowerCase().split('.');
        var value = item;
        for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
            var part = parts_1[_i];
            value = value[part];
            if (value === undefined || value === null) {
                return '';
            }
        }
        return String(value);
    };
    HeaderComponent.prototype.getUserIdFromLocalStorage = function () {
        var userId = localStorage.getItem('userId');
        return userId ? +userId : null;
    };
    HeaderComponent.prototype.logout = function () {
        localStorage.clear();
        this.router.navigate(['/login']);
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.css']
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
