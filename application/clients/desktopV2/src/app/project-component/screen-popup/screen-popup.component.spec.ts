import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenPopupComponent } from './screen-popup.component';

describe('ScreenPopupComponent', () => {
  let component: ScreenPopupComponent;
  let fixture: ComponentFixture<ScreenPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
