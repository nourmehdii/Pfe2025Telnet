import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from '../services/userservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: UserserviceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    let isLoggedIn = this.service.isLoggedIn();

    if (isLoggedIn) {
      this.router.navigate(['/home']);
    }
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  login(): void {
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      this.service.authenticate(data).subscribe(
        res => {
          console.log('Response from authentication service:', res);
          
          // Vérification de la présence de l'ID dans la réponse
          if (res.userId) { // Changement ici de res.id à res.userId
            const token = res.token;
            const userId = res.userId.toString(); // Assurez-vous que l'ID est une chaîne de caractères
  
            console.log('Token:', token);
            console.log('UserID:', userId);
  
            // Stockage du token et de l'ID de l'utilisateur dans le localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
  
            this.router.navigate(['/home']);
            Swal.fire('Success', 'Bienvenue ', 'success');
          } else {
            console.error('User ID not found in response:', res);
            Swal.fire('Error', 'User ID not found in response', 'error');
          }
        },
        err => {
          console.error('Error during login:', err);
          Swal.fire('Error', 'Server problem', 'error');
        }
      );
    } else {
      if (this.loginForm.get('email').invalid) {
        Swal.fire('Error', 'email ou mot de passe incorecte', 'error');
      } else {
        Swal.fire('Info', 'Remplissez tous les champs', 'info');
      }
    }
  }
  
  
}
