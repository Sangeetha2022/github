import { TestBed } from '@angular/core/testing';

import { ScreenDesignerService } from './screen-designer.service';

describe('ScreenDesignerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScreenDesignerService = TestBed.get(ScreenDesignerService);
    expect(service).toBeTruthy();
  });
});
