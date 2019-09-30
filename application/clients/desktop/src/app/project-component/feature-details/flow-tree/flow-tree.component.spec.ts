import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowTreeComponent } from './flow-tree.component';

describe('FlowTreeComponent', () => {
  let component: FlowTreeComponent;
  let fixture: ComponentFixture<FlowTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
