import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalcausesComponent } from './modalcauses.component';

describe('ModalcausesComponent', () => {
  let component: ModalcausesComponent;
  let fixture: ComponentFixture<ModalcausesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalcausesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalcausesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
