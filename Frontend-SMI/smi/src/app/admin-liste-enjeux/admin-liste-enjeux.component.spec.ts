import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListeEnjeuxComponent } from './admin-liste-enjeux.component';

describe('AdminListeEnjeuxComponent', () => {
  let component: AdminListeEnjeuxComponent;
  let fixture: ComponentFixture<AdminListeEnjeuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminListeEnjeuxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListeEnjeuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
