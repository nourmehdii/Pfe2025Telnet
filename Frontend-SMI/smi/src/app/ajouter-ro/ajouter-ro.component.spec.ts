import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterRoComponent } from './ajouter-ro.component';

describe('AjouterRoComponent', () => {
  let component: AjouterRoComponent;
  let fixture: ComponentFixture<AjouterRoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterRoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterRoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
