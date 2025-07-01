import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserserviceService } from '../services/userservice.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ajouterkpihistory',
  templateUrl: './ajouterkpihistory.component.html',
  styleUrls: ['./ajouterkpihistory.component.css']
})
export class AjouterkpihistoryComponent implements OnInit {
  projectId: number;
  kpiId: number;
  historyForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AjouterkpihistoryComponent>,
    private formBuilder: FormBuilder,
    private apiService: UserserviceService
  ) { }

  ngOnInit(): void {
    this.projectId = this.data.projectId;
    this.kpiId = this.data.kpiId;

    // Initialisez le formulaire avec les valeurs des champs objectif et valeur
    this.historyForm = this.formBuilder.group({
      startDateP: [''],
      endDateP: [''],
      value: [this.data.valeur], // Utilisez la valeur fournie ou laissez vide si elle est nulle
      kpi_objectif: [this.data.objectif] // Utilisez la valeur fournie ou laissez vide si elle est nulle
    });
  }



  submitHistory(): void {
    const historyData = this.historyForm.value;

    // Traitez l'ajout de l'historique KPI ici
    this.apiService.createKpiHistory(this.kpiId, this.projectId, historyData).subscribe(
        (response) => {
            console.log('Historique KPI créé avec succès:', response);
            Swal.fire({
                icon: 'success',
                title: 'Succès!',
                text: 'Historique KPI créé avec succès.',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.dialogRef.close();
                }
            });
        },
        (error) => {
            console.error('Erreur lors de la création de l\'historique KPI:', error);
            // Gérer l'erreur ici
        }
    );
}


  closeDialog(): void {
    this.dialogRef.close();
  }
}
