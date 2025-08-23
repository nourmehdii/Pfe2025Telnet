import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnjeuxService } from '../services/enjeux.service';
import { UserserviceService } from '../services/userservice.service';
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
    this.loadData(); }

    // ⚡ Vérifie si un enjeu modifié a été passé en state après redirection
  //   const updatedEnjeu = history.state.updatedEnjeu;
  //   if (updatedEnjeu) {
  //     this.updateEnjeuInList(updatedEnjeu);
  //   }
  // }
  
  // Charge tous les enjeux et données liées
  loadData(): void {
   this.enjeuxService.getEnjeuxList().subscribe(data => {
  console.log("testtttttttt", data);

  const seen = new Set();
  this.enjeux = data.filter((item: any) => {
    if (seen.has(item.id)) {
      return false;
    }
    seen.add(item.id);
    return true;
  });
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
      .map(c => `• ${c.name} (${c.type})`)
      .join('<br>');
  }

  getAttentesText(attentesIds: number[]): string {
    return this.allAttentes
      .filter(a => attentesIds.includes(a.id))
      .map(a => `• ${a.expectation} (${a.pip.name})`)
      .join('<br>');
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

  // private removeEnjeuFromList(id: number): void {
  //   this.enjeux = this.enjeux.filter(e => e.id !== id);
  // }

  redirectToEditEnjeu(enjeu: Enjeu): void {
    this.router.navigate(['/modifier-enjeu', enjeu.id], {
      state: { enjeuPreload: enjeu }
    });
  }

  // ⚡ Remplace un enjeu existant ou l'ajoute s'il n'était pas présent
// updateEnjeuInList(updatedEnjeu: Enjeu): void {
//     const index = this.enjeux.findIndex(e => e.id === updatedEnjeu.id);
//     if (index !== -1) {
//         this.enjeux[index] = updatedEnjeu;
//     } else {
//         this.enjeux.push(updatedEnjeu);
//     }
// }

updateEnjeuInList(updatedEnjeu: Enjeu): void {
  const index = this.enjeux.findIndex(e => e.id === updatedEnjeu.id);
  if (index !== -1) {
    this.enjeux[index] = updatedEnjeu;
  } else {
    this.enjeux.push(updatedEnjeu);
  }
}


  openDetailModal(enjeu: any): void {
    this.dialog.open(EnjeuDetailModalComponent, {
      width: '600px',
      data: enjeu
    });
  }

  
}
