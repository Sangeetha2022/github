import { TestBed } from '@angular/core/testing';

import { TemplateScreenService } from './template-screen.service';

describe('TemplateScreenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TemplateScreenService = TestBed.get(TemplateScreenService);
    expect(service).toBeTruthy();
  });
});
