import { EType } from "./EType.model";
import { Cadran } from "./cadran.model";


export interface Volet {
    id?: number;
    name: string;
    axe: EAxe; // Assurez-vous que le type est bien EAxe
    type?: EType; 
    cadrans?: Cadran[]; 
  
   
}

export enum EAxe {
    INTERNE = 'INTERNE',
    EXTERNE = 'EXTERNE'
}
