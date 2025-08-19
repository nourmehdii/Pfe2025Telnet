import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Cadran } from '../model/cadran.model';
import { UserserviceService } from '../services/userservice.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Processus } from '../model/Processus.model';

@Component({
  selector: 'app-modifiercadran',
  templateUrl: './modifiercadran.component.html',
  styleUrls: ['./modifiercadran.component.css'],

})
export class ModifiercadranComponent implements OnInit {
  cadranForm!: FormGroup;
  private voletId!: number;
  processusList: Processus[];

  @Output() cadranUpdated = new EventEmitter<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { cadranId: number },
    private cadranService: UserserviceService,
    private dialogRef: MatDialogRef<ModifiercadranComponent>,
    private fb: FormBuilder,
    private userService: UserserviceService
  ) {}

  ngOnInit(): void {
    this.cadranService.getCadranById(this.data.cadranId).subscribe({
      next: (response) => {
        // Stocke voletId séparément
        this.voletId = response.volet?.id;

  // Récupérer la liste des processus depuis le service
    this.userService.getProcessusList().subscribe(processus => {
      this.processusList = processus;
      console.log('Liste des processus :', this.processusList);
    });

        // Initialise le formulaire avec les données reçues
        this.cadranForm = this.fb.group({
          name: [response.name, Validators.required],
          type: [response.type, Validators.required],
          // secteur: [response.secteur, Validators.required],
          // contexte: [response.contexte],
          processus: [response.processus],
          origineInfo: [response.origineInfo],
          creePar: [response.creePar],
          dateCreation: [response.dateCreation]
        });
      },
      error: (error) => {
        console.error('Erreur lors du chargement du cadran:', error);
      }
    });
  }

  updateCadran(): void {
    if (this.cadranForm.invalid) return;

    const updatedPayload = {
      ...this.cadranForm.value,
      voletId: this.voletId // 👈 transmis mais invisible
    };

    this.cadranService.updateCadran(this.data.cadranId, updatedPayload).subscribe({
      next: () => {
        this.cadranUpdated.emit();
        this.dialogRef.close();
      },
      error: (error) => {
        console.log(updatedPayload);
        console.error('Erreur lors de la mise à jour du cadran:', error);
      }
    });
  }
}
