import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowscreenPopupComponent } from './showscreen-popup.component';

describe('ShowscreenPopupComponent', () => {
  let component: ShowscreenPopupComponent;
  let fixture: ComponentFixture<ShowscreenPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowscreenPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowscreenPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
