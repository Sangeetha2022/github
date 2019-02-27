import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldPopupModalComponent } from './field-popup-modal.component';

describe('FieldPopupModalComponent', () => {
  let component: FieldPopupModalComponent;
  let fixture: ComponentFixture<FieldPopupModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldPopupModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldPopupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
