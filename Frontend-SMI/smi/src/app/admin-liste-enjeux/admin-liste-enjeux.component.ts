import { Component, OnInit } from '@angular/core';
import { EnjeuDetailModalComponent } from '../enjeu-detail-modal/enjeu-detail-modal.component';
import { Enjeu } from '../model/Enjeu.model';
import { Cadran } from '../model/cadran.model';
import { ResultsPip } from '../model/ResultsPip.model';
import { Router } from '@angular/router';
import { EnjeuxService } from '../services/enjeux.service';
import { UserserviceService } from '../services/userservice.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-liste-enjeux',
  templateUrl: './admin-liste-enjeux.component.html',
  styleUrls: ['./admin-liste-enjeux.component.css']
})
export class AdminListeEnjeuxComponent implements OnInit {

  enjeux: Enjeu[] = [];
  allCadrans: Cadran[] = [];
  allAttentes: ResultsPip[] = [];
  p: number = 1; // pagination
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

  // 🔁 Récupération des données nécessaires
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

  // 📋 Formater les infos des cadrans pour l'affichage
  getCadranInfos(cadranIds: number[]): string {
    return this.allCadrans
      .filter(c => cadranIds.includes(c.id!))
      .map(c => `•  ${c.name} (${c.type})`)
      .join('<br>');
  }

  // 📋 Formater les attentes pour l'affichage
  getAttentesText(attentesIds: number[]): string {
    return this.allAttentes
      .filter(a => attentesIds.includes(a.id))
      .map(a => a.expectation)
      .join(', ');
  }

  // ➕ Redirection vers la page d'ajout
  openAjouterEnjeux(): void {
    this.router.navigate(['/ajouterenjeux']);
  }

  // ❌ Suppression d’un enjeu avec confirmation
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
            // ✅ On recharge la liste (vue admin)
            this.router.navigate(['/admin/enjeux']);
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

  // ✏️ Redirection vers la page de modification
  redirectToEditEnjeu(enjeu: Enjeu): void {
    this.router.navigate(['/modifier-enjeu', enjeu.id], {
      state: { enjeuPreload: enjeu }
    });
  }

  // 🔍 Afficher les détails dans un modal
  openDetailModal(enjeu: any): void {
    this.dialog.open(EnjeuDetailModalComponent, {
      width: '600px',
      data: enjeu
    });
  }

  // 📜 Redirection vers l’historique
  goToHistorique(enjeuId: number) {
    this.router.navigate(['/admin/enjeux', enjeuId, 'historique']);
  }
}
