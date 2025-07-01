import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserserviceService } from '../services/userservice.service';
import Swal from 'sweetalert2';
import { Analyse } from '../model/analyse.model';
import { Cause } from '../model/Cause.model';
import { ModalcausesComponent } from '../modalcauses/modalcauses.component';
import { MatDialog } from '@angular/material/dialog';
import { PlanifieractionComponent } from '../planifieraction/planifieraction.component';
import { ModifieractionComponent } from '../modifieraction/modifieraction.component';
import { ModifieranalyseComponent } from '../modifieranalyse/modifieranalyse.component';

@Component({
  selector: 'app-analysecausale',
  templateUrl: './analysecausale.component.html',
  styleUrls: ['./analysecausale.component.css']
})
export class AnalysecausaleComponent implements OnInit {
  analyseForm: FormGroup;
  projectId: number;
  projectDetails: any;
  step: number = 1;
  projectName: string;
  activity: string;
  client: string;
  currentDate: Date;
  analyses: Analyse[] = [];
  pourquoiIndices: number[] = [1, 2, 3, 4, 5];
  showNomCauseAndPourcentage: boolean = false;
  i: number;
  causes: Cause[];
  analyseId: number;
  
  analyse: any[]; // Remplacez par votre tableau de données
  showTable1: boolean = true; // Afficher le tableau 1 par défaut
  showTable2: boolean = false; // Ne pas afficher le tableau 2 par défaut
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

    this.analyseForm = this.formBuilder.group({
      typeProbleme: ['', Validators.required],
      identificationProbleme: ['', Validators.required],
      methodeUtilisee: ['', Validators.required],
      causes: this.formBuilder.array([])
    });

    this.analyseForm.get('methodeUtilisee').valueChanges.subscribe(value => {
      if (value === '5PK') {
        this.showNomCauseAndPourcentage = true;
      } else {
        this.showNomCauseAndPourcentage = false;
      }
    });

    this.route.params.subscribe(params => {
      this.projectId = +params['projectId'];
      this.getProjectDetails();
      this.getAnalysesForProject(this.projectId);
      this.getCausesForAnalyse(this.analyseId);
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
    this.getAnalysesForProject(this.projectId);
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

  resetForm(): void {
    this.analyseForm.reset({
      typeProbleme: '',
      identificationProbleme: '',
      methodeUtilisee: '',
      causes: []
    });
    this.showNomCauseAndPourcentage = false;
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
     // width: '600px',
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
      width: '500px',
      height: '500px',
      data: { analyseId: analyseId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result === true) {
        this.getAnalysesForProject(this.projectId);
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
            this.getAnalysesForProject(this.projectId);
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

  getProjectDetails(): void {
    this.projectService.getProjectDetails(this.projectId).subscribe(
      (project: any) => {
        this.projectDetails = project;
        this.projectName = project.name;
        this.activity = project.activity;
        this.client = project.client;
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails du projet :', error);
      }
    );
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

      this.analyseService.ajouterAnalyseCausale(this.projectId, analyse).subscribe(
        (response: any) => {
          console.log('Réponse du service d\'ajout d\'analyse:', response);
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Analyse ajoutée avec succès!'
          });

          this.getAnalysesForProject(this.projectId);

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

  getAnalysesForProject(projectId: number): void {
    this.analyseService.getAnalysesForProject(projectId)
      .subscribe(
        (analyses: Analyse[]) => {
          this.analyses = analyses;
          console.log('Analyses for project:', analyses);

          for (const analyse of analyses) {
            this.analyseService.getCausesForAnalyse(analyse.id).subscribe(
              (causes: Cause[]) => {
                analyse.causes = causes;
                console.log('Causes for analysis:', causes);
              },
              (error: any) => {
                console.error('Error retrieving causes for analysis:', error);
              }
            );
          }
        },
        (error: any) => {
          console.error('Error retrieving analyses:', error);
        }
      );
  }
}
