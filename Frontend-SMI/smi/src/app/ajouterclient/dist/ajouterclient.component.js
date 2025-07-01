"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AjouterclientComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var sweetalert2_1 = require("sweetalert2");
var AjouterclientComponent = /** @class */ (function () {
    function AjouterclientComponent(clientService, fb) {
        this.clientService = clientService;
        this.fb = fb;
        this.clientForm = this.fb.group({
            name: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            phone: ['', [forms_1.Validators.required, forms_1.Validators.pattern(/^\d{10}$/)]],
            active: [false],
            email: ['', [forms_1.Validators.email]],
            streetAddress: [''],
            city: [''],
            state: [''],
            country: ['']
        });
    }
    AjouterclientComponent.prototype.ngOnInit = function () { };
    AjouterclientComponent.prototype.ajouterClient = function () {
        var _this = this;
        if (this.clientForm.invalid) {
            sweetalert2_1["default"].fire('Erreur !', 'Veuillez vérifier les champs du formulaire', 'error');
            return;
        }
        var newClient = this.clientForm.value;
        this.clientService.addClient(newClient).subscribe(function (response) {
            sweetalert2_1["default"].fire('Succès !', 'Client ajouté avec succès', 'success').then(function () {
                // Réinitialisez le formulaire avec les valeurs par défaut
                _this.clientForm.reset({
                    name: '',
                    phone: '',
                    active: false,
                    email: '',
                    streetAddress: '',
                    city: '',
                    state: '',
                    country: ''
                });
            });
        }, function (error) {
            sweetalert2_1["default"].fire('Erreur !', "Une erreur est survenue lors de l'ajout du client : " + error.message, 'error');
            console.error('Erreur lors de l\'ajout du client : ', error);
        });
    };
    AjouterclientComponent = __decorate([
        core_1.Component({
            selector: 'app-ajouterclient',
            templateUrl: './ajouterclient.component.html',
            styleUrls: ['./ajouterclient.component.css']
        })
    ], AjouterclientComponent);
    return AjouterclientComponent;
}());
exports.AjouterclientComponent = AjouterclientComponent;
