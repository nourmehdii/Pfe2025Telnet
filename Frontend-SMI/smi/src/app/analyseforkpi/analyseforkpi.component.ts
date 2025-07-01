import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ModalcausesComponent } from '../modalcauses/modalcauses.component';
import { Cause } from '../model/Cause.model';
import { Analyse } from '../model/analyse.model';
import { UserserviceService } from '../services/userservice.service';
import { ModifieranalyseComponent } from '../modifieranalyse/modifieranalyse.component';

@Component({
  selector: 'app-analyseforkpi',
  templateUrl: './analyseforkpi.component.html',
  styleUrls: ['./analyseforkpi.component.css']
})
export class AnalyseforkpiComponent implements OnInit {

  projectId: number;
  kpiId: number;
  projectDetails: any;
  step: number = 1;
  projectName: string;
  activity: string;
  client: string;
  currentDate: Date;
  analyses: Analyse[] = [];
  pourquoiIndices: number[] = [1, 2, 3, 4, 5];
  showNomCauseAndPourcentage: boolean = false;
  analyseForm: FormGroup;
  i: number;
  causes: Cause[];
  analyseId: number;
  @Output() refreshModal: EventEmitter<any> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private analyseService: UserserviceService,
    private route: ActivatedRoute,
    private projectService: UserserviceService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.currentDate = new Date(); // Initialiser la date actuelle
    this.route.paramMap.subscribe(params => {
      this.kpiId = +params.get('kpiId'); // Assurez-vous que 'kpiId' est le nom correct du paramètre d'URL
      if (this.kpiId) {
        this.getAnalysesForKpi(); // Appel de la méthode pour récupérer les analyses associées au KPI
      } else {
        console.error('No KPI ID provided in the route.');
      }
    });
  
    // Initialisation du formulaire d'analyse
    this.analyseForm = this.formBuilder.group({
      typeProbleme: ['', Validators.required],
      identificationProbleme: ['', Validators.required],
      methodeUtilisee: ['', Validators.required],
      causes: this.formBuilder.array([])
    });
  
