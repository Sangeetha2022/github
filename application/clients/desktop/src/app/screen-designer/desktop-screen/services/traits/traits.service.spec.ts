import { TestBed } from '@angular/core/testing';

import { TraitsService } from './traits.service';

describe('TraitsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TraitsService = TestBed.get(TraitsService);
    expect(service).toBeTruthy();
  });
});
