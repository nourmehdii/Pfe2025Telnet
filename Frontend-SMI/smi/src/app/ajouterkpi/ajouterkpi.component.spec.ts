import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterkpiComponent } from './ajouterkpi.component';

describe('AjouterkpiComponent', () => {
  let component: AjouterkpiComponent;
  let fixture: ComponentFixture<AjouterkpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterkpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterkpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
