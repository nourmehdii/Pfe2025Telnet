import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from '../model/Client.model';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  client: Client;

  constructor(
    private dialogRef: MatDialogRef<ClientDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.client = data.clientDetails;
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }



  closeModal(): void {
    this.dialogRef.close();
  }

  printPdf(): void {
    const content = document.getElementById('client-details-content');
    if (content) {
      // Masquer tous les boutons avant la capture
      const buttons = document.querySelectorAll('button');
      buttons.forEach(button => button.setAttribute('style', 'display: none'));
  
      html2canvas(content).then(canvas => {
        const imgWidth = 180; // Largeur réduite pour minimiser la taille de la fiche
        const pageHeight = 295; // Hauteur de la page A4 en mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
  
        // Ajouter le logo en haut au centre de la page
        const logo = 'assets/images/LogoTelnet.png';
        const logoImg = new Image();
        logoImg.src = logo;
  
        logoImg.onload = () => {
          // Centrer le logo sur la page
          const logoWidth = 60; // Largeur du logo
          const logoHeight = 20; // Hauteur du logo
          const logoX = (pdf.internal.pageSize.width - logoWidth) / 2;
          pdf.addImage(logoImg, 'PNG', logoX, 10, logoWidth, logoHeight); // Position et taille du logo
  
          // Ajouter un encadré autour des détails du client
          const margin = 10; // Marge autour de la fiche
          const contentWidth = imgWidth + 2 * margin; // Largeur totale avec bordure
          const contentHeight = imgHeight + 2 * margin; // Hauteur totale avec bordure
  
          pdf.setDrawColor(0, 0, 0); // Couleur de la bordure (noir)
          pdf.setLineWidth(0.5); // Épaisseur de la bordure
  
          // Ajouter la fiche en dessous du logo
          const position = 30 + logoHeight + margin;
          pdf.addImage(imgData, 'PNG', margin + 10, position + 10, imgWidth, imgHeight);
  
          
  
          pdf.save('client-details.pdf');
  
          // Restaurer les boutons après la capture
          buttons.forEach(button => button.setAttribute('style', 'display: block'));
        };
      });
    }
  }
  
  
  
}
