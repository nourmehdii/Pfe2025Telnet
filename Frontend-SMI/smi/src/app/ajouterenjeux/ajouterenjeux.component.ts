import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, /*Validators*/ } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from '../services/userservice.service';
import { Cadran } from '../model/cadran.model';
import { ResultsPip } from '../model/ResultsPip.model';
import { EnjeuxService } from '../services/enjeux.service';
import { Enjeu } from '../model/Enjeu.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ajouterenjeux',
  templateUrl: './ajouterenjeux.component.html',
  styleUrls: ['./ajouterenjeux.component.css']
})
export class AjouterenjeuxComponent implements OnInit {
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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cadranService: UserserviceService,
    private enjeuxService: EnjeuxService
  ) {}

  ngOnInit(): void {
    this.step1Form = this.fb.group({
      cadransSources: [[]],
      attentesPartiesPrenantes: [[]],
      redigePar: ['', /*Validators.required*/]
    });

    this.step2Form = this.fb.group({
      description: ['', /*Validators.required*/],
      poids: ['', /*Validators.required*/]
    });

    this.loadCadrans();
    this.loadPipAttentes();
  }

  loadCadrans(): void {
    this.cadranService.getAllCadrans().subscribe(data => {
      this.allCadrans = data;
      this.forces = data.filter(c => c.type === 'STRENGTH');
      this.faiblesses = data.filter(c => c.type === 'WEAKNESS');
      this.opportunites = data.filter(c => c.type === 'OPPORTUNITY');
      this.menaces = data.filter(c => c.type === 'THREAT');
      this.updateSwotGroups();
    });
  }

  loadPipAttentes(): void {
    this.cadranService.getResultsPipList().subscribe(data => {
      this.attentesPip = data;
      this.allAttentes = data;
    });
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

  console.log("🟨 Cadrans sélectionnés (temporaire) :", this.step1Form.value.cadransSources);
}


  isSelected(cadran: Cadran): boolean {
    return (this.step1Form.value.cadransSources || []).some(
      (c: Cadran) => c.id === cadran.id
    );
  }

  /** ✅ Mapping pour l'étape 3 (revue) **/
  getCadranInfos(cadranObjs: Cadran[]): string {
    return cadranObjs
      .map(c => `${c.name} (${c.type})`)
      .join(', ');
  }

  getAttentesText(attenteObjs: ResultsPip[]): string {
    return attenteObjs
      .map(a => a.expectation)
      .join(', ');
  }

  submit(): void {
    if (this.step1Form.invalid || this.step2Form.invalid) {
      console.warn('⛔ Formulaire invalide');
      return;
    }

    const formValue1 = this.step1Form.value;
    const formValue2 = this.step2Form.value;

  

    const payload: Enjeu = {
      cadransSources: formValue1.cadransSources.map((c: Cadran) => c.id),
      attentesPartiesPrenantes: formValue1.attentesPartiesPrenantes.map((a: ResultsPip) => a.id),
      description: formValue2.description,
      poids: formValue2.poids,
      creePar: formValue1.redigePar
    };

    console.log("📤 Envoi du payload :", payload);

    this.enjeuxService.addEnjeu(payload).subscribe({
      next: () => {
        console.log("✅ Enjeu ajouté avec succès !");

        Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'L\'enjeu stratégique a été ajouté avec succès'
      }).then(() => {
        this.router.navigate(['/enjeuxstrategique']);
      });

        this.router.navigate(['/enjeuxstrategique']);
      },
      error: err => {
        console.error("❌ Erreur lors de l'ajout :", err);

         Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue lors de l\'ajout de l\'enjeu stratégique'
      });

      }
    });
  }

  redirectToEnjeuxStrategique(): void {
    this.router.navigate(['/enjeuxstrategique']);
  }

    openIASupport(): void {
    console.log("HELLO IA")
  }
  //a modifier 
  
}
