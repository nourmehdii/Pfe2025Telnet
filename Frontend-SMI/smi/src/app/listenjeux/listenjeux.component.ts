import { Component, OnInit } from '@angular/core';
 import { Router } from '@angular/router';
 import { EnjeuxService } from '../services/enjeux.service';
 import { UserserviceService } from '../services/userservice.service';
 import { EType } from '../model/EType.model';
 import { Volet } from '../model/Volet.model';
 import { Cadran } from '../model/cadran.model';
 import { ResultsPip } from '../model/ResultsPip.model';
 import { Enjeu } from '../model/Enjeu.model';

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
  constructor(
    private enjeuxService: EnjeuxService,
    private cadranService: UserserviceService,
    private pipService: UserserviceService,
    private router: Router

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

deleteEnjeu() : void {
  console.log("delete this enjeu")
}

openUpdateEnjeuModal(): void {
  console.log("open update modal ")
}

}

