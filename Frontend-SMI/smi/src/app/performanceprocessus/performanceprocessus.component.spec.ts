import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceprocessusComponent } from './performanceprocessus.component';

describe('PerformanceprocessusComponent', () => {
  let component: PerformanceprocessusComponent;
  let fixture: ComponentFixture<PerformanceprocessusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceprocessusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceprocessusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
