import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResultsPip } from '../model/ResultsPip.model';
import { UserserviceService } from '../services/userservice.service';
import { Pip } from '../model/Pip.model';
import { Processus } from '../model/Processus.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifierresultatpip',
  templateUrl: './modifierresultatpip.component.html',
  styleUrls: ['./modifierresultatpip.component.css']
})
export class ModifierresultatpipComponent implements OnInit {
  @Output() pipresultatUpdated: EventEmitter<any> = new EventEmitter();
  resultsPip: ResultsPip;
  pipId: number;
  resultsPipId: number;
  pip: Pip;
  processus: Processus[];
  selectedPipId: number;
  selectedProcessusIds: number[] = [];
  pips: Pip[] = []; 
  pipLabel: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any, 
    private userService: UserserviceService
  ) { }

  ngOnInit(): void {
    this.pipId = this.data.pipresulatId;
    this.initializeResultsPip(this.pipId);
    this.loadPips(); 
    this.pipLabel = this.data.pipLabel;
  }

  initializeResultsPip(pipresultatId: number): void {
    this.userService.getResultsPipById(pipresultatId).subscribe(
      (resultsPip: ResultsPip) => {
        this.resultsPip = resultsPip;
        this.resultsPipId = resultsPip.id;

        // Récupérer le Pip lié au résultat Pip
        this.userService.getPipById(resultsPip.pip.id).subscribe(
          (pip: Pip) => {
            this.pip = pip;
            this.selectedPipId = pip.id; // Définir le Pip sélectionné
          },
          (error) => {
            console.error('Une erreur s\'est produite lors de la récupération du Pip :', error);
          }
        );

        this.userService.getProcessusList().subscribe(
          (processus: Processus[]) => {
            this.processus = processus;
            // Récupérer les IDs des Processus liés au résultat Pip
            this.selectedProcessusIds = resultsPip.processus.map(processus => processus.id);
          },
          (error) => {
            console.error('Une erreur s\'est produite lors de la récupération des Processus :', error);
          }
        );
        
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des détails du résultat PIP :', error);
      }
    );
  }

  updateResultsPip(): void {
    // Afficher une fenêtre modale de confirmation avant de mettre à jour le résultat PIP
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir mettre à jour le résultat ' + this.pipLabel + ' ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, mettre à jour',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // Récupérer le Pip sélectionné à partir de la liste des Pips disponibles
        const selectedPip = this.pips.find(pip => pip.id === this.selectedPipId);
  
        if (!selectedPip) {
          console.error('Pip sélectionné introuvable');
          return;
        }
  
        // Mettre à jour les détails du résultat PIP avec les valeurs sélectionnées
        this.resultsPip.pip = selectedPip;
        this.resultsPip.processus = this.selectedProcessusIds.map(id => ({ id } as Processus));
  
        // Mettre à jour le résultat PIP
        this.userService.updateResultsPip(this.resultsPipId, selectedPip.id, this.resultsPip).subscribe(
          (updatedResultsPip: ResultsPip) => {
            console.log('Résultat ' + this.pipLabel + ' mis à jour avec succès :', updatedResultsPip);
            this.pipresultatUpdated.emit();
            // Fermer automatiquement la fenêtre modale après la mise à jour réussie
            Swal.fire('Succès', 'Le résultat ' + this.pipLabel + ' a été mis à jour avec succès.', 'success');
          },
          (error) => {
            console.error('Une erreur s\'est produite lors de la mise à jour du résultat ' + this.pipLabel + ' :', error);
            Swal.fire('Erreur', 'Une erreur s\'est produite lors de la mise à jour du résultat ' + this.pipLabel + '.', 'error');
          }
        );
      }
    });
  }
  
  loadPips(): void {
    this.userService.getPipList().subscribe(
      (pips: Pip[]) => {
        this.pips = pips;
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des PIP :', error);
      }
    );
  }

  onPipSelectionChange(): void {
    // Récupérer le Pip sélectionné à partir de la liste des Pips disponibles
    const selectedPip = this.pips.find(pip => pip.id === this.selectedPipId);

    if (!selectedPip) {
      console.error('Pip sélectionné introuvable');
      return;
    }

    // Assigner le Pip sélectionné à this.pip
    this.pip = selectedPip;
  }
}
