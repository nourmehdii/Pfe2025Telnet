import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionkpiComponent } from './evolutionkpi.component';

describe('EvolutionkpiComponent', () => {
  let component: EvolutionkpiComponent;
  let fixture: ComponentFixture<EvolutionkpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvolutionkpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvolutionkpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
