import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierprojectComponent } from './modifierproject.component';

describe('ModifierprojectComponent', () => {
  let component: ModifierprojectComponent;
  let fixture: ComponentFixture<ModifierprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierprojectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
