import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierpipComponent } from './modifierpip.component';

describe('ModifierpipComponent', () => {
  let component: ModifierpipComponent;
  let fixture: ComponentFixture<ModifierpipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierpipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierpipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
