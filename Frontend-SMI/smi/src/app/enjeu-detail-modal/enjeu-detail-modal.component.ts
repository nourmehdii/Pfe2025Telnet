import { Component, OnInit , Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-enjeu-detail-modal',
  templateUrl: './enjeu-detail-modal.component.html',
  styleUrls: ['./enjeu-detail-modal.component.css']
})
export class EnjeuDetailModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EnjeuDetailModalComponent>
  ) {}

  close(): void {
    this.dialogRef.close();
  }

}
