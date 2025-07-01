"use strict";
// Project.model.ts
exports.__esModule = true;
exports.Project = void 0;
var Project = /** @class */ (function () {
    function Project(name, type, startDate, endDate, processus, cli, activityId, activities) {
        this.name = name;
        this.type = type;
        this.startDate = startDate;
        this.endDate = endDate;
        this.processus = processus;
        this.cli = cli;
        this.activity = { id: activityId }; // Initialiser la propriété activity avec la structure attendue
        this.projectDate = {
            startDate: startDate,
            endDate: endDate
        };
        this.activities = activities; // Initialiser la propriété activities avec les activités fournies
    }
    return Project;
}());
exports.Project = Project;
