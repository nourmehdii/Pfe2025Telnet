import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierresultatpipComponent } from './modifierresultatpip.component';

describe('ModifierresultatpipComponent', () => {
  let component: ModifierresultatpipComponent;
  let fixture: ComponentFixture<ModifierresultatpipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierresultatpipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierresultatpipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
