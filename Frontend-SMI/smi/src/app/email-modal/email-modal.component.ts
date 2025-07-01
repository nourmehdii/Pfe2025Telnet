import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-email-modal',
  template: `
    <h2 mat-dialog-title class="modal-title">{{ data.subject }}</h2>
    <div mat-dialog-content class="modal-content">
      <p class="modal-message">Voulez-vous envoyer ce rapport par email au administrateur?</p>
      <mat-form-field appearance="fill" class="email-input">
        <textarea matInput placeholder="Entrez l'adresse email" [(ngModel)]="emailAddress"></textarea>
      </mat-form-field>
    </div>
    <div mat-dialog-actions class="modal-actions">
      <button mat-button class="cancel-button" (click)="onCancelClick()">Annuler</button>
      <button mat-button class="send-button" color="primary" [disabled]="!emailAddress" (click)="send()">Envoyer</button>
    </div>
  `,
  styles: [`
    .modal-title {
      font-size: 24px;
      font-weight: bold;
      color: #3f51b5;
      text-align: center;
      margin-bottom: 20px;
    }
    .modal-content {
      padding: 20px;
      text-align: center;
    }
    .modal-message {
      font-size: 16px;
      margin-bottom: 20px;
    }
    .email-input {
      width: 100%;
    }
    .modal-actions {
      display: flex;
      justify-content: flex-end; /* Aligner les boutons à droite */
      flex-direction: row; /* Assurer une disposition horizontale */
      padding: 20px;
    }
    button[mat-button] {
      position: relative;
      overflow: hidden;
      border: none;
      border-radius: 4px;
      padding: 8px 16px; /* Réduire la taille des boutons */
      font-size: 14px; /* Réduire la taille de la police */
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    button[mat-button]::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 300%;
      height: 300%;
      background: rgba(255, 255, 255, 0.2);
      transition: all 0.6s;
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%, -50%) scale(0);
    }
    button[mat-button]:hover::before {
      transform: translate(-50%, -50%) scale(1);
    }
    .cancel-button {
      background: linear-gradient(45deg, #ff5252, #ff1744);
      color: #fff;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      margin-right: 10px; /* Ajouter de l'espace à droite du bouton "Annuler" */
    }
    .send-button {
      background: linear-gradient(45deg, #66bb6a, #43a047);
      color: #fff;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    }
    .cancel-button:hover, .send-button:hover {
      opacity: 0.9;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
    .cancel-button:active, .send-button:active {
      transform: translateY(0);
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    }
  `]
})
export class EmailModalComponent {
  emailAddress: string;

  constructor(
    public dialogRef: MatDialogRef<EmailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { subject: string },
    private snackBar: MatSnackBar
  ) {}

  onCancelClick(): void {
    this.dialogRef.close('cancel');
  }

  send(): void {
    if (this.emailAddress) {
      this.dialogRef.close('send');
      this.showSnackBar(); // Call method to show snackbar
    }
  }

  private showSnackBar(): void {
    this.snackBar.open('Email envoyé avec succès', 'Fermer', {
      duration: 3000 // Duration in milliseconds
    });
  }
}
