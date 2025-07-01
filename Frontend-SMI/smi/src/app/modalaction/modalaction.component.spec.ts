import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalactionComponent } from './modalaction.component';

describe('ModalactionComponent', () => {
  let component: ModalactionComponent;
  let fixture: ComponentFixture<ModalactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
