import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyseforkpiComponent } from './analyseforkpi.component';

describe('AnalyseforkpiComponent', () => {
  let component: AnalyseforkpiComponent;
  let fixture: ComponentFixture<AnalyseforkpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyseforkpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyseforkpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
