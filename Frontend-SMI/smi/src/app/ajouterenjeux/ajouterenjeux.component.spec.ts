import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterenjeuxComponent } from './ajouterenjeux.component';

describe('AjouterenjeuxComponent', () => {
  let component: AjouterenjeuxComponent;
  let fixture: ComponentFixture<AjouterenjeuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterenjeuxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterenjeuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
