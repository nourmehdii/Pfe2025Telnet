import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatriceswotComponent } from './matriceswot.component';

describe('MatriceswotComponent', () => {
  let component: MatriceswotComponent;
  let fixture: ComponentFixture<MatriceswotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatriceswotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatriceswotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
