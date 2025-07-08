import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from '../services/userservice.service';
import { Cadran } from '../model/cadran.model';
import { ResultsPip } from '../model/ResultsPip.model';

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

  swotGroups: { list: Cadran[]; class: string }[] = [];

  attentesPip: ResultsPip[] = []; // Si utilisé

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cadranService: UserserviceService
  ) {}

  ngOnInit(): void {
    // this.step1Form = this.fb.group({
    //   cadransSources: [[], Validators.required],
    //   attentesPartiesPrenantes: [[], Validators.required],
    //   redigePar: ['', Validators.required],
    //   description: ['', Validators.required],
    //   poids: [null, Validators.required]
    // });

    this.step1Form = this.fb.group({
  cadransSources: [[]],
  attentesPartiesPrenantes: [[]],
  redigePar: [''],
  description: [''],
  poids: [null]
});


    this.loadCadrans();
    this.loadPipAttentes(); // Si nécessaire
  }

  loadCadrans(): void {
    this.cadranService.getCadranListByTypeS().subscribe(data => {
      this.forces = data;
      this.updateSwotGroups();
    });
    this.cadranService.getCadranListByTypeW().subscribe(data => {
      this.faiblesses = data;
      this.updateSwotGroups();
    });
    this.cadranService.getCadranListByTypeO().subscribe(data => {
      this.opportunites = data;
      this.updateSwotGroups();
    });
    this.cadranService.getCadranListByTypeT().subscribe(data => {
      this.menaces = data;
      this.updateSwotGroups();
    });
  }
  
loadPipAttentes(): void {
  this.cadranService.getResultsPipList().subscribe(data => {
    this.attentesPip = data;
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
    const selected: Cadran[] = this.step1Form.value.cadransSources || [];

    if (event.checked) {
      this.step1Form.patchValue({ cadransSources: [...selected, cadran] });
    } else {
      this.step1Form.patchValue({
        cadransSources: selected.filter(c => c.id !== cadran.id)
      });
    }
  }

 isSelected(cadran: Cadran): boolean {
  return (this.step1Form.value.cadransSources || []).some((c: Cadran) => c.id === cadran.id);
}

  submit(): void {
    if (this.step1Form.invalid) {
      console.warn('Formulaire invalide');
      return;
    }

    const payload = this.step1Form.value;
    console.log('✅ Payload prêt à être envoyé :', payload);

    // TODO: Appeler le vrai service HTTP ici
    this.redirectToEnjeuxStrategique();
  }

  redirectToEnjeuxStrategique(): void {
    this.router.navigate(['/enjeuxstrategique']);
  }
}
