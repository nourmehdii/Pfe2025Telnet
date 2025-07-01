import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListvoletComponent } from './listvolet.component';

describe('ListvoletComponent', () => {
  let component: ListvoletComponent;
  let fixture: ComponentFixture<ListvoletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListvoletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListvoletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
