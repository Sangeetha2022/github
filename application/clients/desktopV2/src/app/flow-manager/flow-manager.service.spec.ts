import { TestBed } from '@angular/core/testing';

import { FlowManagerService } from './flow-manager.service';

describe('FlowManagerService', () => {
  let service: FlowManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
