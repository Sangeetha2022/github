import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeDragComponent } from './tree-drag.component';

describe('TreeDragComponent', () => {
  let component: TreeDragComponent;
  let fixture: ComponentFixture<TreeDragComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeDragComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeDragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
