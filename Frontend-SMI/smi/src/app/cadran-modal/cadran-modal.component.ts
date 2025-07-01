import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cadran } from '../model/cadran.model';
import { UserserviceService } from '../services/userservice.service';
import { ModifiercadranComponent } from '../modifiercadran/modifiercadran.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadran-modal',
  templateUrl: './cadran-modal.component.html',
  styleUrls: ['./cadran-modal.component.css']
})
export class CadranModalComponent {
  constructor(
    public dialogRef: MatDialogRef<CadranModalComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public data: { cadran: Cadran; cadranId: number },
    private voletService: UserserviceService,
    private dialog: MatDialog
  ) {}

  refreshCadran(cadranId: number): void {
    if (cadranId) {
      this.voletService.getCadranById(cadranId).subscribe(
        (cadran) => {
          this.data.cadran = cadran;
          Swal.fire('Rafraîchi', 'Les détails du cadran ont été mis à jour.', 'success');
        },
        (error) => {
          console.error('Erreur lors du rafraîchissement du cadran :', error);
          Swal.fire('Erreur', 'Une erreur s\'est produite lors du rafraîchissement du cadran.', 'error');
        }
      );
    }
  }

  editCadran(): void {
    const dialogRef = this.dialog.open(ModifiercadranComponent, {
      width: '500px',
      data: { cadranId: this.data.cadranId }
    });

    dialogRef.componentInstance.cadranUpdated.subscribe(() => {
      this.refreshCadran(this.data.cadranId); // Rafraîchir les détails après modification
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('Fenêtre de modification fermée');
    });
  }

  deleteCadran(): void {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer ce cadran ?',
      text: 'Cette action est irréversible !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.voletService.deleteCadran(this.data.cadranId).subscribe(
          () => {
            Swal.fire('Supprimé !', 'Le cadran a été supprimé.', 'success');
            this.dialogRef.close(true); // Indique que la suppression a réussi
          },
          (error) => {
            console.error('Erreur lors de la suppression du cadran :', error);
            Swal.fire('Erreur', 'Une erreur s\'est produite lors de la suppression du cadran.', 'error');
          }
        );
      }
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}