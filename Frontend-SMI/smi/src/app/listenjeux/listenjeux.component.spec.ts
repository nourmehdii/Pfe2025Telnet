import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListenjeuxComponent } from './listenjeux.component';

describe('ListenjeuxComponent', () => {
  let component: ListenjeuxComponent;
  let fixture: ComponentFixture<ListenjeuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListenjeuxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListenjeuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
