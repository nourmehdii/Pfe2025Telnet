import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatpipComponent } from './resultatpip.component';

describe('ResultatpipComponent', () => {
  let component: ResultatpipComponent;
  let fixture: ComponentFixture<ResultatpipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultatpipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultatpipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
