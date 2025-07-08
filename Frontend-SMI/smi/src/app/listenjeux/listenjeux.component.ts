import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnjeuxService } from '../services/enjeux.service';
import { UserserviceService } from '../services/userservice.service';
import { EType } from '../model/EType.model';
import { Volet } from '../model/Volet.model';
import { Cadran } from '../model/cadran.model';
import { ResultsPip } from '../model/ResultsPip.model';


@Component({
  selector: 'app-listenjeux',
  templateUrl: './listenjeux.component.html',
  styleUrls: ['./listenjeux.component.css']
})
export class ListenjeuxComponent implements OnInit {

  headers: string[] = ['Intitulé', 'Facteurs sources', 'Attentes', 'Poids', 'Créé par', 'Date'];
  tableRows: any[][] = [];
  enjeux: any[] = [];


  constructor(
    private enjeuxService: EnjeuxService,
    private userService: UserserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chargerEnjeux();
  }

//  chargerEnjeux(): void {
//   this.enjeuxService.getEnjeuxList().subscribe({
//     next: async (data) => {
//       const rows: any[][] = [];

//       for (const enjeu of data) {
//         const cadrans: Cadran[] = await Promise.all(
//           enjeu.cadransSources.map((id: number) =>
//             this.userService.getCadranById(id).toPromise()
//           )
//         );

//         const attentes: ResultsPip[] = await Promise.all(
//           enjeu.attentesPartiesPrenantes.map((id: number) =>
//             this.userService.getResultsPipById(id).toPromise()
//           )
//         );

//         const row = [
//           enjeu.description ?? 'N/A',
//           cadrans.map(c => c.name).join(', ') || 'N/A',
//           attentes.map(a => a.expectation).join(', ') || 'N/A',
//           enjeu.poids ?? 'N/A',
//           enjeu.creePar ?? 'N/A',
//           new Date(enjeu.dateCreation).toLocaleDateString() ?? 'N/A'
//         ];

//         rows.push(row);
//       }

//       this.tableRows = rows;
//       console.log('Données formatées des enjeux chargées :', this.tableRows);
//     },
//     error: (err) => {
//       console.error('Erreur lors du chargement des enjeux :', err);
//     }
//   });
// }

chargerEnjeux(): void {
  this.enjeuxService.getEnjeuxList().subscribe({
    next: async (data) => {
      const enjeuxComplet = await Promise.all(
        data.map(async (enjeu: any) => {
          const cadrans = await Promise.all(
            enjeu.cadransSources.map((id: number) =>
              this.userService.getCadranById(id).toPromise()
            )
          );

          const attentes = await Promise.all(
            enjeu.attentesPartiesPrenantes.map((id: number) =>
              this.userService.getResultsPipById(id).toPromise()
            )
          );

          return {
            ...enjeu,
            cadransSources: cadrans,
            attentesPartiesPrenantes: attentes
          };
        })
      );

      this.enjeux = enjeuxComplet;

      // Construction du tableau pour l’affichage dynamique
      this.tableRows = this.enjeux.map((enjeu: any) => [
  enjeu.description ?? 'N/A',
  (enjeu.cadransSources ?? []).map((c: any) => c.name).join(', ') || 'N/A',
  (enjeu.attentesPartiesPrenantes ?? []).map((a: any) => a.expectation).join(', ') || 'N/A',
  enjeu.poids ?? 'N/A',
  enjeu.creePar ?? 'N/A',
  new Date(enjeu.dateCreation).toLocaleDateString() ?? 'N/A'
]);

    },
    error: (err) => {
      console.error('Erreur lors du chargement des enjeux :', err);
    }
  });
}

  openAjouterEnjeux(): void {
    this.router.navigate(['/ajouterenjeux']);
  }
}
