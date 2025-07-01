"use strict";
exports.__esModule = true;
exports.ResultsPip = void 0;
var ResultsPip = /** @class */ (function () {
    function ResultsPip(expectation, risk, existantMonitoring, setupMonitoring, processus // Ajoutez le paramètre processus ici
    ) {
        if (processus === void 0) { processus = []; }
        this.expectation = expectation;
        this.risk = risk;
        this.existantMonitoring = existantMonitoring;
        this.setupMonitoring = setupMonitoring;
        this.processus = processus; // Et ici
    }
    return ResultsPip;
}());
exports.ResultsPip = ResultsPip;
