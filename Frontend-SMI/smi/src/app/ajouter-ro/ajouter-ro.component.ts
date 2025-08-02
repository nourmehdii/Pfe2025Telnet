import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EnjeuxService } from '../services/enjeux.service';
import { RisqueService } from '../services/risque.service';
import { OpportuniteService } from '../services/opportunite.service';
import { Enjeu } from '../model/Enjeu.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-ro',
  templateUrl: './ajouter-ro.component.html',
  styleUrls: ['./ajouter-ro.component.css']
})
export class AjouterRoComponent implements OnInit {
form: FormGroup;
enjeux: Enjeu[] = [];

  constructor(
    private fb: FormBuilder,
    private enjeuService: EnjeuxService,
    private risqueService: RisqueService,
    private opportuniteService: OpportuniteService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  

  ngOnInit(): void {
    
    // Initialisation du formulaire
    this.form = this.fb.group({
      type: ['RISQUE'],
      enjeuId: [''],
      probabilite: [1],
      acteurResponsable: [''],
      dateSuivi: [''],

      // Champs spécifiques au risque
      impact: [1],
      descriptionRisque: [''],
      origine: [''],
      categorie: [''],
      planAction: [''],
      statut: ['OUVERT'],
      severite: [''],

      // Champs spécifiques à l’opportunité
      beneficePotentiel: [1],
      descriptionOpportunite: [''],
      actionRecommandee: ['']
    });

    // Chargement des enjeux
    this.enjeuService.getEnjeuxList().subscribe(data => {
      this.enjeux = data;
    });
  }

onSubmit(): void {
  const value = this.form.value;

  if (value.type === 'RISQUE') {
    const risque = {
      enjeu: { id: value.enjeuId }, // Changé de enjeuId
      probabilite: value.probabilite,
      impact: value.impact,
      evaluationRisque: value.probabilite * value.impact,
      acteurResponsable: value.acteurResponsable,
      dateSuivi: value.dateSuivi,
      description: value.descriptionRisque, // Changé de descriptionRisque
      origine: value.origine,
      categorie: value.categorie,
      planAction: value.planAction,
      statut: value.statut,
      severite: value.severite
    };
    console.log(risque);
    this.risqueService.addRisque(risque).subscribe({
      next: () => {
        this.form.reset({ type: 'RISQUE', probabilite: 1, impact: 1, beneficePotentiel: 1, statut: 'OUVERT' });
        this.redirectToROList();
      },
      error: (error) => console.error('Erreur', error)
    });
  } else if (value.type === 'OPPORTUNITE') {
    const opportunite = {
      enjeu: { id: value.enjeuId }, // Changé de enjeuId
      probabilite: value.probabilite,
      beneficePotentiel: value.beneficePotentiel,
      valeurOpportunite: value.probabilite * value.beneficePotentiel,
      acteurResponsable: value.acteurResponsable,
      dateSuivi: value.dateSuivi,
      descriptionOpportunite: value.descriptionOpportunite,
      actionRecommandee: value.actionRecommandee
    };
    this.opportuniteService.addOpportunite(opportunite).subscribe({
      next: () => {
        this.form.reset({ type: 'RISQUE', probabilite: 1, impact: 1, beneficePotentiel: 1, statut: 'OUVERT' });
        this.redirectToROList();
      },
      error: (error) => console.error('Erreur', error)
    });
  }
}

redirectToROList(): void {
this.router.navigate(['/risques-opportunites']);
}

}




