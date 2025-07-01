import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatelatesthistoryComponent } from './updatelatesthistory.component';

describe('UpdatelatesthistoryComponent', () => {
  let component: UpdatelatesthistoryComponent;
  let fixture: ComponentFixture<UpdatelatesthistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatelatesthistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatelatesthistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
