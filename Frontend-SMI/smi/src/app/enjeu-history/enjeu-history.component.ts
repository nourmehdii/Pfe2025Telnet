import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EnjeuxService } from '../services/enjeux.service';
import { UserserviceService } from '../services/userservice.service';
import { Enjeu } from '../model/Enjeu.model';
import { EnjeuHistoryAvecFiltre } from '../model/EnjeuHistory';

export interface EnjeuState {
  description?: string;
  poids?: string;
  cadransSources?: number[];
  attentesPartiesPrenantes?: number[];
  creePar?: string;
  dateCreation?: string | null;
  dateModification?: string | null;
  commentaireDerniereModification?: string | null;
  [key: string]: any;
}

export interface EnjeuHistory {
  id: number;
  commentaire: string;
  dateModification: string;
  etatAvant: EnjeuState | null;
  etatApres: EnjeuState | null;
}

export interface CadranSource {
  id: number;
  name: string;
}

export interface Attente {
  id: number;
  expectation: string;
}

@Component({
  selector: 'app-enjeu-history',
  templateUrl: './enjeu-history.component.html',
})
export class EnjeuHistoryComponent implements OnInit {
  enjeuId!: number;
  enjeuDescription: string = '';
  historique: EnjeuHistory[] = [];
  errorMsg = '';

  // Mapping id → nom pour cadrans et attentes
  cadransMap: { [id: number]: string } = {};
  attentesMap: { [id: number]: string } = {};

  cadransSourcesMap: { [key: number]: string } = {};
  fieldNameMap: { [key: string]: string } = {
    cadransSources: 'Cadrans Sources',
    attentesPartiesPrenantes: 'Attentes Parties Prenantes',
    description: 'Nom de l\'enjeu',
    poids: 'Poids',
    creePar: 'Créé par',
    dateCreation: 'Date de création',
    dateModification: 'Date de modification',
  };

  ignoredKeys = ['id', 'risques', 'opportunites', 'commentaireDerniereModification', 'Enjeu(id)'];

  constructor(
    private enjeuxService: EnjeuxService,
    private userservice: UserserviceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.enjeuId = Number(this.route.snapshot.paramMap.get('id'));

    // Charger tous les cadrans
    this.userservice.getAllCadrans().subscribe({
      next: (cadrans: any[]) => {
        cadrans.forEach(c => {
          if (c.id != null && c.name) this.cadransMap[c.id] = c.name;
        });
      },
      error: () => (this.errorMsg = 'Impossible de charger les cadrans'),
    });

    // Charger toutes les attentes
    this.userservice.getResultsPipList().subscribe({
      next: (attentes: Attente[]) => {
        attentes.forEach(a => {
          if (a.id != null && a.expectation) this.attentesMap[a.id] = a.expectation;
        });
      },
      error: () => (this.errorMsg = 'Impossible de charger les attentes'),
    });

    // Charger la description de l'enjeu
    this.enjeuxService.getEnjeuById(this.enjeuId).subscribe({
      next: (enjeu: Enjeu) => (this.enjeuDescription = enjeu.description),
      error: () => (this.errorMsg = 'Impossible de charger la description de l\'enjeu'),
    });

    // Charger l'historique
    this.enjeuxService.getHistoryByEnjeuId(this.enjeuId).subscribe({
      next: (data: any[]) => {
        this.historique = data
          .map(h => ({
            id: h.id,
            commentaire: h.commentaire,
            dateModification: h.dateModification,
            etatAvant: h.etatAvant ? JSON.parse(h.etatAvant) : {},
            etatApres: h.etatApres ? JSON.parse(h.etatApres) : {},
          }))
          .sort((a, b) => new Date(b.dateModification).getTime() - new Date(a.dateModification).getTime());

        const cadranIds = this.extractCadranIds(this.historique);
        this.fetchCadranNames(cadranIds);

        const attenteIds = this.extractAttenteIds(this.historique);
        this.fetchAttentesNames(attenteIds);
      },
      error: () => (this.errorMsg = 'Erreur lors du chargement de l’historique'),
    });
  }

