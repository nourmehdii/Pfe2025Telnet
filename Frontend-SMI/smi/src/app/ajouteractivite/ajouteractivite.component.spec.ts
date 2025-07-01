import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouteractiviteComponent } from './ajouteractivite.component';

describe('AjouteractiviteComponent', () => {
  let component: AjouteractiviteComponent;
  let fixture: ComponentFixture<AjouteractiviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouteractiviteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouteractiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
