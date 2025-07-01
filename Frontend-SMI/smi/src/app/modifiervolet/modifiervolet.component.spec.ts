import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiervoletComponent } from './modifiervolet.component';

describe('ModifiervoletComponent', () => {
  let component: ModifiervoletComponent;
  let fixture: ComponentFixture<ModifiervoletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifiervoletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifiervoletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
