import { Component, Inject, OnInit } from '@angular/core';
import { Action } from '../model/Action.model';
import { UserserviceService } from '../services/userservice.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TypeAction } from '../model/TypeAction.model';

@Component({
  selector: 'app-modifieraction',
  templateUrl: './modifieraction.component.html',
  styleUrls: ['./modifieraction.component.css']
})
export class ModifieractionComponent implements OnInit {
  newAction: Action = null;
  actionForm: FormGroup;
  actionId: number;
  typeActions = Object.values(TypeAction); // Obtenez les valeurs de l'enum TypeAction
  selectedTypeAction: string; // Déclaration de la propriété selectedTypeAction

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserserviceService,
    @Inject(MAT_DIALOG_DATA) public data: { actionId: number },
    private dialogRef: MatDialogRef<ModifieractionComponent>
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.actionId) {
      this.userService.getActionById(this.data.actionId).subscribe(
        (action: Action) => {
          this.newAction = action;
          console.log('newAction:', this.newAction);
          this.initForm();
          this.loadAction(); // Assurez-vous que loadAction est appelée après initForm
          this.actionId = this.data.actionId;
          console.log('actionId:', this.actionId);
        },
        (error: any) => {
          console.error('Error retrieving action:', error);
          // Gérer l'erreur ici
        }
      );
    }
  }
  
  initForm(): void {
    this.actionForm = this.formBuilder.group({
      typeAction: [this.newAction ? this.newAction.typeAction : null, Validators.required], // Utilisez null pour la sélection initiale
      responsable: [this.newAction ? this.newAction.responsable : '', Validators.required],
      datePlanification: [this.newAction ? this.formatDate(this.newAction.datePlanification) : '', Validators.required],
      dateRealisation: [this.newAction ? this.formatDate(this.newAction.dateRealisation) : '', Validators.required],
      critereEfficacite: [this.newAction ? this.newAction.critereEfficacite : '', Validators.required],
      efficace: [this.newAction ? this.newAction.efficace : false],
      commentaire: [this.newAction ? this.newAction.commentaire : '']
    });
  }
  
  loadAction(): void {
    if (this.newAction) {
      this.actionForm.patchValue({
        typeAction: this.newAction.typeAction,
        responsable: this.newAction.responsable,
        datePlanification: this.formatDate(this.newAction.datePlanification),
        dateRealisation: this.formatDate(this.newAction.dateRealisation),
        critereEfficacite: this.newAction.critereEfficacite,
        efficace: this.newAction.efficace,
        commentaire: this.newAction.commentaire
      });
    }
  }
  
  modifierAction(): void {
    if (!this.newAction) {
      console.error('No action data available.');
      return;
    }

    const formData = this.actionForm.value;
    this.newAction.typeAction = formData.typeAction;
    this.newAction.responsable = formData.responsable;
    this.newAction.datePlanification = formData.datePlanification;
    this.newAction.dateRealisation = formData.dateRealisation;
    this.newAction.critereEfficacite = formData.critereEfficacite;
    this.newAction.efficace = formData.efficace;
    this.newAction.commentaire = formData.commentaire;

    const actionId = this.actionId;

    this.userService.modifierAction(actionId, this.newAction).subscribe(
      (response: any) => {
        console.log('Action modifiée avec succès:', response);
        Swal.fire('Modifiée!', 'L\'action a été modifiée avec succès.', 'success');
      },
      (error: any) => {
        console.error('Erreur lors de la modification de l\'action:', error);
        Swal.fire('Erreur!', 'Une erreur est survenue lors de la modification de l\'action.', 'error');
      }
    );
  }

  formatDate(date: Date): string {
    const formattedDate = new Date(date);
    return formattedDate.toISOString().split('T')[0];
  }
}
