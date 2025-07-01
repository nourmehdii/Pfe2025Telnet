import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierkpihistoryComponent } from './modifierkpihistory.component';

describe('ModifierkpihistoryComponent', () => {
  let component: ModifierkpihistoryComponent;
  let fixture: ComponentFixture<ModifierkpihistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierkpihistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierkpihistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
