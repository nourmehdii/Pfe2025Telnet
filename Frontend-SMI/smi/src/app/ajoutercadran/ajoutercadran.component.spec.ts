import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutercadranComponent } from './ajoutercadran.component';

describe('AjoutercadranComponent', () => {
  let component: AjoutercadranComponent;
  let fixture: ComponentFixture<AjoutercadranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutercadranComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutercadranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
