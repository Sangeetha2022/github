import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatetagsComponent } from './updatetags.component';

describe('UpdatetagsComponent', () => {
  let component: UpdatetagsComponent;
  let fixture: ComponentFixture<UpdatetagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatetagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatetagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
