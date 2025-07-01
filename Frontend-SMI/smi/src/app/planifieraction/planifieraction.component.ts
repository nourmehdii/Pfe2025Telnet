import { Component, Inject, Input, OnInit } from '@angular/core';
import { UserserviceService } from '../services/userservice.service';
import { Action } from '../model/Action.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-planifieraction',
  templateUrl: './planifieraction.component.html',
  styleUrls: ['./planifieraction.component.css']
})
export class PlanifieractionComponent implements OnInit {
  @Input() causeId: number;
  actionForm: any = {};
  addedAction: Action;
  dialogConfig: any;

  constructor(
    private actionService: UserserviceService,
    public dialogRef: MatDialogRef<PlanifieractionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { causeId: number }
  ) {
    this.causeId = data?.causeId; // Ensure causeId is correctly set from injected data
  }

  ngOnInit(): void {}

  planifierAction() {
    // Check if causeId is defined
    if (this.causeId !== undefined) {
      const action: Action = {
        typeAction: this.actionForm.type,
        responsable: this.actionForm.responsable,
        datePlanification: new Date(this.actionForm.datePlanification),
        dateRealisation: new Date(this.actionForm.dateRealisation),
        critereEfficacite: this.actionForm.critereEfficacite,
        efficace: this.actionForm.efficace,
        commentaire: this.actionForm.commentaire,
        action: this.actionForm.action // Set the action attribute here
      };

      this.actionService.planifierAction(this.causeId, action)
        .subscribe(
          response => {
            console.log('Action planifiée avec succès', response);
            this.addedAction = response;
            // Display a success swal alert when action is successfully planned
            Swal.fire({
              icon: 'success',
              title: 'Action planifiée avec succès',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              // Close the modal and return the added action as result
              this.dialogRef.close(this.addedAction);
            });
          },
          error => {
            console.error('Erreur lors de la planification de l\'action', error);
          }
        );
    } else {
      console.error('causeId est indéfini');
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
