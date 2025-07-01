import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadranModalComponent } from './cadran-modal.component';

describe('CadranModalComponent', () => {
  let component: CadranModalComponent;
  let fixture: ComponentFixture<CadranModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadranModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadranModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
