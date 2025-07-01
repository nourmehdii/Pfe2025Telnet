import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterkpihistoryComponent } from './ajouterkpihistory.component';

describe('AjouterkpihistoryComponent', () => {
  let component: AjouterkpihistoryComponent;
  let fixture: ComponentFixture<AjouterkpihistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterkpihistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterkpihistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
