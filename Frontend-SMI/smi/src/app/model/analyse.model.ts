import { Cause } from "./Cause.model";
import { Project } from "./Project.model";

export enum TypeProbleme {
    INTERNE = 'INTERNE',
    EXTERNE = 'EXTERNE'
}

export class Analyse {
    id: number;
    project: Project;
    typeProbleme: TypeProbleme; // Ajout de la propriété typeProbleme
    identificationProbleme: string; 
    methodeUtilisee: string;
    date: Date;
    causes: Cause[]; // Ajout de la liste des causes

    constructor(
        project: Project,
        typeProbleme: TypeProbleme,
        identificationProbleme: string, 
        methodeUtilisee: string,
        date: Date,
        causes: Cause[] // Ajout du paramètre causes dans le constructeur
    ) {
        this.project = project;
        this.typeProbleme = typeProbleme;
        this.identificationProbleme = identificationProbleme;
        this.methodeUtilisee = methodeUtilisee;
        this.date = date;
        this.causes = causes; // Affectation des causes passées en paramètre
    }
}
