import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanifieractionComponent } from './planifieraction.component';

describe('PlanifieractionComponent', () => {
  let component: PlanifieractionComponent;
  let fixture: ComponentFixture<PlanifieractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanifieractionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanifieractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
