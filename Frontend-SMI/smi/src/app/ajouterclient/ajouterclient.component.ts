import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserserviceService } from '../services/userservice.service';
import { Client } from '../model/Client.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajouterclient',
  templateUrl: './ajouterclient.component.html',
  styleUrls: ['./ajouterclient.component.css']
})
export class AjouterclientComponent implements OnInit {

  clientForm: FormGroup;

  constructor(private clientService: UserserviceService, private fb: FormBuilder) {
    this.clientForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      active: [false],
      email: ['', [Validators.email]],
      streetAddress: [''],
      city: [''],
      state: [''],
      country: ['']
    });
  }

  ngOnInit(): void { }

  ajouterClient(): void {
    if (this.clientForm.invalid) {
      Swal.fire('Erreur !', 'Veuillez vérifier les champs du formulaire', 'error');
      return;
    }

    const newClient: Client = this.clientForm.value;

    this.clientService.addClient(newClient).subscribe(
      (response) => {
        Swal.fire('Succès !', 'Client ajouté avec succès', 'success').then(() => {
          // Réinitialisez le formulaire avec les valeurs par défaut
          this.clientForm.reset({
            name: '',
            phone: '',
            active: false,
            email: '',
            streetAddress: '',
            city: '',
            state: '',
            country: ''
          });
        });
      },
      (error) => {
        Swal.fire('Erreur !', `Une erreur est survenue lors de l'ajout du client : ${error.message}`, 'error');
        console.error('Erreur lors de l\'ajout du client : ', error);
      }
    );
  }
}
