import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterresultatkpiComponent } from './ajouterresultatkpi.component';

describe('AjouterresultatkpiComponent', () => {
  let component: AjouterresultatkpiComponent;
  let fixture: ComponentFixture<AjouterresultatkpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterresultatkpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterresultatkpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
