import { TestBed } from '@angular/core/testing';

import { ComponentFlowsService } from './component-flows.service';

describe('ComponentFlowsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComponentFlowsService = TestBed.get(ComponentFlowsService);
    expect(service).toBeTruthy();
  });
});
