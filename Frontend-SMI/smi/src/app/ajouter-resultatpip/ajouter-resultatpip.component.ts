import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pip } from '../model/Pip.model';
import { Processus } from '../model/Processus.model';
import { ResultsPip } from '../model/ResultsPip.model';
import { UserserviceService } from '../services/userservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajouter-resultatpip',
  templateUrl: './ajouter-resultatpip.component.html',
  styleUrls: ['./ajouter-resultatpip.component.css']
})
export class AjouterResultatpipComponent implements OnInit {
  resultsPipForm: FormGroup;
  pips: Pip[];
  processusList: Processus[];

  constructor(private fb: FormBuilder, private userService: UserserviceService) { }

  ngOnInit(): void {
    this.resultsPipForm = this.fb.group({
      expectation: ['', Validators.required],
      risk: ['', Validators.required],
      existantMonitoring: ['', Validators.required],
      setupMonitoring: ['', Validators.required],
      pip: [null, Validators.required],
      processus: [[]]
    });

    // Récupérer la liste des PIPs depuis le service
    this.userService.getPipList().subscribe(pips => {
      this.pips = pips;
      console.log('Liste des PIPs :', this.pips);
    });

    // Récupérer la liste des processus depuis le service
    this.userService.getProcessusList().subscribe(processus => {
      this.processusList = processus;
      console.log('Liste des processus :', this.processusList);
    });
  }

  onSubmit(): void {
    if (this.resultsPipForm.valid) {
      const formValue = this.resultsPipForm.value;
      const resultsPip = new ResultsPip(
        formValue.expectation,
        formValue.risk,
        formValue.existantMonitoring,
        formValue.setupMonitoring
      );
      resultsPip.pip = formValue.pip;
      resultsPip.processus = formValue.processus;

      // Récupérer l'ID du PIP à partir du formulaire ou d'où vous l'obtenez
      const pipId = resultsPip.pip.id;

      this.userService.createResultsPip(pipId, resultsPip).subscribe(
        response => {
          console.log('Résultat PIP soumis et ajouté avec succès:', response);
          Swal.fire('Succès', 'Résultat PIP ajouté avec succès', 'success');
          // Réinitialiser le formulaire ou effectuer d'autres actions si nécessaire
        },
        error => {
          console.error('Une erreur s\'est produite lors de l\'ajout du résultat PIP :', error);
          Swal.fire('Erreur', 'Une erreur s\'est produite lors de l\'ajout du résultat PIP', 'error');
          // Afficher des messages d'erreur ou des notifications si nécessaire
        }
      );
    } else {
      console.error('Le formulaire est invalide.');
      // Afficher des messages d'erreur ou des notifications si le formulaire est invalide
    }
  }
}
