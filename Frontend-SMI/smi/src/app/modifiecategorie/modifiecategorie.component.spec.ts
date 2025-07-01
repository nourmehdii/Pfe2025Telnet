import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiecategorieComponent } from './modifiecategorie.component';

describe('ModifiecategorieComponent', () => {
  let component: ModifiecategorieComponent;
  let fixture: ComponentFixture<ModifiecategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifiecategorieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifiecategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
