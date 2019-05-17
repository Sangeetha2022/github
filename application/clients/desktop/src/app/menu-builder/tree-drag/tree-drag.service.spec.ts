import { TestBed } from '@angular/core/testing';

import { TreeDragService } from './tree-drag.service';

describe('TreeDragService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TreeDragService = TestBed.get(TreeDragService);
    expect(service).toBeTruthy();
  });
});
