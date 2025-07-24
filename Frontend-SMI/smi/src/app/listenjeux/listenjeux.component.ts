import { Component, OnInit } from '@angular/core';
 import { Router } from '@angular/router';
 import { EnjeuxService } from '../services/enjeux.service';
 import { UserserviceService } from '../services/userservice.service';
 import { EType } from '../model/EType.model';
 import { Volet } from '../model/Volet.model';
 import { Cadran } from '../model/cadran.model';
 import { ResultsPip } from '../model/ResultsPip.model';
 import { Enjeu } from '../model/Enjeu.model';
 import { MatDialog } from '@angular/material/dialog';
import { EnjeuDetailModalComponent } from '../enjeu-detail-modal/enjeu-detail-modal.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listenjeux',
  templateUrl: './listenjeux.component.html',
  styleUrls: ['./listenjeux.component.css']
})
export class ListenjeuxComponent implements OnInit {

  enjeux: Enjeu[] = [];
  allCadrans: Cadran[] = [];
  allAttentes: ResultsPip[] = [];
  p: number = 1;
  searchText: string = '';  

  constructor(
    private enjeuxService: EnjeuxService,
    private cadranService: UserserviceService,
    private pipService: UserserviceService,
    private router: Router,
    private dialog: MatDialog

  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.enjeuxService.getEnjeuxList().subscribe(data => {
      this.enjeux = data;
    });

    this.cadranService.getAllCadrans().subscribe(data => {
      this.allCadrans = data;
    });

    this.pipService.getResultsPipList().subscribe(data => {
      this.allAttentes = data;
    });
  }

 getCadranInfos(cadranIds: number[]): string {
  return this.allCadrans
    .filter(c => cadranIds.includes(c.id!))
    .map(c => `•  ${c.name} (${c.type})`)
    .join('<br>');
}


  getAttentesText(attentesIds: number[]): string {
    return this.allAttentes
      .filter(a => attentesIds.includes(a.id))
      .map(a => a.expectation)
      .join(', ');
  }
    openAjouterEnjeux(): void {
    this.router.navigate(['/ajouterenjeux']);
  }


deleteEnjeu(id: number): void {
  Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: "Vous ne pourrez pas revenir en arrière !",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Oui, supprimer !',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      this.enjeuxService.deleteEnjeu(id).subscribe({
        next: () => {
          Swal.fire(
            'Supprimé !',
            'L\'enjeu a été supprimé avec succès.',
            'success'
          );
          this.loadData(); // Recharge la liste après suppression
        },
        error: (error) => {
          console.error('Erreur lors de la suppression :', error);
          Swal.fire(
            'Erreur !',
            'Une erreur s\'est produite lors de la suppression de l\'enjeu.',
            'error'
          );
        }
      });
    }
  });
}


redirectToEditEnjeu(enjeu: Enjeu): void {
  this.router.navigate(['/modifier-enjeu', enjeu.id], {
    state: { enjeuPreload: enjeu }
  });
}


openDetailModal(enjeu: any): void {
  this.dialog.open(EnjeuDetailModalComponent, {
    width: '600px',
    data: enjeu
  });
}

}

