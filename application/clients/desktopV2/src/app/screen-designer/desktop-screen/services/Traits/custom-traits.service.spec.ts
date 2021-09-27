import { TestBed } from '@angular/core/testing';

import { CustomTraitsService } from './custom-traits.service';

describe('CustomTraitsService', () => {
  let service: CustomTraitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomTraitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
