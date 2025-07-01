import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Pip } from '../model/Pip.model';
import { UserserviceService } from '../services/userservice.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ModifierpipComponent } from '../modifierpip/modifierpip.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pips-modal-component',
  templateUrl: './pips-modal-component.component.html',
  styleUrls: ['./pips-modal-component.component.css']
})
export class PipsModalComponentComponent {

  pips: Pip[] = [];

  constructor(
    private dialogRef: MatDialogRef<PipsModalComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { pips: Pip[], categoryId: number },
    private pipService: UserserviceService,
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  closeModal(): void {
    this.dialogRef.close();
  }

  deletePip(pip: Pip): void {
    Swal.fire({
      title: `Êtes-vous sûr de vouloir supprimer ${pip.name} ?`,
      text: "Cette action est irréversible !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pipService.deletePip(pip.id).subscribe({
          next: () => {
            this.data.pips = this.data.pips.filter(p => p.id !== pip.id);
            this.changeDetectorRef.detectChanges();
            Swal.fire(
              'Supprimé !',
              'Le PIP a été supprimé avec succès.',
              'success'
            );
          },
          error: (error: HttpErrorResponse) => {
            console.error('Erreur lors de la suppression du PIP :', error);
            Swal.fire(
              'Erreur !',
              'Échec de la suppression du PIP. Veuillez réessayer plus tard.',
              'error'
            );
          }
        });
      }
    });
  }

  editPipModal(pip: Pip): void {
    const dialogRef = this.dialog.open(ModifierpipComponent, {
      width: '600px',
      data: { pipId: pip.id }
    });

    dialogRef.componentInstance.pipUpdated.subscribe((updatedPip: Pip) => {
      const index = this.data.pips.findIndex(p => p.id === updatedPip.id);
      if (index !== -1) {
        this.data.pips[index] = updatedPip;
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  refreshPips(categoryId: number): void {
    this.pipService.getPipsByCategory(categoryId).subscribe(
      pips => {
        this.data.pips = pips;
        this.changeDetectorRef.detectChanges();
       
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors du rafraîchissement des PIPs :', error);
        Swal.fire(
          'Erreur !',
          'Échec du rafraîchissement des PIPs. Veuillez réessayer plus tard.',
          'error'
        );
      }
    );
  }
}
