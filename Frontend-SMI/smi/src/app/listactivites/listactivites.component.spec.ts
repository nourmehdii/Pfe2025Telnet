import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListactivitesComponent } from './listactivites.component';

describe('ListactivitesComponent', () => {
  let component: ListactivitesComponent;
  let fixture: ComponentFixture<ListactivitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListactivitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListactivitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
