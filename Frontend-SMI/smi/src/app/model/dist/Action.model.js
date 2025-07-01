"use strict";
exports.__esModule = true;
exports.Action = void 0;
var Action = /** @class */ (function () {
    function Action(typeAction, // Utiliser l'enum TypeAction
    responsable, datePlanification, dateRealisation, critereEfficacite, efficace, commentaire, cause, action) {
        this.typeAction = typeAction;
        this.responsable = responsable;
        this.datePlanification = datePlanification;
        this.dateRealisation = dateRealisation;
        this.critereEfficacite = critereEfficacite;
        this.efficace = efficace;
        this.commentaire = commentaire;
        this.cause = cause;
        this.action = action;
    }
    return Action;
}());
exports.Action = Action;
