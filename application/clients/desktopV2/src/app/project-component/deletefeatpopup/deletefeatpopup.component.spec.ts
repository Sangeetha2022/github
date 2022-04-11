import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletefeatpopupComponent } from './deletefeatpopup.component';

describe('DeletefeatpopupComponent', () => {
  let component: DeletefeatpopupComponent;
  let fixture: ComponentFixture<DeletefeatpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletefeatpopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletefeatpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
