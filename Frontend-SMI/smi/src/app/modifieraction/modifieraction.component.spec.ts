import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifieractionComponent } from './modifieraction.component';

describe('ModifieractionComponent', () => {
  let component: ModifieractionComponent;
  let fixture: ComponentFixture<ModifieractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifieractionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifieractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
