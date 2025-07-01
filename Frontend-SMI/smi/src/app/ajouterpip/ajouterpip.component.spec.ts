import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterpipComponent } from './ajouterpip.component';

describe('AjouterpipComponent', () => {
  let component: AjouterpipComponent;
  let fixture: ComponentFixture<AjouterpipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterpipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterpipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
