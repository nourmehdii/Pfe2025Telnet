import { Component, OnInit } from '@angular/core';
import { EnjeuxService } from '../services/enjeux.service';
import { RisqueService } from '../services/risque.service';
import { OpportuniteService } from '../services/opportunite.service';
import { Enjeu } from '../model/Enjeu.model';
import { RO, TypeRO } from '../model/RO.model';

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
  selectedActeur: string = '';
  router: any;
  searchText: string = '';  

  constructor(
    private enjeuxService: EnjeuxService,
    private risqueService: RisqueService,
    private opportuniteService: OpportuniteService
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
  this.risqueService.deleteRisque(id).subscribe(() => {
    this.loadData(); // recharge les données après suppression
  });
}

deleteOpp(id: number): void {
  this.opportuniteService.deleteOpportunite(id).subscribe(() => {
    this.loadData();
  });
}

}
