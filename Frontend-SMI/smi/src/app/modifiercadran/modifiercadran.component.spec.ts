import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiercadranComponent } from './modifiercadran.component';

describe('ModifiercadranComponent', () => {
  let component: ModifiercadranComponent;
  let fixture: ComponentFixture<ModifiercadranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifiercadranComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifiercadranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
