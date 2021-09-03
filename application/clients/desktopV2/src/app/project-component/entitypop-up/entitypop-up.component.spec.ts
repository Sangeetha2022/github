import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitypopUpComponent } from './entitypop-up.component';

describe('EntitypopUpComponent', () => {
  let component: EntitypopUpComponent;
  let fixture: ComponentFixture<EntitypopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntitypopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitypopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
