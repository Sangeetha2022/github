import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowManagerComponent } from './flow-manager.component';

describe('FlowManagerComponent', () => {
  let component: FlowManagerComponent;
  let fixture: ComponentFixture<FlowManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
