import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserserviceService } from '../services/userservice.service';
import { KpiHistory } from '../model/KpiHistory.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ajouterresultatkpi',
  templateUrl: './ajouterresultatkpi.component.html',
  styleUrls: ['./ajouterresultatkpi.component.css']
})
export class AjouterresultatkpiComponent implements OnInit {
  // Déclaration des propriétés
  startDate: Date;
  endDate: Date;
  value: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private kpiService: UserserviceService
  ) { } // Injection du service KpiService

  ngOnInit(): void {
  }

  onSubmit(): void {
    // Créer un objet requestBody avec les valeurs du formulaire
    const requestBody = {
      startDateP: this.startDate,
      endDateP: this.endDate,
      value: this.value
    };

    // Appeler la méthode createResult avec les valeurs du formulaire et kpiId
    this.createResult(this.data.kpiId, requestBody);
  }

  createResult(kpiId: number, requestBody: any): void {
    this.kpiService.createResult(kpiId, requestBody)
      .subscribe((result: KpiHistory) => {
        // Gérer la réponse de l'API ici
        console.log('Résultat KPI créé : ', result);
        // Afficher une alerte de succès avec Swal
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Le résultat KPI a été créé avec succès.',
        });
      }, (error) => {
        // Gérer les erreurs ici
        console.error('Erreur lors de la création du résultat KPI : ', error);
        // Afficher une alerte d'erreur avec Swal
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur s\'est produite lors de la création du résultat KPI.',
        });
      });
  }
}
