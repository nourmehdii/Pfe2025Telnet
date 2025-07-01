import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserserviceService } from '../services/userservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ajouterkpi',
  templateUrl: './ajouterkpi.component.html',
  styleUrls: ['./ajouterkpi.component.css']
})
export class AjouterkpiComponent implements OnInit {

  kpiNameFormControl = new FormControl('', Validators.required);
  kpiObjectifFormControl = new FormControl('', Validators.required);
  kpiFrequenceFormControl = new FormControl('', Validators.required);

  constructor(
    private userService: UserserviceService,
    public dialogRef: MatDialogRef<AjouterkpiComponent>,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    // Define processusId as a local constant
    const processusId = this.data.processusId;

    // Check if processusId is defined
    if (!processusId) {
      console.error('processusId is missing or undefined');
      Swal.fire('Erreur', 'processusId is missing or undefined', 'error');
    }
  }

  onAddKpi(): void {
    // Use processusId directly from dialog data
    const processusId = this.data.processusId;

    if (this.kpiNameFormControl.valid && this.kpiObjectifFormControl.valid && this.kpiFrequenceFormControl.valid) {
      if (!processusId) {
        console.error('processusId is missing');
        Swal.fire('Erreur', 'processusId is missing', 'error');
        return;
      }

      const kpi = {
        name: this.kpiNameFormControl.value,
        objectif: this.kpiObjectifFormControl.value,
        frequence: this.kpiFrequenceFormControl.value
      };

      this.userService.addKpiToProcessus(processusId, kpi).subscribe(
        (response) => {
          console.log('KPI ajouté avec succès:', response);
          this.dialogRef.close();
          Swal.fire('Succès', 'Le KPI a été ajouté avec succès', 'success');
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du KPI:', error);
          Swal.fire('Erreur', 'Une erreur s\'est produite lors de l\'ajout du KPI', 'error');
        }
      );
    } else {
      Swal.fire('Erreur', 'Veuillez remplir tous les champs du formulaire', 'error');
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
