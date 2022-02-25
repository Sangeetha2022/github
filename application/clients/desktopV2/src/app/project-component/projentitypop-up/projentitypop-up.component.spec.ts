import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjentitypopUpComponent } from './projentitypop-up.component';

describe('ProjentitypopUpComponent', () => {
  let component: ProjentitypopUpComponent;
  let fixture: ComponentFixture<ProjentitypopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjentitypopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjentitypopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