    // Détection des changements dans la méthode utilisée pour afficher les champs dynamiques
    this.analyseForm.get('methodeUtilisee').valueChanges.subscribe(value => {
      if (value === '5PK') {
        this.showNomCauseAndPourcentage = true;
      } else {
        this.showNomCauseAndPourcentage = false;
      }
    });
  }
  

  getCausesForAnalyse(analyseId: number): void {
    this.analyseService.getCausesForAnalyse(analyseId).subscribe(
      (causes: Cause[]) => {
        this.causes = causes;
        console.log('Causes for analysis:', causes);
      },
      (error: any) => {
        console.error('Error retrieving causes for analysis:', error);
      }
    );
  }

  getAnalysesForKpi(): void {
    this.analyseService.getAnalysesForKpi(this.kpiId).subscribe(
      (analyses: Analyse[]) => {
        this.analyses = analyses;
        console.log('Analyses for KPI:', analyses);
      },
      (error: any) => {
        console.error('Error retrieving analyses for KPI:', error);
      }
    );
  }

  hideNomCauseAndPourcentage() {
    const causes = this.causesFormArray;
    while (causes.length !== 0) {
      causes.removeAt(0);
    }
  }

  initCauseFormGroup(): FormGroup {
    return this.formBuilder.group({
      nomCause: ['', Validators.required],
      pourcentage: ['', Validators.required]
    });
  }

  onModification(): void {
    this.refreshModal.emit();
   
  }

  addCause(): void {
    const causes = this.causesFormArray;
    const lastCauseIndex = causes.length - 1;

    if (this.analyseForm.valid) {
      if (causes.length < 5) {
        if (lastCauseIndex < 0 || this.arePreviousFieldsFilled(lastCauseIndex)) {
          causes.push(this.initCauseFormGroup());
        } else {
          this.showAlert('Veuillez remplir les champs précédents avant d\'ajouter une nouvelle cause.', 'warning');
        }
      } else {
        this.showAlert('Vous ne pouvez pas ajouter plus de 5 causes.', 'error');
      }

      this.showNomCauseAndPourcentage = causes.length < 5;
    } else {
      this.showAlert('Veuillez remplir les champs précédents correctement avant d\'ajouter une nouvelle cause.', 'error');
    }
  }

  showAlert(message: string, type: 'success' | 'error' | 'warning' | 'info'): void {
    Swal.fire({
      title: type === 'success' ? 'Succès' : type === 'error' ? 'Erreur' : type === 'warning' ? 'Attention' : 'Information',
      text: message,
      icon: type,
      confirmButtonText: 'OK'
    });
  }

  openModal(analyseId: number): void {
    const dialogRef = this.dialog.open(ModalcausesComponent, {
    //  width: '1000px',
      data: { analyseId }
    });
  }

  refreshModalContent(analyseId: number): void {
    this.getCausesForAnalyse(analyseId);
  }

  addDynamicFields(): void {
    const causes = this.causesFormArray;

    if (this.analyseForm.valid) {
      for (let i = 0; i < causes.length; i++) {
        const causeFormGroup = causes.at(i) as FormGroup;

        if (causeFormGroup.get('nomCause').value && causeFormGroup.get('pourcentage').value) {
          if (i === causes.length - 1) {
            causes.push(this.initCauseFormGroup());
          }
        } else {
          break;
        }
      }
    }
  }


  resetForm(): void {
    this.analyseForm.reset({
      typeProbleme: '',
      identificationProbleme: '',
      methodeUtilisee: '',
      causes: []
    });
    this.showNomCauseAndPourcentage = false;
  }


  removeCause(index: number): void {
    const causes = this.causesFormArray;
    causes.removeAt(index);
  }

  get causesFormArray(): FormArray {
    return this.analyseForm.get('causes') as FormArray;
  }

  arePreviousFieldsFilled(index: number): boolean {
    if (index === 0) {
      return true;
    }

    const previousCause = this.causesFormArray.at(index - 1);
    const nomCause = previousCause.get('nomCause').value;
    const pourcentage = previousCause.get('pourcentage').value;

    return nomCause && pourcentage;
  }

  openModifierAnalyseModal(analyseId: number): void {
    const dialogRef = this.dialog.open(ModifieranalyseComponent, {
  
      data: { analyseId: analyseId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result === true) {
        this.getAnalysesForKpi();
      }
    });
  }


  onDeleteAnalyseCausale(analyseId: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.analyseService.deleteAnalyseCausale(analyseId).subscribe(
          () => {
            Swal.fire(
              'Supprimé!',
              'L\'analyse a été supprimée avec succès.',
              'success'
            );
            this.getAnalysesForKpi();
          
          },
          error => {
            console.error('Erreur lors de la suppression de l\'analyse :', error);
            Swal.fire(
              'Erreur!',
              'Une erreur s\'est produite lors de la suppression de l\'analyse.',
              'error'
            );
          }
        );
      }
    });
  }

  nextStep(): void {
    this.step++;
  }

  prevStep(): void {
    this.step--;
  }

  calculateProgress(): string {
    return '33%';
  }

  onInputChange(event: any, prochainPourquoi: string) {
  }

  onSubmit(): void {
    if (this.analyseForm.valid) {
      const analyse: Analyse = {
        typeProbleme: this.analyseForm.value.typeProbleme,
        identificationProbleme: this.analyseForm.value.identificationProbleme,
        methodeUtilisee: this.analyseForm.value.methodeUtilisee,
        date: new Date(),
        causes: this.analyseForm.value.causes,
        id: 0,
        project: undefined
      };

      this.analyseService.ajouterAnalyseByKpiId(this.kpiId, analyse).subscribe(
        (response: any) => {
          console.log('Réponse du service d\'ajout d\'analyse:', response);
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Analyse ajoutée avec succès!'
          });

          this.getAnalysesForKpi();

          const tableElement = document.getElementById('analysesTable');
          if (tableElement) {
            tableElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur s\'est produite lors de l\'ajout de l\'analyse.'
          });
          console.error('Erreur lors de l\'enregistrement de l\'analyse:', error);
        }
      );
    } else {
      console.error('Le formulaire n\'est pas valide.');
    }
  }

  isValidForm(): boolean {
    const controls = this.analyseForm.controls;
    let isValid = true;

    Object.keys(controls).forEach(controlName => {
      if (!controls[controlName].valid) {
        isValid = false;
      }
    });

    if (this.analyseForm.get('methodeUtilisee').value === '5PK') {
      isValid = isValid && this.causesFormArray.length > 0;

      for (let i = 0; i < this.causesFormArray.length; i++) {
        const causeFormGroup = this.causesFormArray.at(i) as FormGroup;
        if (!causeFormGroup.valid) {
          isValid = false;
          break;
        }
      }
    }

    return isValid;
  }
}
