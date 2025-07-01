import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysecausaleComponent } from './analysecausale.component';

describe('AnalysecausaleComponent', () => {
  let component: AnalysecausaleComponent;
  let fixture: ComponentFixture<AnalysecausaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalysecausaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysecausaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
