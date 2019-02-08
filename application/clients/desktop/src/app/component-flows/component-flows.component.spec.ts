import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentFlowsComponent } from './component-flows.component';

describe('ComponentFlowsComponent', () => {
  let component: ComponentFlowsComponent;
  let fixture: ComponentFixture<ComponentFlowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentFlowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentFlowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
