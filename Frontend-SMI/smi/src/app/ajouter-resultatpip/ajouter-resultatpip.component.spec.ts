import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterResultatpipComponent } from './ajouter-resultatpip.component';

describe('AjouterResultatpipComponent', () => {
  let component: AjouterResultatpipComponent;
  let fixture: ComponentFixture<AjouterResultatpipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterResultatpipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterResultatpipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
