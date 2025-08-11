import { Component, OnInit } from '@angular/core';
import { EnjeuxService } from '../services/enjeux.service';
import { RisqueService } from '../services/risque.service';
import { OpportuniteService } from '../services/opportunite.service';
import { Enjeu } from '../model/Enjeu.model';
import { RO, TypeRO } from '../model/RO.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analyse-ro-list',
  templateUrl: './ro-list.component.html',
  styleUrls: ['./ro-list.component.css']
})
export class AnalyseRoListComponent implements OnInit {

  enjeux: Enjeu[] = [];

  risques: RO[] = [];
  opportunites: RO[] = [];
  selectedEnjeuId: number | null = null;
  selectedEnjeuDescription: string | null = null;
  selectedActeur: string = '';
  //router: any;
  searchText: string = '';  
    p: number = 1;

  constructor(
    private enjeuxService: EnjeuxService,
    private risqueService: RisqueService,
    private opportuniteService: OpportuniteService,
    private router: Router
  ) {}

  ngOnInit(): void { 
    

    this.loadData();
  }

  loadData(): void {
    // Récupère tous les enjeux pour affichage description
    this.enjeuxService.getEnjeuxList().subscribe(data => {
      this.enjeux = data;
    });

    // Récupère tous les risques
    this.risqueService.getRisques().subscribe(data => {
      this.risques = data.map(r => ({ ...r, type: TypeRO.RISQUE }));
    });

    // Récupère toutes les opportunités
    this.opportuniteService.getOpportunites().subscribe(data => {
      this.opportunites = data.map(o => ({ ...o, type: TypeRO.OPPORTUNITE }));
    });
  }

  // Filtrage dynamique des risques
  filterRisques(): RO[] {
    return this.risques.filter(item =>
      (!this.selectedEnjeuId || item.enjeuId === this.selectedEnjeuId) &&
      (!this.selectedActeur || item.acteurResponsable?.toLowerCase().includes(this.selectedActeur.toLowerCase()))
    );
  }

  // Filtrage dynamique des opportunités
  filterOpportunites(): RO[] {
    return this.opportunites.filter(item =>
      (!this.selectedEnjeuId || item.enjeuId === this.selectedEnjeuId) &&
      (!this.selectedActeur || item.acteurResponsable?.toLowerCase().includes(this.selectedActeur.toLowerCase()))
    );
  }


  //Filtrage dynamique par nom de l'enjeu 


  filterName(): RO[] {
  let result = this.risques;

  if (this.selectedEnjeuDescription) {
    result = result.filter(r =>
      r.enjeu?.description?.toLowerCase().includes(this.selectedEnjeuDescription.toLowerCase())
    );
  }

  return result;
}


  // Récupération de la description de l’enjeu
  getEnjeuDescription(id: number): string {
    const enjeu = this.enjeux.find(e => e.id === id);
    return enjeu ? enjeu.description : '—';
  }



  redirectToEditRisque(risque: RO): void {
  // Redirige vers une route contenant l'ID à modifier
  this.router.navigate(['/modifier-risque', risque.id]);
}

redirectToEditOpp(opp: RO): void {
  this.router.navigate(['/modifier-opportunite', opp.id]);
}

deleteRisque(id: number): void {

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
      this.risqueService.deleteRisque(id).subscribe({
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

deleteOpp(id: number): void {
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
      this.opportuniteService.deleteOpportunite(id).subscribe({
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

}
