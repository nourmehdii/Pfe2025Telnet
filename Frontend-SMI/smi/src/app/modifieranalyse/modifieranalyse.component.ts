import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserserviceService } from '../services/userservice.service';
import { Analyse } from '../model/analyse.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifieranalyse',
  templateUrl: './modifieranalyse.component.html',
  styleUrls: ['./modifieranalyse.component.css']
})
export class ModifieranalyseComponent implements OnInit {
  analyseId: number;
  analyse: Analyse;
  analyseForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ModifieranalyseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private yourService: UserserviceService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.analyseId = this.data.analyseId; // Récupérer l'ID de l'analyse à modifier depuis les données passées au modal

    this.analyseForm = this.formBuilder.group({
      typeProbleme: ['', Validators.required],
      identificationProbleme: ['', Validators.required],
      methodeUtilisee: ['', Validators.required],
      date: ['', Validators.required], // Ajoutez la propriété date au formulaire
      // Ajoutez les autres champs du formulaire ici
    });

    this.getAnalyseDetails();
}

getAnalyseDetails(): void {
  this.yourService.getAnalyseById(this.analyseId).subscribe(
      (analyse: Analyse) => {
          this.analyse = analyse;
          this.analyseForm.patchValue({
              typeProbleme: analyse.typeProbleme,
              identificationProbleme: analyse.identificationProbleme,
              methodeUtilisee: analyse.methodeUtilisee,
              date: new Date(analyse.date).toISOString().substring(0, 10), // Définir la valeur de la date
          });
      },
      (error: any) => {
          console.error('Erreur lors de la récupération des détails de l\'analyse :', error);
      }
  );
}



onSubmitModification(): void {
  if (this.analyseForm.valid) {
    const modifiedAnalyse: Analyse = {
      id: this.analyse.id,
      project: this.analyse.project,
      date: this.analyseForm.value.date, // Récupérer la date du formulaire
      causes: this.analyse.causes,
      typeProbleme: this.analyseForm.value.typeProbleme,
      identificationProbleme: this.analyseForm.value.identificationProbleme,
      methodeUtilisee: this.analyseForm.value.methodeUtilisee,
    };

    this.yourService.modifierAnalyseCausale(this.analyseId, modifiedAnalyse).subscribe(
      () => {
        // Afficher une notification Swal de succès
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Analyse modifiée avec succès!',
          confirmButtonText: 'OK'
        }).then((result) => {
          // Fermer le modal si l'utilisateur clique sur OK
          if (result.isConfirmed) {
            this.dialogRef.close(true);
          }
        });
      },
      error => {
        // Afficher une notification Swal d'erreur
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur s\'est produite lors de la modification de l\'analyse.',
          confirmButtonText: 'OK'
        }).then((result) => {
          // Fermer le modal si l'utilisateur clique sur OK
          if (result.isConfirmed) {
            this.dialogRef.close(false);
          }
        });
        console.error('Erreur lors de la modification de l\'analyse :', error);
      }
    );
  } else {
    // Afficher une notification Swal pour indiquer que le formulaire n'est pas valide
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Le formulaire n\'est pas valide.',
      confirmButtonText: 'OK'
    });
  }
}
  

}
