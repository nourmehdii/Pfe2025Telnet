import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifieractiviteComponent } from './modifieractivite.component';

describe('ModifieractiviteComponent', () => {
  let component: ModifieractiviteComponent;
  let fixture: ComponentFixture<ModifieractiviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifieractiviteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifieractiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