  private extractCadranIds(historique: EnjeuHistory[]): number[] {
    const ids = new Set<number>();
    historique.forEach(history => {
      const avant = history.etatAvant || {};
      const apres = history.etatApres || {};

      (avant.cadransSources || []).forEach((id: number) => ids.add(id));
      (apres.cadransSources || []).forEach((id: number) => ids.add(id));
      (avant.attentesPartiesPrenantes || []).forEach((id: number) => ids.add(id));
      (apres.attentesPartiesPrenantes || []).forEach((id: number) => ids.add(id));
    });
    return Array.from(ids);
  }

  private extractAttenteIds(historique: EnjeuHistory[]): number[] {
    const ids = new Set<number>();
    historique.forEach(history => {
      const avant = history.etatAvant || {};
      const apres = history.etatApres || {};

      (avant.attentesPartiesPrenantes || []).forEach((id: number) => ids.add(id));
      (apres.attentesPartiesPrenantes || []).forEach((id: number) => ids.add(id));
    });
    return Array.from(ids);
  }

  private fetchCadranNames(cadranIds: number[]): void {
    if (!cadranIds.length) return;

    const requests: Observable<CadranSource>[] = cadranIds.map(id =>
      this.userservice.getCadranById(id).pipe(map(c => ({ id, name: c.name })))
    );

    forkJoin(requests).subscribe({
      next: (cadrans: CadranSource[]) => {
        this.cadransSourcesMap = cadrans.reduce((map, cadran) => {
          map[cadran.id] = cadran.name;
          return map;
        }, {} as { [key: number]: string });
      },
      error: () => (this.errorMsg = 'Impossible de charger les noms des cadrans'),
    });
  }

  private fetchAttentesNames(attenteIds: number[]): void {
    if (!attenteIds.length) return;

    const requests: Observable<Attente>[] = attenteIds.map(id =>
      this.userservice.getResultsPipById(id).pipe(map(a => ({ id, expectation: a.expectation })))
    );

    forkJoin(requests).subscribe({
      next: (attentes: Attente[]) => {
        this.attentesMap = attentes.reduce((map, attente) => {
          if (attente.id != null && attente.expectation) map[attente.id] = attente.expectation;
          return map;
        }, {} as { [id: number]: string });
      },
      error: () => (this.errorMsg = 'Impossible de charger les noms des attentes'),
    });
  }

  getKeys(state: EnjeuState | null): string[] {
    return state ? Object.keys(state) : [];
  }

  getValue(state: EnjeuState | null, key: string): any {
    return state ? state[key] : null;
  }

  formatValue(value: any, key?: string): string {
    if (value === null || value === undefined || (Array.isArray(value) && value.length === 0)) {
      return '—';
    }

    if (Array.isArray(value)) {
      let map: { [id: number]: string } = {};
      if (key === 'cadransSources') map = this.cadransMap;
      else if (key === 'attentesPartiesPrenantes') map = this.attentesMap;

      return value.map(item => `• ${map[item] || item}`).join('<br>');
    }

    return `• ${value.toString()}`;
  }

  areValuesEqual(value1: any, value2: any): boolean {
    if (value1 === value2) return true;
    if (Array.isArray(value1) && Array.isArray(value2)) {
      if (value1.length !== value2.length) return false;
      return value1.every((item, index) => item === value2[index]);
    }
    return false;
  }

  private filterKeys(state: EnjeuState): EnjeuState {
    const filtered: EnjeuState = {};
    Object.keys(state).forEach(key => {
      if (!this.ignoredKeys.includes(key)) filtered[key] = state[key];
    });
    return filtered;
  }

  getFilteredState(state: EnjeuState | null): EnjeuState {
    return state ? this.filterKeys(state) : {};
  }

  mapIdsToNames(ids: number[], map: { [id: number]: string }): string {
    if (!ids || ids.length === 0) return 'Aucun';
    return ids.map(id => map[id] || id).join(', ');
  }
}
