import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierresultkpiComponent } from './modifierresultkpi.component';

describe('ModifierresultkpiComponent', () => {
  let component: ModifierresultkpiComponent;
  let fixture: ComponentFixture<ModifierresultkpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierresultkpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierresultkpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
