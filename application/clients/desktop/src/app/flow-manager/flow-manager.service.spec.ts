import { TestBed } from '@angular/core/testing';

import { FlowManagerService } from './flow-manager.service';

describe('FlowManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlowManagerService = TestBed.get(FlowManagerService);
    expect(service).toBeTruthy();
  });
});
