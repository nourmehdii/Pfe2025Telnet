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
  processus: string; // ← laissé pour compatibilité si utilisé ailleurs
  origineInfo: string;
  creePar: string;
  dateCreation: Date = new Date();
  volets: Volet[]; // Variable pour stocker la liste des volets

  // Ajouts pour gérer le select processus
  processusList: any[] = []; // liste des processus récupérée du backend
  selectedProcessusName: string; // nom choisi depuis le select

  constructor(private cadranService: UserserviceService) { }

  ngOnInit(): void {
    this.getVoletList();
    this.getProcessusList(); // récupérer la liste des processus à l'init
  }

  ajouterCadran(): void {
    // Construire l'objet complet cadran pour usage local (UI, autres composants)
    const cadran: Cadran = {
      name: this.nomCadran,
      type: this.selectedType,
      volet: this.selectedVolet,
      // processus: this.processus, // ❌ remplacé par selectedProcessusName
      processus: this.selectedProcessusName, // ✅ on envoie juste le nom (string)
      origineInfo: this.origineInfo,
      creePar: this.creePar,
      dateCreation: this.dateCreation
    };
  
    // Construire un DTO simplifié pour l'envoi au backend
    const cadranDto = {
      ...cadran,
      voletId: 1, // ⚠️ en dur, à remplacer si besoin par this.selectedVolet.id
      // voletId: cadran.volet.id,
    };
    delete cadranDto.volet; // suppression pour éviter conflit avec voletId
  
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
        console.log('Objet cadran envoyé au backend :', cadranDto);

        this.cadranService.ajouterCadran(cadranDto).subscribe(
          response => {
            console.log('Cadran ajouté avec succès:', response);
            Swal.fire('Ajouté!', 'Le cadran a été ajouté avec succès.', 'success');
          },
          error => {
            console.error('Erreur lors de l\'ajout du cadran:', error);
            console.error('Body envoyé :', cadranDto);
            Swal.fire('Erreur!', 'Une erreur est survenue lors de l\'ajout du cadran.', 'error');
          }
        );
      }
    });
  }
  
  getVoletList(): void {
    this.cadranService.getVoletList().subscribe(
      volets => {
        this.volets = volets;
      },
      error => {
        console.error('Erreur lors de la récupération de la liste des volets:', error);
      }
    );
  }

  // Nouvelle méthode pour récupérer la liste des processus
  getProcessusList(): void {
    this.cadranService.getProcessusList().subscribe(
      processus => {
        this.processusList = processus;
      },
      error => {
        console.error('Erreur lors de la récupération de la liste des processus:', error);
      }
    );
  }
}
