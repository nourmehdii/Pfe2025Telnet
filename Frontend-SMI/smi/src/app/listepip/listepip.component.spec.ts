import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListepipComponent } from './listepip.component';

describe('ListepipComponent', () => {
  let component: ListepipComponent;
  let fixture: ComponentFixture<ListepipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListepipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListepipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
