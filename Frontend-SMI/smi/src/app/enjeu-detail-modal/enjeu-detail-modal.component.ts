import { Component, OnInit , Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EnjeuxService } from '../services/enjeux.service';
import { EnjeuHistory } from '../model/EnjeuHistory';

@Component({
  selector: 'app-enjeu-detail-modal',
  templateUrl: './enjeu-detail-modal.component.html',
  styleUrls: ['./enjeu-detail-modal.component.css']
})
export class EnjeuDetailModalComponent implements OnInit {

  historique: EnjeuHistory[] = [];
  errorMsg = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EnjeuDetailModalComponent>,
    private enjeuxService: EnjeuxService

  ) {}

    ngOnInit(): void {
    if (this.data?.id) {
      this.enjeuxService.getHistoryByEnjeuId(this.data.id).subscribe({
        next: (res) => this.historique = res,
        error: () => this.errorMsg = 'Erreur lors du chargement de l’historique.'
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }

}
