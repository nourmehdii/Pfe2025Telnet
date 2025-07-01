"use strict";
exports.__esModule = true;
exports.Analyse = exports.TypeProbleme = void 0;
var TypeProbleme;
(function (TypeProbleme) {
    TypeProbleme["INTERNE"] = "INTERNE";
    TypeProbleme["EXTERNE"] = "EXTERNE";
})(TypeProbleme = exports.TypeProbleme || (exports.TypeProbleme = {}));
var Analyse = /** @class */ (function () {
    function Analyse(project, typeProbleme, identificationProbleme, methodeUtilisee, date, causes // Ajout du paramètre causes dans le constructeur
    ) {
        this.project = project;
        this.typeProbleme = typeProbleme;
        this.identificationProbleme = identificationProbleme;
        this.methodeUtilisee = methodeUtilisee;
        this.date = date;
        this.causes = causes; // Affectation des causes passées en paramètre
    }
    return Analyse;
}());
exports.Analyse = Analyse;
