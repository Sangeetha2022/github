import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpositionComponent } from './editposition.component';

describe('EditpositionComponent', () => {
  let component: EditpositionComponent;
  let fixture: ComponentFixture<EditpositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditpositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
