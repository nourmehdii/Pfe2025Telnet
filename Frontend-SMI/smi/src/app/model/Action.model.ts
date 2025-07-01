import { Cause } from "./Cause.model";
import { TypeAction } from "./TypeAction.model";

export class Action {
    id?: number;
    typeAction: TypeAction; // Utiliser l'enum TypeAction
    responsable: string;
    datePlanification: Date;
    dateRealisation: Date;
    critereEfficacite: string;
    efficace: boolean;
    commentaire: string;
    cause?: Cause;
    action?: string;
  
    constructor(
      typeAction: TypeAction, // Utiliser l'enum TypeAction
      responsable: string,
      datePlanification: Date,
      dateRealisation: Date,
      critereEfficacite: string,
      efficace: boolean,
      commentaire: string,
      cause?: Cause,
      action?:string,
    ) {
      this.typeAction = typeAction;
      this.responsable = responsable;
      this.datePlanification = datePlanification;
      this.dateRealisation = dateRealisation;
      this.critereEfficacite = critereEfficacite;
      this.efficace = efficace;
      this.commentaire = commentaire;
      this.cause = cause;
      this.action=action
    }
}
