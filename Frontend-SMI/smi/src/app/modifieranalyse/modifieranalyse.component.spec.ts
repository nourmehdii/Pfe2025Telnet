import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifieranalyseComponent } from './modifieranalyse.component';

describe('ModifieranalyseComponent', () => {
  let component: ModifieranalyseComponent;
  let fixture: ComponentFixture<ModifieranalyseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifieranalyseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifieranalyseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
