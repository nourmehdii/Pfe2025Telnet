import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoletComponent } from './volet.component';

describe('VoletComponent', () => {
  let component: VoletComponent;
  let fixture: ComponentFixture<VoletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
