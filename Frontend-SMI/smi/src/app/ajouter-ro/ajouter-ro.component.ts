import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EnjeuxService } from '../services/enjeux.service';
import { RisqueService } from '../services/risque.service';
import { OpportuniteService } from '../services/opportunite.service';
import { Enjeu } from '../model/Enjeu.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

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
        categorie: value.categorie,
        planAction: value.planAction,
        statut: value.statut,
        severite: value.severite
      };

     if (this.mode === 'edit' && this.risqueIdToEdit) {
  this.risqueService.updateRisque(this.risqueIdToEdit, risque).subscribe({
    next: () => {
      Swal.fire({
        icon: 'success',
        title: 'Mis à jour avec succès'
      });
      this.redirectToROList();
    },
    error: (error) => console.error('Erreur', error)
  });
}

      else {
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
    next: () => {
      Swal.fire({
        icon: 'success',
        title: 'Mis à jour avec succès'
      });
      this.redirectToROList();
    },
    error: (error) => console.error('Erreur', error)
  });
}
 
      else {
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

  getSeveriteMessage(probabilite: number, gravite: number): string {
  // Traite les cas exceptionnels en priorité
  if (probabilite === 4 && gravite === 1) {
    return "La gravité est moyenne, un plan d'action est recommandé.";
  } else if (probabilite === 2 && gravite === 2) {
    return "La gravité est moyenne, un plan d'action est recommandé.";
  }
  // Puis les autres cas un par un pour correspondre à la matrice (Gravité vertical 1-4, Probabilité horizontal 1-3)
  if (gravite === 1) {
    return "Le risque est faible, un plan d'action n'est pas nécessaire.";
  } else if (gravite === 2) {
    if (probabilite <= 2) {
      return "Le risque est faible, un plan d'action n'est pas nécessaire.";
    } else { // probabilite = 3 (ou 4 si extension)
      return "La gravité est moyenne, un plan d'action est recommandé.";
    }
  } else if (gravite === 3) {
    if (probabilite === 1) {
      return "Le risque est faible, un plan d'action n'est pas nécessaire.";
    } else if (probabilite === 2) {
      return "La gravité est moyenne, un plan d'action est recommandé.";
    } else { // probabilite = 3 (ou 4)
      return "La gravité est importante et la probabilité est assez forte, un plan d'action est nécessaire.";
    }
  } else if (gravite === 4) {
    if (probabilite === 1) {
      return "La gravité est moyenne, un plan d'action est recommandé.";
    } else { // probabilite >= 2
      return "La gravité est importante et la probabilité est assez forte, un plan d'action est nécessaire.";
    }
  } else {
    return "Valeurs invalides.";
  }
}

getSeveriteClass(probabilite: number, gravite: number): string {
  // Traite les cas exceptionnels en priorité
  if (probabilite === 4 && gravite === 1) {
    return "bg-warning text-dark"; // jaune
  } else if (probabilite === 2 && gravite === 2) {
    return "bg-warning text-dark"; // jaune
  }
  // Puis les autres cas un par un pour matcher les couleurs exactes
  if (gravite === 1) {
    return "bg-success text-white"; // vert
  } else if (gravite === 2) {
    if (probabilite <= 2) {
      return "bg-success text-white"; // vert
    } else {
      return "bg-warning text-dark"; // jaune
    }
  } else if (gravite === 3) {
    if (probabilite === 1) {
      return "bg-success text-white"; // vert
    } else if (probabilite === 2) {
      return "bg-warning text-dark"; // jaune
    } else {
      return "bg-danger text-white"; // rouge
    }
  } else if (gravite === 4) {
    if (probabilite === 1) {
      return "bg-warning text-dark"; // jaune
    } else {
      return "bg-danger text-white"; // rouge
    }
  } else {
    return "bg-light"; // default
  }
}

  redirectToROList(): void {
    this.router.navigate(['/risques-opportunites']);
  }
}
