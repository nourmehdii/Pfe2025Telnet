import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importez le FormBuilder et FormGroup
import { UserserviceService } from '../services/userservice.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifierresultkpi',
  templateUrl: './modifierresultkpi.component.html',
  styleUrls: ['./modifierresultkpi.component.css']
})
export class ModifierresultkpiComponent implements OnInit {
  kpiId: number;
  historyId: number;
  requestBodyForm: FormGroup; // Utilisez FormGroup pour requestBody

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private kpiService: UserserviceService,
    private fb: FormBuilder // Injectez le FormBuilder
  ) { }

  ngOnInit(): void {
    this.requestBodyForm = this.fb.group({
      startDateP: ['', Validators.required], // Contrôle pour startDateP avec validation requise
      endDateP: ['', Validators.required], // Contrôle pour endDateP avec validation requise
      value: ['', Validators.required] // Contrôle pour value avec validation requise
    });
    console.log('Data from MAT_DIALOG_DATA:', this.data); // Vérifiez les données transmises via MAT_DIALOG_DATA
    this.kpiId = this.data.kpiId;
 // Initialiser les valeurs du formulaire si nécessaire
if (this.data && this.data.kpiId) {
  this.kpiId = this.data.kpiId;
  this.kpiService.getKpiHistoryByKpiId(this.kpiId).subscribe(
    (kpiHistories) => {
      if (kpiHistories.length > 0) {
        this.historyId = kpiHistories[0].id;
        // Mettre à jour les valeurs du formulaire si nécessaire
        this.requestBodyForm.patchValue({
          startDateP: kpiHistories[0].startDateP,
          endDateP: kpiHistories[0].endDateP,
          value: kpiHistories[0].value
        });
      } else {
        console.error('No history found for the given kpiId:', this.kpiId);
      }
    },
    (error) => {
      console.error('Error fetching historyIds:', error);
    }
  );
}
  }


  updateResult(): void {
    if (this.historyId) {
      const requestBody = this.requestBodyForm.value;
      this.kpiService.updateResult(this.kpiId, this.historyId, requestBody).subscribe(
        (response) => {
          // Afficher une alerte de succès
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'KpiHistory mis à jour avec succès!'
          });
          console.log('KpiHistory updated successfully:', response);
        },
        (error) => {
          // Afficher une alerte d'erreur
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur s\'est produite lors de la mise à jour de KpiHistory.'
          });
          console.error('Error updating KpiHistory:', error);
        }
      );
    } else {
      // Afficher une alerte d'erreur si historyId est indéfini
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'HistoryId est indéfini.'
      });
      console.error('HistoryId is undefined');
    }
  }

}
