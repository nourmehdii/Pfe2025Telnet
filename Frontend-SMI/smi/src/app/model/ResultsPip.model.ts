import { Pip } from './Pip.model';
import { Processus } from './Processus.model';

export class ResultsPip {
  id: number;
  expectation: string;
  risk: string;
  existantMonitoring: string;
  setupMonitoring: string;
  pip: Pip;
  processus: Processus[];

  constructor(
    expectation: string,
    risk: string,
    existantMonitoring: string,
    setupMonitoring: string,
    processus: Processus[] = []  // Ajoutez le paramètre processus ici
  ) {
    this.expectation = expectation;
    this.risk = risk;
    this.existantMonitoring = existantMonitoring;
    this.setupMonitoring = setupMonitoring;
    this.processus = processus; // Et ici
  }
}
