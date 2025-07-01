import { ComponentFixture, TestBed } from '@angular/core/testing';

import {AjoutercategoriesComponent} from './ajoutercategories.component';

describe('AjoutercategoriesComponent', () => {
  let component: AjoutercategoriesComponent;
  let fixture: ComponentFixture<AjoutercategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutercategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutercategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
