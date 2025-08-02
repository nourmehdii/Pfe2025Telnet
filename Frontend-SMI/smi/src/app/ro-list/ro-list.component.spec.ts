import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyseRoListComponent } from './ro-list.component';

describe('AnalyseRoListComponent', () => {
  let component: AnalyseRoListComponent;
  let fixture: ComponentFixture<AnalyseRoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyseRoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyseRoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
