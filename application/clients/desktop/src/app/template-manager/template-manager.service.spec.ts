import { TestBed } from '@angular/core/testing';

import { TemplateManagerService } from './template-manager.service';

describe('TemplateManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TemplateManagerService = TestBed.get(TemplateManagerService);
    expect(service).toBeTruthy();
  });
});
