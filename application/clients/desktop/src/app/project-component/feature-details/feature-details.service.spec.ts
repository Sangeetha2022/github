import { TestBed } from '@angular/core/testing';

import { FeatureDetailsService } from './feature-details.service';

describe('FeatureDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeatureDetailsService = TestBed.get(FeatureDetailsService);
    expect(service).toBeTruthy();
  });
});
