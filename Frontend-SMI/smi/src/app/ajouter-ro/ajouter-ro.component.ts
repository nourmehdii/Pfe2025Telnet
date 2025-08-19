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
  mode: 'create' | 'edit' = 'create';
  form: FormGroup;
  enjeux: Enjeu[] = [];
  risqueIdToEdit?: number;
  opportuniteIdToEdit?: number;

  constructor(
    private fb: FormBuilder,
    private enjeuService: EnjeuxService,
    private risqueService: RisqueService,
    private opportuniteService: OpportuniteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

 ngOnInit(): void {
  this.form = this.fb.group({
    type: ['RISQUE'],
    enjeuId: [''],
    probabilite: [1],
    acteurResponsable: [''],
    dateSuivi: [''],

    // Risque
    impact: [1],
    descriptionRisque: [''],
    origine: [''],
    categorie: [''],
    planAction: [''],
    statut: ['OUVERT'],
    severite: [''],

    // Opportunité
    beneficePotentiel: [1],
    descriptionOpportunite: [''],
    actionRecommandee: ['']
  });

  this.enjeuService.getEnjeuxList().subscribe(enjeuxData => {
    this.enjeux = enjeuxData;

    this.route.paramMap.subscribe(params => {
      const risqueId = params.get('risqueId');
      const opportuniteId = params.get('opportuniteId');

      if (risqueId) {
        this.mode = 'edit';
        this.risqueIdToEdit = +risqueId;
        this.risqueService.getRisqueById(this.risqueIdToEdit).subscribe(r => {
          this.form.patchValue({
            type: 'RISQUE',
            enjeuId: r.enjeu.id,
            probabilite: r.probabilite,
            impact: r.impact,
            acteurResponsable: r.acteurResponsable,
            dateSuivi: r.dateSuivi,
            descriptionRisque: r.descriptionRisque,
            origine: r.origine,
            categorie: r.categorie,
            planAction: r.planAction,
            statut: r.statut,
            severite: r.severite
          });
        });
      } else if (opportuniteId) {
        this.mode = 'edit';
        this.opportuniteIdToEdit = +opportuniteId;
        this.opportuniteService.getOpportuniteById(this.opportuniteIdToEdit).subscribe(o => {
          this.form.patchValue({
            type: 'OPPORTUNITE',
            enjeuId: o.enjeu.id,
            probabilite: o.probabilite,
            beneficePotentiel: o.beneficePotentiel,
            acteurResponsable: o.acteurResponsable,
            dateSuivi: o.dateSuivi,
            descriptionOpportunite: o.descriptionOpportunite,
            actionRecommandee: o.actionRecommandee
          });
        });
      }
    });
  });
}


  onSubmit(): void {
    const value = this.form.value;

    if (value.type === 'RISQUE') {
      const risque = {
        enjeu: { id: value.enjeuId },
        probabilite: value.probabilite,
        impact: value.impact,
        evaluationRisque: value.probabilite * value.impact,
        acteurResponsable: value.acteurResponsable,
        dateSuivi: value.dateSuivi,
        descriptionRisque: value.descriptionRisque,
        origine: value.origine,
        categorie: value.categorie,
        planAction: value.planAction,
        statut: value.statut,
        severite: value.severite
      };

      if (this.mode === 'edit' && this.risqueIdToEdit) {
        this.risqueService.updateRisque(this.risqueIdToEdit, risque).subscribe({
          next: () => this.redirectToROList(),
          error: (error) => console.error('Erreur', error)
        });
      } else {
        this.risqueService.addRisque(risque).subscribe({
          next: () => {
            this.form.reset({
              type: 'RISQUE',
              probabilite: 1,
              impact: 1,
              beneficePotentiel: 1,
              statut: 'OUVERT'
            });
            this.redirectToROList();
          },
          error: (error) => console.error('Erreur', error)
        });
      }
    } else if (value.type === 'OPPORTUNITE') {
      const opportunite = {
        enjeu: { id: value.enjeuId },
        probabilite: value.probabilite,
        beneficePotentiel: value.beneficePotentiel,
        valeurOpportunite: value.probabilite * value.beneficePotentiel,
        acteurResponsable: value.acteurResponsable,
        dateSuivi: value.dateSuivi,
        descriptionOpportunite: value.descriptionOpportunite,
        actionRecommandee: value.actionRecommandee
      };

      if (this.mode === 'edit' && this.opportuniteIdToEdit) {
        this.opportuniteService.updateOpportunite(this.opportuniteIdToEdit, opportunite).subscribe({
          next: () => this.redirectToROList(),
          error: (error) => console.error('Erreur', error)
        });
      } else {
        this.opportuniteService.addOpportunite(opportunite).subscribe({
          next: () => {
            this.form.reset({
              type: 'RISQUE',
              probabilite: 1,
              impact: 1,
              beneficePotentiel: 1,
              statut: 'OUVERT'
            });
            this.redirectToROList();
          },
          error: (error) => console.error('Erreur', error)
        });
      }
    }
  }

  redirectToROList(): void {
    this.router.navigate(['/risques-opportunites']);
  }
}
