import { Component, OnInit } from '@angular/core';
import { EnjeuxService } from '../services/enjeux.service';
import { UserserviceService } from '../services/userservice.service';
import { EnjeuHistory } from '../model/EnjeuHistory';
import { ActivatedRoute } from '@angular/router';
import { Enjeu } from '../model/Enjeu.model';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Interface for the parsed Enjeu state
export interface EnjeuState {
  description?: string;
  poids?: string;
  cadransSources?: number[];
  attentesPartiesPrenantes?: number[];
  creePar?: string;
  dateCreation?: string | null;
  dateModification?: string | null;
  commentaireDerniereModification?: string | null;
  [key: string]: any; // Allow additional fields
}

// Interface for cadran source from UserserviceService
export interface CadranSource {
  id: number;
  name: string;
}

@Component({
  selector: 'app-enjeu-history',
  templateUrl: './enjeu-history.component.html'
})
export class EnjeuHistoryComponent implements OnInit {
  enjeuId!: number;
  enjeuDescription: string = '';
  historique: EnjeuHistory[] = [];
  errorMsg = '';
  cadransSourcesMap: { [key: number]: string } = {};
  public fieldNameMap: { [key: string]: string } = {
    cadransSources: 'Cadrans Sources',
    attentesPartiesPrenantes: 'Attentes Parties Prenantes',
    description: 'Nom de l\'enjeu',
    poids: 'Poids',
    creePar: 'Créé par',
    dateCreation: 'Date de création',
    dateModification: 'Date de modification'
  };

  constructor(
    private enjeuxService: EnjeuxService,
    private userservice: UserserviceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Récupération de l'id depuis l'URL
    this.enjeuId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Enjeu ID:', this.enjeuId); // Debug

    // Chargement de la description de l'enjeu
    this.enjeuxService.getEnjeuById(this.enjeuId).subscribe({
      next: (enjeu: Enjeu) => {
        this.enjeuDescription = enjeu.description;
        console.log('Enjeu Description:', this.enjeuDescription); // Debug
      },
      error: (err) => {
        console.error('Erreur lors du chargement de l\'enjeu', err);
        this.errorMsg = 'Impossible de charger la description de l\'enjeu';
      }
    });

    // Chargement dynamique de l'historique
    this.enjeuxService.getHistoryByEnjeuId(this.enjeuId).subscribe({
      next: (data) => {
        this.historique = data;
        console.log('Historique:', this.historique); // Debug
        const cadranIds = this.extractCadranIds(data);
        console.log('Cadran IDs:', cadranIds); // Debug
        this.fetchCadranNames(cadranIds);
      },
      error: () => (this.errorMsg = 'Erreur lors du chargement de l’historique')
    });
  }

  private extractCadranIds(historique: EnjeuHistory[]): number[] {
    const ids = new Set<number>();
    historique.forEach(history => {
      const avant = this.parseEnjeuString(history.etatAvant);
      const apres = this.parseEnjeuString(history.etatApres);
      (avant.cadransSources || []).forEach(id => ids.add(id));
      (apres.cadransSources || []).forEach(id => ids.add(id));
      (avant.attentesPartiesPrenantes || []).forEach(id => ids.add(id));
      (apres.attentesPartiesPrenantes || []).forEach(id => ids.add(id));
    });
    return Array.from(ids);
  }

  private fetchCadranNames(cadranIds: number[]): void {
    if (cadranIds.length === 0) return;

    const requests: Observable<CadranSource>[] = cadranIds.map(id =>
      this.userservice.getCadranById(id).pipe(
        map(cadran => ({ id, name: cadran.name }))
      )
    );

    forkJoin(requests).subscribe({
      next: (cadrans: CadranSource[]) => {
        this.cadransSourcesMap = cadrans.reduce((map, cadran) => {
          map[cadran.id] = cadran.name;
          return map;
        }, {} as { [key: number]: string });
        console.log('Cadrans Sources Map:', this.cadransSourcesMap); // Debug
      },
      error: (err) => {
        console.error('Erreur lors du chargement des noms des cadrans', err);
        this.errorMsg = 'Impossible de charger les noms des cadrans';
      }
    });
  }

  parseEnjeuString(enjeuString: string): EnjeuState {
    try {
      const content = enjeuString.replace(/^Enjeu$$ (.*) $$$/, '$1');
      const result: EnjeuState = {};
      let currentKey = '';
      let currentValue = '';
      let insideArray = false;
      let arrayDepth = 0;
      let i = 0;

      while (i < content.length) {
        const char = content[i];
        if (char === '=' && !insideArray) {
          currentKey = currentValue.trim();
          currentValue = '';
          i++;
          continue;
        }
        if (char === '[') {
          insideArray = true;
          arrayDepth++;
          currentValue += char;
        } else if (char === ']') {
          arrayDepth--;
          currentValue += char;
          if (arrayDepth === 0) {
            insideArray = false;
          }
        } else if (char === ',' && !insideArray) {
          if (currentKey) {
            result[currentKey] = this.parseValue(currentValue.trim());
            currentKey = '';
            currentValue = '';
          }
        } else {
          currentValue += char;
        }
        i++;
      }

      if (currentKey && currentValue) {
        result[currentKey] = this.parseValue(currentValue.trim());
      }

      return result;
    } catch (e) {
      console.error('Error parsing Enjeu string:', e);
      return {};
    }
  }

  private parseValue(value: string): any {
    if (value === 'null') return null;
    if (value.startsWith('[') && value.endsWith(']')) {
      try {
        const arrayContent = value
          .slice(1, -1)
          .split(',')
          .map(item => {
            const trimmed = item.trim();
            return isNaN(Number(trimmed)) ? trimmed : Number(trimmed);
          });
        return arrayContent;
      } catch (e) {
        return [];
      }
    }
    if (!isNaN(Number(value))) {
      return Number(value);
    }
    return value;
  }

  getKeys(enjeuString: string): string[] {
    const parsed = this.parseEnjeuString(enjeuString);
    return Object.keys(parsed);
  }

  getValue(enjeuString: string, key: string): any {
    const parsed = this.parseEnjeuString(enjeuString);
    return parsed[key];
  }

  formatValue(value: any): string {
    if (value === null || value === undefined) return 'null';
    if (Array.isArray(value)) {
      return value
        .map(item => this.cadransSourcesMap[item] || item)
        .join(', ');
    }
    return value.toString();
  }

  areValuesEqual(value1: any, value2: any): boolean {
    if (value1 === value2) return true;
    if (Array.isArray(value1) && Array.isArray(value2)) {
      if (value1.length !== value2.length) return false;
      return value1.every((item, index) => item === value2[index]);
    }
    return false;
  }
}