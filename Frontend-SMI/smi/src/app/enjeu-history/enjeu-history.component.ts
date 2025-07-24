import { Component, Input, OnInit } from '@angular/core';
import { EnjeuxService } from '../services/enjeux.service';
import { EnjeuHistory } from '../model/EnjeuHistory';
import { ActivatedRoute } from '@angular/router';
import { Enjeu } from '../model/Enjeu.model';

@Component({
  selector: 'app-enjeu-history',
  templateUrl: './enjeu-history.component.html',
  styleUrls: ['./enjeu-history.component.css']
})
export class EnjeuHistoryComponent implements OnInit {

  enjeuId!: number;
  enjeuDescription: string = '';
  historique: EnjeuHistory[] = [];
  errorMsg = '';

  constructor(
    private enjeuxService: EnjeuxService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    /*
    // Récupération de l'id depuis l'URL */
    this.enjeuId = Number(this.route.snapshot.paramMap.get('id'));

    // Chargement de la description de l'enjeu
    this.enjeuxService.getEnjeuById(this.enjeuId).subscribe({
      next: (enjeu: Enjeu) => {
        this.enjeuDescription = enjeu.description;
      },
      error: (err) => {
        console.error("Erreur lors du chargement de l'enjeu", err);
        this.errorMsg = "Impossible de charger la description de l'enjeu";
      }
    });

    // Chargement dynamique de l'historique
    this.enjeuxService.getHistoryByEnjeuId(this.enjeuId).subscribe({
      next: (data) => this.historique = data,
      error: () => this.errorMsg = 'Erreur lors du chargement de l’historique'
    });
    

    // --- Partie simulation à supprimer une fois connecté au backend ---
    
  //   this.historique = [
  //     {
  //       id: 1,
  //       enjeuId: 12,
  //       commentaire: 'Changement de description et poids',
  //       champModifie: 'description',
  //       etatAvant: '{"description":"Ancienne desc","poids":"FORT"}',
  //       etatApres: '{"description":"Nouvelle desc","poids":"MOYEN"}',
  //       dateModification: new Date('2025-07-14T10:30:00'),
  //       valeurAvant: 'Ancienne desc',
  //       valeurApres: 'Nouvelle desc'
  //     },
  //     {
  //       id: 2,
  //       enjeuId: 12,
  //       commentaire: 'Ajout d’un cadran',
  //       champModifie: 'cadransSources',
  //       etatAvant: '{"cadransSources":["Économique"]}',
  //       etatApres: '{"cadransSources":["Économique", "Social"]}',
  //       dateModification: new Date('2025-07-15T14:45:00'),
  //       valeurAvant: 'Économique',
  //       valeurApres: 'Économique, Social'
  //     }
  //   ];
    
  // }
  }
}
