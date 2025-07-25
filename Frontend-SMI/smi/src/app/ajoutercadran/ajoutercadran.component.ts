import { UserserviceService } from '../services/userservice.service';
import { EType } from '../model/EType.model';
import { Volet } from '../model/Volet.model';
import { Cadran } from '../model/cadran.model';
import Swal from 'sweetalert2'; // Importer SweetAlert
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajoutercadran',
  templateUrl: './ajoutercadran.component.html',
  styleUrls: ['./ajoutercadran.component.css']
})
export class AjoutercadranComponent implements OnInit {
  selectedAxe: string;
  selectedType: EType;
  selectedVolet: Volet;
  nomCadran: string;
    // Nouveaux attributs
  secteur: string;
  contexte: string;
  processus: string;
  origineInfo: string;
  creePar: string;
  dateCreation: Date = new Date();
  volets: Volet[]; // Variable pour stocker la liste des volets

  constructor(private cadranService: UserserviceService) { } // Injectez le service CadranService dans le constructeur

  ngOnInit(): void {
    this.getVoletList(); // Appelez la méthode pour récupérer la liste des volets lors de l'initialisation du composant
  }

  ajouterCadran(): void {
    // Vérifiez d'abord si selectedVolet contient une valeur valide
    // if (this.selectedVolet) {
    // Construire l'objet complet cadran pour usage local (UI, autres composants)
      const cadran: Cadran = {
        name: this.nomCadran,
        type: this.selectedType,
        volet: this.selectedVolet,
      
        secteur: this.secteur,
        contexte: this.contexte,
        processus: this.processus,
        origineInfo: this.origineInfo,
        creePar: this.creePar,
        dateCreation: this.dateCreation


      };
  
       // Construire un DTO simplifié pour l'envoi au backend
    const cadranDto = {
      ...cadran,
      voletId: 1,
      // voletId: cadran.volet.id,   // extraire uniquement l'id
    };
     // Supprimer la propriété volet complète pour éviter conflit
    delete cadranDto.volet;
  
      // Utilisez SweetAlert pour afficher une confirmation avant d'ajouter le cadran
      Swal.fire({
        title: 'Êtes-vous sûr de vouloir ajouter ce cadran?',
        text: 'Cette action est irréversible!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, ajouter!'
      }).then((result) => {
        if (result.isConfirmed) {
            console.log('Objet cadran envoyé au backend :', cadranDto); // ✅ Ajout du log ici

          // Appelez la méthode du service pour ajouter le cadran avec l'identifiant du volet
          this.cadranService.ajouterCadran(cadranDto).subscribe(
            response => {
              // Traitement de la réponse réussie du backend
              console.log('Cadran ajouté avec succès:', response);
              // Affichez une alerte de succès
              Swal.fire(
                'Ajouté!',
                'Le cadran a été ajouté avec succès.',
                'success'
              );
              // Réinitialisez les valeurs du formulaire ou effectuez d'autres actions si nécessaire
            },
            error => {
              // Traitement des erreurs de la requête
              console.error('Erreur lors de l\'ajout du cadran:', error);
             console.error('Body envoyé :', cadranDto); // ✅ Ajout d'un log ici aussi pour voir ce qui a été envoyé en cas d'erreur

              // Affichez une alerte d'erreur
              Swal.fire(
                'Erreur!',
                'Une erreur est survenue lors de l\'ajout du cadran.',
                'error'
              );
            }
          );
        }
      });
    // } else {
    //   console.error('Veuillez sélectionner un volet valide.');
    // }
  }
  
  getVoletList(): void {
    // Appelez la méthode du service pour récupérer la liste des volets
    this.cadranService.getVoletList().subscribe(
      volets => {
        this.volets = volets; // Affectez la liste des volets à la variable volets dans le composant
      },
      error => {
        console.error('Erreur lors de la récupération de la liste des volets:', error);
      }
    );
  }
}
