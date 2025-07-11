import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnjeuDetailModalComponent } from './enjeu-detail-modal.component';

describe('EnjeuDetailModalComponent', () => {
  let component: EnjeuDetailModalComponent;
  let fixture: ComponentFixture<EnjeuDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnjeuDetailModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnjeuDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
