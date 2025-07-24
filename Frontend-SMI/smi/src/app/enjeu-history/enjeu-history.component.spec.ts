import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnjeuHistoryComponent } from './enjeu-history.component';

describe('EnjeuHistoryComponent', () => {
  let component: EnjeuHistoryComponent;
  let fixture: ComponentFixture<EnjeuHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnjeuHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnjeuHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
