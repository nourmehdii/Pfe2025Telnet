import { Component, OnInit, Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Cadran } from '../model/cadran.model';
import { UserserviceService } from '../services/userservice.service';
import { AjoutercadranComponent } from '../ajoutercadran/ajoutercadran.component';
import { ModifiercadranComponent } from '../modifiercadran/modifiercadran.component';
import { CadranModalComponent } from '../cadran-modal/cadran-modal.component';
import { EAxe, Volet } from '../model/Volet.model';
import { EType } from '../model/EType.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-matriceswot',
  templateUrl: './matriceswot.component.html',
  styleUrls: ['./matriceswot.component.css']
})
export class MatriceswotComponent implements OnInit {
  voletsForce: Cadran[] = [];
  voletsFaiblesse: Cadran[] = [];
  voletsOpportunite: Cadran[] = [];
  voletsMenace: Cadran[] = [];
  cadranId: number;
  cadranDetails: Cadran;
  cadran: Cadran[] = [];
  voletName: string;
 
  constructor(private voletService: UserserviceService, 
              public dialog: MatDialog) 
              { }

  ngOnInit(): void {
    this.loadVolets();
    // Déboguer la valeur de cadranId
    console.log('cadranId dans ngOnInit:', this.cadranId);
    console.log('cadranId avant getCadranListByTypeW:', this.cadranId);
  }

  loadVolets(): void {
    this.voletService.getCadranListByTypeS().subscribe(
      (cadrans: Cadran[]) => {
        this.voletsForce = this.filterCadranByTypeAndAxe(cadrans, EAxe.INTERNE);
      },
      error => {
        console.error('Erreur lors de la récupération des cadrans de force :', error);
      }
    );

    // Ajouter des console.log pour déboguer la valeur de cadranId
    console.log('cadranId avant getCadranListByTypeW:', this.cadranId);
    this.voletService.getCadranListByTypeW().subscribe(
      (cadrans: Cadran[]) => {
        this.voletsFaiblesse = this.filterCadranByTypeAndAxe(cadrans, EAxe.INTERNE);
      },
      error => {
        console.error('Erreur lors de la récupération des cadrans de faiblesse :', error);
      }
    );

    this.voletService.getCadranListByTypeO().subscribe(
      (cadrans: Cadran[]) => {
        this.voletsOpportunite = this.filterCadranByTypeAndAxe(cadrans, EAxe.EXTERNE);
        console.log(this.voletsOpportunite)
        console.log(cadrans)
      },
      error => {
        console.error('Erreur lors de la récupération des cadrans d\'opportunité :', error);
      }
    );



    this.voletService.getCadranListByTypeT().subscribe(
      (cadrans: Cadran[]) => {
        this.voletsMenace = this.filterCadranByTypeAndAxe(cadrans, EAxe.EXTERNE);
      },
      error => {
        console.error('Erreur lors de la récupération des cadrans de menace :', error);
      }
    );
  }

  deleteCadran(cadranId: number): void {
    // Utiliser SweetAlert pour confirmer la suppression
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer ce cadran?',
      text: 'Cette action est irréversible!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Supprimer le cadran si l'utilisateur confirme
        this.voletService.deleteCadran(cadranId).subscribe(
          response => {
            console.log('Cadran successfully deleted:', response);
            Swal.fire(
              'Supprimé!',
              'Le cadran a été supprimé.',
              'success'
            );
            // Rafraîchir la liste après suppression
            this.loadVolets();
          },
          error => {
            console.error('Error deleting cadran:', error);
            Swal.fire(
              'Erreur!',
              'Une erreur est survenue lors de la suppression du cadran.',
              'error'
            );
          }
        );
      }
    });
  }

  filterCadranByTypeAndAxe(cadrans: Cadran[], axe: EAxe): Cadran[] {
    switch(axe) {
      case EAxe.INTERNE:
        return cadrans.filter(cadran => cadran.type === EType.STRENGTH || cadran.type === EType.WEAKNESS);
      case EAxe.EXTERNE:
        return cadrans.filter(cadran => cadran.type === EType.OPPORTUNITY || cadran.type === EType.THREAT);
      default:
        return [];
    }
  }

  getCadranType(axe: EAxe): EType {
    switch (axe) {
      case EAxe.INTERNE:
        return EType.STRENGTH;
      case EAxe.EXTERNE:
        return EType.OPPORTUNITY;
      default:
        return EType.STRENGTH;
    }
  }
 
  openUpdatecadrantModal(cadranOrId: Cadran | number): void {
    let cadranId: number;

    if (typeof cadranOrId === 'number') {
        cadranId = cadranOrId;
    } else {
        cadranId = cadranOrId.id;
    }

    if (cadranId === undefined) {
        console.error("L'ID du cadran est undefined. Veuillez vérifier.");
        return;
    }

    const dialogRef = this.dialog.open(ModifiercadranComponent, {
        width: '500px',
        data: { cadranId: cadranId }
    });

    dialogRef.componentInstance.cadranUpdated.subscribe(() => {
        this.loadVolets();
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('La fenêtre de dialogue a été fermée');
        // Vous pouvez ajouter un traitement supplémentaire après la fermeture de la modal ici
    });
}



getCadranById(cadranId: number): Cadran {
  // Parcourir tous les tableaux de cadrans pour trouver le cadran avec l'ID donné
  const allCadrans: Cadran[] = [...this.voletsForce, ...this.voletsFaiblesse, ...this.voletsOpportunite, ...this.voletsMenace];
  return allCadrans.find(cadran => cadran.id === cadranId);
}

  openAddCadranModal(): void {
    const dialogRef = this.dialog.open(AjoutercadranComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadVolets();
    });
  }

  goDown(targetId: string): void {
  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",  //  "smooth" un glissement fluide
      block: "start"
    });
  }
}

  onCadranClick(cadran: Cadran): void {
    this.dialog.open(CadranModalComponent, {
    width: '600px',
    data:  { cadran: cadran, cadranId: cadran.id }
  });
}

  

}