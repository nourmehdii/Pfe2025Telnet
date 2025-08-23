import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserserviceService } from '../services/userservice.service';
import { Cadran } from '../model/cadran.model';
import { ResultsPip } from '../model/ResultsPip.model';
import { EnjeuxService } from '../services/enjeux.service';
import { Enjeu } from '../model/Enjeu.model';
import Swal from 'sweetalert2';
import { GeminiService } from '../services/gemini.service';



@Component({
  selector: 'app-ajouterenjeux',
  templateUrl: './ajouterenjeux.component.html',
  styleUrls: ['./ajouterenjeux.component.css']
})
export class AjouterenjeuxComponent implements OnInit {
  mode: 'create' | 'edit' = 'create';

  enjeuIdToEdit!: number;
  commentaire: string = '';

  step1Form!: FormGroup;
  step2Form!: FormGroup;

  forces: Cadran[] = [];
  faiblesses: Cadran[] = [];
  opportunites: Cadran[] = [];
  menaces: Cadran[] = [];

  attentesPip: ResultsPip[] = [];
  allCadrans: Cadran[] = [];
  allAttentes: ResultsPip[] = [];

  swotGroups: { list: Cadran[]; class: string }[] = [];
  attentesAffichees: any;

 formGroup!: FormGroup;

 userPrompt: string = '';   // Ajout variable pour prompt IA
aiResponse: string = '';   // Ajout variable pour réponse IA

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cadranService: UserserviceService,
    private enjeuxService: EnjeuxService,
    private geminiService: GeminiService

  ) {}

 ngOnInit(): void {
  const preloadEnjeu = history.state.enjeuPreload;

  this.step1Form = this.fb.group({
    cadransSources: [[]],
    attentesPartiesPrenantes: [[]],
    redigePar: ['']
  });

  this.step2Form = this.fb.group({
    description: [''],
    poids: [''],
    commentaire: [''] // ajout du commentaire ici

  });

  this.route.paramMap.subscribe(params => {
  const id = params.get('id');
  if (id) {
    this.mode = 'edit';
    this.enjeuIdToEdit = +id;

    this.loadCadransAndAttentesThen(() => {
      // Priorité à l'objet déjà disponible en local
      if (history.state.enjeuPreload) {
        this.loadEnjeuFromPreload(history.state.enjeuPreload);
      } else {
        this.loadEnjeuForEdit(this.enjeuIdToEdit);
      }
    });
  } else {
    this.mode = 'create';
    this.loadCadransAndAttentesThen();
  }
});

}

loadEnjeuFromPreload(enjeu: Enjeu): void {
  this.step1Form.patchValue({
    cadransSources: this.mapIdsToObjects(enjeu.cadransSources, this.allCadrans),
    attentesPartiesPrenantes: this.mapIdsToObjects(enjeu.attentesPartiesPrenantes, this.allAttentes),
    redigePar: enjeu.creePar
  });

  this.step2Form.patchValue({
    description: enjeu.description,
    poids: enjeu.poids
  });
}


  loadCadransAndAttentesThen(callback?: () => void): void {
    this.cadranService.getAllCadrans().subscribe(data => {
      this.allCadrans = data;
      this.forces = data.filter(c => c.type === 'STRENGTH');
      this.faiblesses = data.filter(c => c.type === 'WEAKNESS');
      this.opportunites = data.filter(c => c.type === 'OPPORTUNITY');
      this.menaces = data.filter(c => c.type === 'THREAT');
      this.updateSwotGroups();

      this.cadranService.getResultsPipList().subscribe(attentes => {
        this.attentesPip = attentes;
        this.allAttentes = attentes;
        if (callback) callback();
      });
    });
  }

  loadEnjeuForEdit(id: number): void {
   this.enjeuxService.getEnjeuById(id).subscribe(enjeu => {
  this.step1Form.patchValue({
    cadransSources: this.mapIdsToObjects(enjeu.cadransSources, this.allCadrans),
    attentesPartiesPrenantes: this.mapIdsToObjects(enjeu.attentesPartiesPrenantes, this.allAttentes),
    redigePar: enjeu.creePar
  });

  this.step2Form.patchValue({
    description: enjeu.description,
    poids: enjeu.poids
  });
});

  }

  mapIdsToObjects(ids: number[], fullList: any[]): any[] {
    return fullList.filter(obj => ids.includes(obj.id));
  }

  updateSwotGroups(): void {
    this.swotGroups = [
      { list: this.forces, class: 'force' },
      { list: this.faiblesses, class: 'faiblesse' },
      { list: this.opportunites, class: 'opportunite' },
      { list: this.menaces, class: 'menace' }
    ];
  }

  onToggleCadran(event: any, cadran: Cadran): void {
    const isChecked = event.target.checked;
    const selected: Cadran[] = this.step1Form.value.cadransSources || [];

    if (isChecked) {
      if (!selected.find(c => c.id === cadran.id)) {
        this.step1Form.patchValue({ cadransSources: [...selected, cadran] });
      }
    } else {
      this.step1Form.patchValue({
        cadransSources: selected.filter(c => c.id !== cadran.id)
      });
    }
  }

  isSelected(cadran: Cadran): boolean {
  return (this.step1Form.value.cadransSources || []).some(
    (c: Cadran) => c.id === cadran.id
  );
}



  submit(): void {
  if (this.step1Form.invalid || this.step2Form.invalid) return;
  this.commentaire = this.step2Form.value.commentaire; 
  const payload: Enjeu = {
    cadransSources: this.step1Form.value.cadransSources.map((c: Cadran) => c.id),
    attentesPartiesPrenantes: this.step1Form.value.attentesPartiesPrenantes.map((a: ResultsPip) => a.id),
    description: this.step2Form.value.description,
    poids: this.step2Form.value.poids,
    creePar: this.step1Form.value.redigePar
  };

 if (this.mode === 'edit') {
  console.log(localStorage.getItem('role'));
    console.log(payload);
    console.log(this.commentaire); 
  this.enjeuxService.updateEnjeu(this.enjeuIdToEdit, payload, this.commentaire).subscribe(() => {
    Swal.fire({ icon: 'success', title: 'Mis à jour avec succès' });
    if (localStorage.getItem('role')=='ADMIN')
      { this.router.navigate(['/admin/enjeux']); }
    else { this.router.navigate(['/enjeuxstrategique']);}
    
  });


  } else {
    console.log(payload);
    this.enjeuxService.addEnjeu(payload).subscribe(() => {
    console.log(localStorage.getItem('role'));
    console.log(payload);
    console.log(this.commentaire); 
      Swal.fire({ icon: 'success', title: 'Ajouté avec succès' });
      this.router.navigate(['/enjeuxstrategique']);
    });
  }
}

 redirectToEnjeuxStrategique(): void {
    this.router.navigate(['/enjeuxstrategique']);
    
  }

 openIASupport(): void {
  if (!this.userPrompt || this.userPrompt.trim() === '') {
    Swal.fire({ icon: 'warning', title: 'Veuillez entrer une question' });
    return;
  }

  this.aiResponse = 'Chargement...';

  this.geminiService.askGemini(this.userPrompt).subscribe({
    next: (response) => {
      this.aiResponse = response;
      console.log('Réponse IA:', response);
    },
    error: (err) => {
      this.aiResponse = 'Erreur lors de la récupération de la réponse.';
      console.error(err);
      Swal.fire({ icon: 'error', title: 'Erreur lors de la requête AI' });
    }
  });
}


}
 



