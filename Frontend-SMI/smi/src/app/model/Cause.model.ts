import { Action } from "./Action.model";
import { Analyse } from "./analyse.model";


export class Cause {
    id: number;
    analyse: Analyse;
    nomCause: string;
    pourcentage: number;
    actions: Action[]; 

    constructor(
        analyse: Analyse,
        nomCause: string,
        pourcentage: number
    ) {
        this.analyse = analyse;
        this.nomCause = nomCause;
        this.pourcentage = pourcentage;
    }
}
