import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipsModalComponentComponent } from './pips-modal-component.component';

describe('PipsModalComponentComponent', () => {
  let component: PipsModalComponentComponent;
  let fixture: ComponentFixture<PipsModalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipsModalComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipsModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
