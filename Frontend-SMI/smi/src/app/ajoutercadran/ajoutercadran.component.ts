import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../services/userservice.service';
import { EType } from '../model/EType.model';
import { Volet } from '../model/Volet.model';
import { Cadran } from '../model/cadran.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajoutercadran',
  templateUrl: './ajoutercadran.component.html',
  styleUrls: ['./ajoutercadran.component.css']
})
export class AjoutercadranComponent implements OnInit {
  selectedAxe: string;
  selectedType: EType;
  nomCadran: string;

  // Nouveaux attributs
  secteur: string;
  contexte: string;
  processus: string;
  origineInfo: string;
  creePar: string;
  dateCreation: Date = new Date();

  volets: Volet[] = []; // Initialise pour éviter undefined

  readonly DEFAULT_VOLET_ID = 3; // Volet générique

  constructor(private cadranService: UserserviceService) {}

  ngOnInit(): void {
    this.getVoletList();
  }

  getVoletList(): void {
    this.cadranService.getVoletList().subscribe(
      volets => {
        this.volets = volets;
        console.log('Liste des volets récupérée:', this.volets);
      },
      error => {
        console.error('Erreur lors de la récupération des volets:', error);
      }
    );
  }

  ajouterCadran(): void {
    if (!this.nomCadran || !this.selectedType) {
      Swal.fire({
        title: 'Champs manquants',
        text: 'Veuillez remplir tous les champs obligatoires.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }
 // Construction de l'objet cadran avec volet fixe (id = 3)
  const DEFAULT_VOLET_ID = 3;
    const cadran: Cadran = {
      name: this.nomCadran,
      type: this.selectedType,
      volet: { id: this.DEFAULT_VOLET_ID } as Volet,
      secteur: this.secteur,
      contexte: this.contexte,
      processus: this.processus,
      origineInfo: this.origineInfo,
      creePar: this.creePar,
      dateCreation: this.dateCreation
    };
  // Confirmation avant ajout
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
              // Appel au service pour ajouter le cadran
        this.cadranService.ajouterCadran(this.DEFAULT_VOLET_ID,cadran).subscribe(
          response => {
            console.log('Cadran ajouté avec succès:', response);
            Swal.fire({
              title: 'Ajouté!',
              text: 'Le cadran a été ajouté avec succès.',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              window.location.reload();
            });
          },
          error => {
            console.error('Erreur lors de l\'ajout du cadran:', error);
            Swal.fire({
              title: 'Erreur!',
              text: 'Une erreur est survenue lors de l\'ajout du cadran.',
              icon: 'error',
              confirmButtonText: 'Fermer'
            });
          }
        );
      }
    });
  }
}
