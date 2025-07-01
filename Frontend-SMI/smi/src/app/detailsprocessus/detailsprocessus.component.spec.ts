import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsprocessusComponent } from './detailsprocessus.component';

describe('DetailsprocessusComponent', () => {
  let component: DetailsprocessusComponent;
  let fixture: ComponentFixture<DetailsprocessusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsprocessusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsprocessusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
