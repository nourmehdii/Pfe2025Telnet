import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterclientComponent } from './ajouterclient.component';

describe('AjouterclientComponent', () => {
  let component: AjouterclientComponent;
  let fixture: ComponentFixture<AjouterclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterclientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
