"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AjoutercadranComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2"); // Importer SweetAlert
var AjoutercadranComponent = /** @class */ (function () {
    function AjoutercadranComponent(cadranService) {
        this.cadranService = cadranService;
    } // Injectez le service CadranService dans le constructeur
    AjoutercadranComponent.prototype.ngOnInit = function () {
        this.getVoletList(); // Appelez la méthode pour récupérer la liste des volets lors de l'initialisation du composant
    };
    AjoutercadranComponent.prototype.ajouterCadran = function () {
        var _this = this;
        // Vérifiez d'abord si selectedVolet contient une valeur valide
        if (this.selectedVolet) {
            // Créez un nouvel objet Cadran avec les valeurs sélectionnées
            var cadran_1 = {
                name: this.nomCadran,
                type: this.selectedType,
                volet: this.selectedVolet
            };
            // Obtenez l'identifiant du volet
            var voletId_1 = this.selectedVolet.id;
            // Utilisez SweetAlert pour afficher une confirmation avant d'ajouter le cadran
            sweetalert2_1["default"].fire({
                title: 'Êtes-vous sûr de vouloir ajouter ce cadran?',
                text: 'Cette action est irréversible!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Oui, ajouter!'
            }).then(function (result) {
                if (result.isConfirmed) {
                    // Appelez la méthode du service pour ajouter le cadran avec l'identifiant du volet
                    _this.cadranService.ajouterCadran(voletId_1, cadran_1).subscribe(function (response) {
                        // Traitement de la réponse réussie du backend
                        console.log('Cadran ajouté avec succès:', response);
                        // Affichez une alerte de succès
                        sweetalert2_1["default"].fire('Ajouté!', 'Le cadran a été ajouté avec succès.', 'success');
                        // Réinitialisez les valeurs du formulaire ou effectuez d'autres actions si nécessaire
                    }, function (error) {
                        // Traitement des erreurs de la requête
                        console.error('Erreur lors de l\'ajout du cadran:', error);
                        // Affichez une alerte d'erreur
                        sweetalert2_1["default"].fire('Erreur!', 'Une erreur est survenue lors de l\'ajout du cadran.', 'error');
                    });
                }
            });
        }
        else {
            console.error('Veuillez sélectionner un volet valide.');
        }
    };
    AjoutercadranComponent.prototype.getVoletList = function () {
        var _this = this;
        // Appelez la méthode du service pour récupérer la liste des volets
        this.cadranService.getVoletList().subscribe(function (volets) {
            _this.volets = volets; // Affectez la liste des volets à la variable volets dans le composant
        }, function (error) {
            console.error('Erreur lors de la récupération de la liste des volets:', error);
        });
    };
    AjoutercadranComponent = __decorate([
        core_1.Component({
            selector: 'app-ajoutercadran',
            templateUrl: './ajoutercadran.component.html',
            styleUrls: ['./ajoutercadran.component.css']
        })
    ], AjoutercadranComponent);
    return AjoutercadranComponent;
}());
exports.AjoutercadranComponent = AjoutercadranComponent;
