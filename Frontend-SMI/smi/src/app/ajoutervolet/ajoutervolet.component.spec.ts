import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutervoletComponent } from './ajoutervolet.component';

describe('AjoutervoletComponent', () => {
  let component: AjoutervoletComponent;
  let fixture: ComponentFixture<AjoutervoletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutervoletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutervoletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
