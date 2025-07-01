import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProcessDialogComponentComponent } from './add-process-dialog-component.component';

describe('AddProcessDialogComponentComponent', () => {
  let component: AddProcessDialogComponentComponent;
  let fixture: ComponentFixture<AddProcessDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProcessDialogComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProcessDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
